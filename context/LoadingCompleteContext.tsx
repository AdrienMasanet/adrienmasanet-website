import { createContext,useState } from "react";

export const LoadingCompleteContext = createContext({
  loadingComplete: false,
  setLoadingComplete: (): void => {},
});

interface LoadingCompleteProviderProps {
  children: React.ReactNode;
}

export const LoadingCompleteProvider = ({
  children,
}: LoadingCompleteProviderProps) => {
  const [loadingComplete, setLoadingComplete] = useState<boolean>(false);

  return (
    <LoadingCompleteContext.Provider
      value={{
        loadingComplete,
        setLoadingComplete: (): void => setLoadingComplete(true),
      }}
    >
      {children}
    </LoadingCompleteContext.Provider>
  );
};
