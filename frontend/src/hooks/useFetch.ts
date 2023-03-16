import { useEffect, useState, useRef } from "react";

const useFetch = <T extends unknown>(
  fetchFunc: () => Promise<T>,
  toFetch?: boolean,
  timeOut = 5000
) => {
  // TODO: reset, error, cleanup
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<T | undefined>();
  const [error, setError] = useState("");
  const [toRetry, setToRetry] = useState(false);
  const [shouldFetch, setShouldFetch] = useState(toFetch ?? true);
  const isMounted = useRef(true);

  const fetch = async () => {
    try {
      const data = await fetchFunc();
      if (isMounted.current) {
        // response handling
        setLoading(false);
        setData(data);
        setError("");
      }
    } catch (error) {
      setLoading(false);
      setToRetry(true);
      // TODO: find a better way to type
      console.error(error);
      if (error instanceof Error) setError(error.message);
    }
  };

  useEffect(() => {
    // set retry timer
    const timer = setTimeout(() => {
      if (toRetry) setToRetry(false);
    }, timeOut);

    // call fetch function
    if (shouldFetch) fetch();

    // TODO: add cancel
    // Clean up
    return () => {
      // Don`t set data if unmounted
      //   TODO: Not working on strict mode so enable only on production
      //   isMounted.current = false;

      //   clear retry timer
      clearTimeout(timer);
    };
  }, [toRetry, shouldFetch]);

  return { data, loading, error, setShouldFetch };
};

export default useFetch;
