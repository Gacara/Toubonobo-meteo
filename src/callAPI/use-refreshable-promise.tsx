/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable import/no-anonymous-default-export */
import { useMemo, useState, useEffect } from 'react'
import _ from "lodash";
import { data } from "../interfaces/utils";

type T=any;
export default (fetchResult: () => Promise<data>, setResult: (result: T) => any) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const refresh = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await fetchResult();
      const newResults = _.uniqBy(result as unknown as T[], "dateObj");
      setResult(newResults);
    } catch (err) {
      setError(err as Error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchMemo = useMemo(() => refresh, []);

  useEffect(() => {
    fetchMemo();
  }, [fetchMemo]);
  
  return {
    isLoading,
    error,
    refresh
  }
}