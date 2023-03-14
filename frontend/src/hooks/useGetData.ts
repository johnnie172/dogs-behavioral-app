import { useEffect, useState, useRef } from "react";

const useGetData = <T extends unknown>(getFunc: () => Promise<T>) => {
  // TODO: reset, error, cleanup
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<T | undefined>();
  const [error, setError] = useState("");

  const isMounted = useRef(true);

  useEffect(() => {
    getFunc()
      .then(function (data) {
        console.log(isMounted);
        if (isMounted.current) {
          // response handling
          setLoading(false);
          setData(data);
        }
      })
      .catch(function (error) {
        // error handling
        setError(error.message)
      });
    // TODO: add cancel
    return () => {
      // Don`t set data if unmounted
    //   TODO: Not working on strict mode so enable only on production
    //   isMounted.current = false;
    };
  }, []);
  return { data, loading, error };
};

export default useGetData;
