import { useContext } from "react";

import { LoadingCompleteContext } from "../context/LoadingCompleteContext";

const useLoadingComplete = () => {
  const { loadingComplete, setLoadingComplete } = useContext(
    LoadingCompleteContext
  );

  return { loadingComplete, setLoadingComplete };
};

export default useLoadingComplete;
