import { useState, useCallback } from 'react';

const useOptimistic = (initialState) => {
  const [state, setState] = useState(initialState);

  const updateOptimistically = useCallback(async (value, action) => {
    const previousState = state;
    setState(value);

    try {
      await action();
      return true;
    } catch {
      setState(previousState);
      return false;
    }
  }, [state]);

  return [state, updateOptimistically];
}

export default useOptimistic;