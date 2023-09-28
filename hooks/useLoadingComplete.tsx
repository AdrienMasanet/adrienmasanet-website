import { useContext } from "react";

import { LoadingCompleteContext } from "../context/LoadingCompleteContext";

export const useLoadingComplete = () => {
  const { loadingComplete, setLoadingComplete } = useContext(
    LoadingCompleteContext
  );

  return { loadingComplete, setLoadingComplete };
};
