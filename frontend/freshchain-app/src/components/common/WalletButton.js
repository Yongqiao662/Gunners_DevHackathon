const WalletButton = ({ address, onClick, loading, className, fullWidth }) => {
  if (address) {
    return (
      <button
        type="button"
        onClick={onClick}
        className={`w-10 h-10 rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center cursor-pointer shadow-lg hover:shadow-xl transition ${className}`}
        style={{ minWidth: '40px', minHeight: '40px' }}
        aria-label="Wallet"
      >
        <span className="text-white text-lg">
          🦊
        </span>
      </button>
    );
  }

  return (
    <button
      onClick={onClick}
      disabled={loading}
      className={`${fullWidth ? 'w-full' : ''} bg-gradient-to-r from-emerald-500 to-teal-600 text-white py-4 rounded-2xl font-semibold text-lg shadow-lg hover:shadow-xl hover:from-emerald-600 hover:to-teal-700 transform hover:-translate-y-0.5 transition-all duration-200 disabled:opacity-70 disabled:transform-none ${className}`}
    >
      {loading ? (
        <div className="flex items-center justify-center space-x-3">
          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
          <span>Connecting...</span>
        </div>
      ) : (
        'Connect Wallet'
      )}
    </button>
  );
};

export default WalletButton;