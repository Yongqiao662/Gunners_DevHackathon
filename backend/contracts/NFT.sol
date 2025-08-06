// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract FreshChainNFT is ERC721URIStorage, Ownable {
    uint256 private _tokenIdCounter;
    
    struct ProductBatch {
        string productName;
        string origin;
        uint256 harvestDate;
        uint256 freshnessScore;
        string currentLocation;
        address currentHandler;
        bool isActive;
    }
    
    struct SensorReading {
        uint256 timestamp;
        int256 temperature;
        uint256 humidity;
        string location;
    }
    
    // Mappings
    mapping(uint256 => ProductBatch) public productBatches;
    mapping(uint256 => SensorReading[]) public sensorHistory;
    mapping(address => bool) public authorizedOracles;
    
    // Events
    event ProductCreated(uint256 indexed tokenId, string productName, string origin);
    event SensorDataUpdated(uint256 indexed tokenId, int256 temperature, uint256 humidity);
    event FreshnessScoreUpdated(uint256 indexed tokenId, uint256 newScore);
    event LocationUpdated(uint256 indexed tokenId, string newLocation, address newHandler);
    
    constructor() ERC721("FreshChain", "FRESH") Ownable(msg.sender) {}
    
    /**
     * @dev Custom function to check if token exists (replaces _exists)
     */
    function tokenExists(uint256 tokenId) public view returns (bool) {
        return _ownerOf(tokenId) != address(0);
    }
    
    /**
     * @dev Create a new product batch NFT
     */
    function createProductBatch(
        string memory productName,
        string memory origin,
        string memory initialLocation,
        string memory tokenURI
    ) public returns (uint256) {
        _tokenIdCounter++;
        uint256 newTokenId = _tokenIdCounter;
        
        _mint(msg.sender, newTokenId);
        _setTokenURI(newTokenId, tokenURI);
        
        productBatches[newTokenId] = ProductBatch({
            productName: productName,
            origin: origin,
            harvestDate: block.timestamp,
            freshnessScore: 100, // Start with perfect score
            currentLocation: initialLocation,
            currentHandler: msg.sender,
            isActive: true
        });
        
        emit ProductCreated(newTokenId, productName, origin);
        return newTokenId;
    }
    
    /**
     * @dev Update sensor data for a product batch
     */
    function updateSensorData(
        uint256 tokenId,
        int256 temperature,
        uint256 humidity,
        string memory location
    ) public {
        require(authorizedOracles[msg.sender], "Not authorized oracle");
        require(tokenExists(tokenId), "Token does not exist");
        require(productBatches[tokenId].isActive, "Product batch not active");
        
        // Add new sensor reading
        sensorHistory[tokenId].push(SensorReading({
            timestamp: block.timestamp,
            temperature: temperature,
            humidity: humidity,
            location: location
        }));
        
        // Update freshness score based on conditions
        uint256 currentScore = productBatches[tokenId].freshnessScore;
        uint256 newScore = calculateFreshnessScore(tokenId, temperature, humidity);
        
        if (newScore != currentScore) {
            productBatches[tokenId].freshnessScore = newScore;
            emit FreshnessScoreUpdated(tokenId, newScore);
        }
        
        // Update current location
        productBatches[tokenId].currentLocation = location;
        
        emit SensorDataUpdated(tokenId, temperature, humidity);
    }
    
    /**
     * @dev Calculate freshness score based on environmental conditions
     */
    function calculateFreshnessScore(
        uint256 tokenId,
        int256 currentTemp,
        uint256 currentHumidity
    ) internal view returns (uint256) {
        ProductBatch memory batch = productBatches[tokenId];
        uint256 ageInHours = (block.timestamp - batch.harvestDate) / 3600;
        
        // Base score decreases over time (max 7 days = 168 hours)
        uint256 ageScore = ageInHours > 168 ? 0 : 100 - (ageInHours * 100 / 168);
        
        // Temperature scoring (optimal range varies by product type)
        uint256 tempScore = 100;
        if (currentTemp > 4) {
            if (currentTemp > 10) {
                tempScore = 30; // Poor conditions
            } else {
                tempScore = 70; // Acceptable but not ideal
            }
        } else if (currentTemp < -2) {
            tempScore = 80; // Too cold but still good
        }
        
        // Humidity scoring (optimal range 85-95%)
        uint256 humidityScore = 100;
        if (currentHumidity < 85 || currentHumidity > 95) {
            if (currentHumidity < 70 || currentHumidity > 98) {
                humidityScore = 50; // Poor humidity
            } else {
                humidityScore = 75; // Acceptable humidity
            }
        }
        
        // Return weighted average (age has more impact over time)
        uint256 ageWeight = ageInHours > 48 ? 50 : 30; // Increase age impact after 48 hours
        uint256 tempWeight = 40;
        uint256 humidityWeight = 100 - ageWeight - tempWeight;
        
        uint256 weightedScore = (ageScore * ageWeight + tempScore * tempWeight + humidityScore * humidityWeight) / 100;
        
        // Ensure score doesn't go below 0 or above 100
        return weightedScore > 100 ? 100 : weightedScore;
    }
    
    /**
     * @dev Transfer product to new handler
     */
    function transferProduct(
        uint256 tokenId,
        address newHandler,
        string memory newLocation
    ) public {
        require(_isAuthorized(_ownerOf(tokenId), msg.sender, tokenId), "Not authorized to transfer");
        require(tokenExists(tokenId), "Token does not exist");
        
        address currentOwner = ownerOf(tokenId);
        
        productBatches[tokenId].currentHandler = newHandler;
        productBatches[tokenId].currentLocation = newLocation;
        
        _transfer(currentOwner, newHandler, tokenId);
        
        emit LocationUpdated(tokenId, newLocation, newHandler);
    }
    
    /**
     * @dev Add authorized oracle address
     */
    function addAuthorizedOracle(address oracle) public onlyOwner {
        require(oracle != address(0), "Invalid oracle address");
        authorizedOracles[oracle] = true;
    }
    
    /**
     * @dev Remove authorized oracle address
     */
    function removeAuthorizedOracle(address oracle) public onlyOwner {
        authorizedOracles[oracle] = false;
    }
    
    /**
     * @dev Deactivate a product batch (for recalled/expired products)
     */
    function deactivateProduct(uint256 tokenId) public onlyOwner {
        require(tokenExists(tokenId), "Token does not exist");
        productBatches[tokenId].isActive = false;
    }
    
    /**
     * @dev Get complete sensor history for a token
     */
    function getSensorHistory(uint256 tokenId) public view returns (SensorReading[] memory) {
        require(tokenExists(tokenId), "Token does not exist");
        return sensorHistory[tokenId];
    }
    
    /**
     * @dev Get recent sensor readings (last N readings)
     */
    function getRecentSensorReadings(uint256 tokenId, uint256 count) public view returns (SensorReading[] memory) {
        require(tokenExists(tokenId), "Token does not exist");
        
        SensorReading[] storage allReadings = sensorHistory[tokenId];
        uint256 totalReadings = allReadings.length;
        
        if (totalReadings == 0) {
            return new SensorReading[](0);
        }
        
        uint256 startIndex = totalReadings > count ? totalReadings - count : 0;
        uint256 resultLength = totalReadings - startIndex;
        
        SensorReading[] memory recentReadings = new SensorReading[](resultLength);
        
        for (uint256 i = 0; i < resultLength; i++) {
            recentReadings[i] = allReadings[startIndex + i];
        }
        
        return recentReadings;
    }
    
    /**
     * @dev Get product details
     */
    function getProductDetails(uint256 tokenId) public view returns (ProductBatch memory) {
        require(tokenExists(tokenId), "Token does not exist");
        return productBatches[tokenId];
    }
    
    /**
     * @dev Get current freshness score
     */
    function getCurrentFreshnessScore(uint256 tokenId) public view returns (uint256) {
        require(tokenExists(tokenId), "Token does not exist");
        return productBatches[tokenId].freshnessScore;
    }
    
    /**
     * @dev Get total number of minted tokens
     */
    function totalSupply() public view returns (uint256) {
        return _tokenIdCounter;
    }
    
    /**
     * @dev Batch create multiple products (for demo purposes)
     */
    function batchCreateProducts(
        string[] memory productNames,
        string[] memory origins,
        string[] memory initialLocations,
        string[] memory tokenURIs
    ) public returns (uint256[] memory) {
        require(productNames.length == origins.length, "Array length mismatch");
        require(productNames.length == initialLocations.length, "Array length mismatch");
        require(productNames.length == tokenURIs.length, "Array length mismatch");
        
        uint256[] memory tokenIds = new uint256[](productNames.length);
        
        for (uint256 i = 0; i < productNames.length; i++) {
            tokenIds[i] = createProductBatch(
                productNames[i],
                origins[i],
                initialLocations[i],
                tokenURIs[i]
            );
        }
        
        return tokenIds;
    }
    
    /**
     * @dev Emergency function to update freshness score manually
     */
    function emergencyUpdateFreshnessScore(uint256 tokenId, uint256 newScore) public onlyOwner {
        require(tokenExists(tokenId), "Token does not exist");
        require(newScore <= 100, "Score cannot exceed 100");
        
        productBatches[tokenId].freshnessScore = newScore;
        emit FreshnessScoreUpdated(tokenId, newScore);
    }
}