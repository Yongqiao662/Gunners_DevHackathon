
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract FreshChainNFT is ERC721URIStorage, Ownable {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;
    
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
    
    mapping(uint256 => ProductBatch) public productBatches;
    mapping(uint256 => SensorReading[]) public sensorHistory;
    mapping(address => bool) public authorizedOracles;
    
    event ProductCreated(uint256 tokenId, string productName, string origin);
    event SensorDataUpdated(uint256 tokenId, int256 temperature, uint256 humidity);
    event FreshnessScoreUpdated(uint256 tokenId, uint256 newScore);
    event LocationUpdated(uint256 tokenId, string newLocation, address newHandler);
    
    constructor() ERC721("FreshChain", "FRESH") {}
    
    function createProductBatch(
        string memory productName,
        string memory origin,
        string memory initialLocation,
        string memory tokenURI
    ) public returns (uint256) {
        _tokenIds.increment();
        uint256 newTokenId = _tokenIds.current();
        
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
    
    function updateSensorData(
        uint256 tokenId,
        int256 temperature,
        uint256 humidity,
        string memory location
    ) public {
        require(authorizedOracles[msg.sender], "Not authorized oracle");
        require(_exists(tokenId), "Token does not exist");
        require(productBatches[tokenId].isActive, "Product batch not active");
        
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
        
        emit SensorDataUpdated(tokenId, temperature, humidity);
    }
    
    function calculateFreshnessScore(
        uint256 tokenId,
        int256 currentTemp,
        uint256 currentHumidity
    ) internal view returns (uint256) {
        ProductBatch memory batch = productBatches[tokenId];
        uint256 ageInHours = (block.timestamp - batch.harvestDate) / 3600;
        
        // Base score decreases over time
        uint256 ageScore = ageInHours > 168 ? 0 : 100 - (ageInHours * 100 / 168); // 1 week max
        
        // Temperature penalty (assuming optimal range 0-4°C)
        uint256 tempScore = 100;
        if (currentTemp > 4 || currentTemp < 0) {
            tempScore = currentTemp > 10 ? 0 : 50;
        }
        
        // Humidity penalty (optimal range 85-95%)
        uint256 humidityScore = 100;
        if (currentHumidity < 85 || currentHumidity > 95) {
            humidityScore = 70;
        }
        
        // Return minimum score (most restrictive condition)
        uint256 minScore = ageScore < tempScore ? ageScore : tempScore;
        return minScore < humidityScore ? minScore : humidityScore;
    }
    
    function transferProduct(
        uint256 tokenId,
        address newHandler,
        string memory newLocation
    ) public {
        require(ownerOf(tokenId) == msg.sender, "Not the owner");
        
        productBatches[tokenId].currentHandler = newHandler;
        productBatches[tokenId].currentLocation = newLocation;
        
        _transfer(msg.sender, newHandler, tokenId);
        
        emit LocationUpdated(tokenId, newLocation, newHandler);
    }
    
    function addAuthorizedOracle(address oracle) public onlyOwner {
        authorizedOracles[oracle] = true;
    }
    
    function getSensorHistory(uint256 tokenId) public view returns (SensorReading[] memory) {
        return sensorHistory[tokenId];
    }
    
    function getProductDetails(uint256 tokenId) public view returns (ProductBatch memory) {
        return productBatches[tokenId];
    }
}