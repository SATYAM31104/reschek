import { useState, useEffect } from "react";

const AIChat = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [message, setMessage] = useState("");
  const [response, setResponse] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Check if Puter is available
    if (typeof window !== "undefined" && (window as any).puter) {
      setIsLoaded(true);
    }
  }, []);

  const handleChat = async () => {
    if (!message.trim() || !isLoaded) return;
    
    setIsLoading(true);
    try {
      // Use Puter AI chat
      const result = await (window as any).puter.ai.chat([
        {
          role: "user",
          content: message
        }
      ]);
      
      setResponse(result.message?.content || "No response");
    } catch (error) {
      console.error("AI Chat error:", error);
      setResponse("Error occurred while chatting");
    } finally {
      setIsLoading(false);
    }
  };

  if (!isLoaded) {
    return (
      <div className="ai-chat-container p-4 bg-gray-800 rounded-lg">
        <p className="text-white">Puter AI not available</p>
      </div>
    );
  }

  return (
    <div className="ai-chat-container p-4 bg-gray-800 rounded-lg max-w-md mx-auto">
      <h3 className="text-white text-lg font-semibold mb-4">AI Assistant</h3>
      
      <div className="mb-4">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Ask me anything..."
          className="w-full p-2 rounded bg-gray-700 text-white"
          onKeyPress={(e) => e.key === 'Enter' && handleChat()}
        />
      </div>
      
      <button
        onClick={handleChat}
        disabled={isLoading || !message.trim()}
        className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 disabled:opacity-50"
      >
        {isLoading ? "Thinking..." : "Send"}
      </button>
      
      {response && (
        <div className="mt-4 p-3 bg-gray-700 rounded">
          <p className="text-white text-sm">{response}</p>
        </div>
      )}
    </div>
  );
};

export default AIChat;