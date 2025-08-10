const LoadingAnimation = ({ text = "Loading..." }: { text?: string }) => {
  return (
    <div className="flex flex-col items-center justify-center p-8">
      <div className="relative w-32 h-32 mb-6">
        {/* Outer ring */}
        <div className="absolute inset-0 rounded-full border-4 border-gray-300"></div>
        
        {/* Spinning ring */}
        <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-cyan-400 animate-spin"></div>
        
        {/* Inner pulsing dot */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-4 h-4 bg-cyan-400 rounded-full animate-pulse"></div>
        </div>
        
        {/* Scanning lines effect */}
        <div className="absolute inset-0 overflow-hidden rounded-full">
          <div className="absolute w-full h-0.5 bg-gradient-to-r from-transparent via-cyan-400 to-transparent animate-ping" 
               style={{ top: '25%', animationDelay: '0s' }}></div>
          <div className="absolute w-full h-0.5 bg-gradient-to-r from-transparent via-green-400 to-transparent animate-ping" 
               style={{ top: '50%', animationDelay: '0.5s' }}></div>
          <div className="absolute w-full h-0.5 bg-gradient-to-r from-transparent via-blue-400 to-transparent animate-ping" 
               style={{ top: '75%', animationDelay: '1s' }}></div>
        </div>
      </div>
      
      <div className="text-center">
        <h3 className="text-xl font-semibold text-white mb-2">{text}</h3>
        <div className="flex space-x-1">
          <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
          <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
          <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
        </div>
      </div>
    </div>
  );
};

export default LoadingAnimation;