import { useState, useEffect } from 'react';

// A simple utility function to truncate an address
const truncateAddress = (address) => {
  if (!address) return '';
  const start = address.substring(0, 6);
  const end = address.substring(address.length - 4);
  return `${start}...${end}`;
};

const useWalletConnection = () => {
  const [state, setState] = useState({
    isLoggedIn: false,
    userAddress: null,
    error: null,
    loading: false,
  });

  // This helper function updates the state consistently after a successful account retrieval
  const updateStateWithAccount = (accounts) => {
    if (accounts.length > 0) {
      setState({
        isLoggedIn: true,
        userAddress: accounts[0],
        error: null,
        loading: false,
      });
    } else {
      // Handles the case where accounts are unexpectedly empty
      setState({
        isLoggedIn: false,
        userAddress: null,
        error: null,
        loading: false,
      });
    }
  };

  const checkConnection = async () => {
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({ method: 'eth_accounts' });
        updateStateWithAccount(accounts);
      } catch (error) {
        console.error("Error checking connection:", error);
        setState(prev => ({ ...prev, error: 'Failed to connect automatically' }));
      }
    }
  };

  const connectWallet = async () => {
    setState(prev => ({ ...prev, loading: true, error: null }));
    
    try {
      if (!window.ethereum) {
        throw new Error('No Ethereum wallet detected. Please install MetaMask.');
      }
      
      const accounts = await window.ethereum.request({ 
        method: 'eth_requestAccounts' 
      });
      
      // Use the consistent state update function
      updateStateWithAccount(accounts);

    } catch (error) {
      setState(prev => ({
        ...prev,
        error: error.code === 4001 
          ? 'Connection rejected by user.' 
          : error.message || 'Connection failed.',
        loading: false,
      }));
    }
  };

  useEffect(() => {
    checkConnection();
    
    if (window.ethereum) {
      const handleAccountsChanged = (accounts) => {
        updateStateWithAccount(accounts);
      };
      
      window.ethereum.on('accountsChanged', handleAccountsChanged);
      
      // Cleanup function to remove the event listener
      return () => {
        window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
      };
    }
  }, []);

  return {
    ...state,
    connectWallet,
    truncateAddress, // Added the missing function
  };
};

export default useWalletConnection;