import { useEffect, useState, useRef } from "react";

const useGetData = <T extends unknown>(
  getFunc: () => Promise<T>,
  timeOut = 5000
) => {
  // TODO: reset, error, cleanup
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<T | undefined>();
  const [error, setError] = useState("");
  const [toRetry, setToRetry] = useState(false);
  const isMounted = useRef(true);

  const get = async () => {
    try {
      const data = await getFunc();
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
      console.log(error);
      if (error instanceof Error) setError(error.message);
    }
  };

  useEffect(() => {
    // set retry timer
    const timer = setTimeout(() => {
      if (toRetry) setToRetry(false);
    }, timeOut);

    // call get function
    get();

    // TODO: add cancel
    // Clean up
    return () => {
      // Don`t set data if unmounted
      //   TODO: Not working on strict mode so enable only on production
      //   isMounted.current = false;

      //   clear retry timer
      clearTimeout(timer);
    };
  }, [toRetry]);

  return { data, loading, error };
};

export default useGetData;
