import { useState, useCallback } from 'react';

const useOptimistic = (initialState) => {
  const [state, setState] = useState(initialState);

  const updateOptimistically = useCallback(async (optimisticValue, asyncAction) => {
    const previousState = state;
    setState(optimisticValue);

    try {
      await asyncAction();
      return true;
    } catch (error) {
      console.error("Thao tác thất bại, rollback giao diện:", error);
      setState(previousState);
      return false;
    }
  }, [state]);

  return [state, updateOptimistically];
}

export default useOptimistic;