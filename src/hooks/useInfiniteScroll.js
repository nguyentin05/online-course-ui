import { useEffect, useRef, useState, useCallback } from 'react';

const useInfiniteScroll = (callback, hasMore = true) => {
  const observerTarget = useRef(null);
  const [isFetching, setIsFetching] = useState(false);

  const handleIntersect = useCallback(
    async (entries) => {
      const [entry] = entries;
      if (entry.isIntersecting && !isFetching && hasMore) {
        setIsFetching(true);
        await callback();
        setIsFetching(false);
      }
    },
    [callback, isFetching, hasMore]
  );

  useEffect(() => {
    const observer = new IntersectionObserver(handleIntersect, {
      root: null,
      rootMargin: '100px',
      threshold: 0.1,
    });

    if (observerTarget.current) {
      observer.observe(observerTarget.current);
    }

    return () => {
      if (observerTarget.current) observer.unobserve(observerTarget.current);
    };
  }, [handleIntersect]);

  return { observerTarget, isFetching };
}

export default useInfiniteScroll;