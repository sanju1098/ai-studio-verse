import React, { createContext, useContext, useState, useEffect } from "react";

interface ApiKeyContextType {
  apiKey: string;
  setApiKey: (key: string) => void;
  hasApiKey: boolean;
}

const ApiKeyContext = createContext<ApiKeyContextType | undefined>(undefined);

export const useApiKey = () => {
  const context = useContext(ApiKeyContext);
  if (context === undefined) {
    throw new Error("useApiKey must be used within an ApiKeyProvider");
  }
  return context;
};

export const ApiKeyProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [apiKey, setApiKeyState] = useState<string>("");

  useEffect(() => {
    // Load API key from localStorage on component mount
    const savedApiKey = localStorage.getItem("gemini_api_key");
    if (savedApiKey) {
      setApiKeyState(savedApiKey);
    }
  }, []);

  const setApiKey = (key: string) => {
    setApiKeyState(key);
    // Save to localStorage
    if (key) {
      localStorage.setItem("gemini_api_key", key);
    } else {
      localStorage.removeItem("gemini_api_key");
    }
  };

  const hasApiKey = apiKey.length > 0;

  return (
    <ApiKeyContext.Provider value={{ apiKey, setApiKey, hasApiKey }}>
      {children}
    </ApiKeyContext.Provider>
  );
};
