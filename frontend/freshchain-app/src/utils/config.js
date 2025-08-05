export const CONFIG = {
  networks: {
    1: { // Ethereum Mainnet
      name: 'Ethereum Mainnet',
      tokenizationContract: '0xYourMainnetContractAddress',
      supportedTokens: {
        '0xYourTokenAddress1': {
          name: 'YourToken1',
          symbol: 'YTK1',
          decimals: 18
        }
      }
    },
    137: { // Polygon Mainnet
      name: 'Polygon Mainnet',
      tokenizationContract: '0xYourPolygonContractAddress',
      supportedTokens: {
        '0xYourTokenAddress2': {
          name: 'YourToken2',
          symbol: 'YTK2',
          decimals: 18
        }
      }
    }
    // Add other networks as needed
  },
  defaultTokenizationType: 'ERC1155'
};