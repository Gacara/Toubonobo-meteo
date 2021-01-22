import { useMemo } from 'react'
import { usePromise } from 'react-hook-utils'
import { data } from "../interfaces/utils";

type T=any;
export default (fetchResult: () => Promise<data>, setResult: (result: T) => any) => {
  const refresh = async () => {
    return fetchResult()
      .then((result) => {
        setResult(result)
      })
  };
  const fetchMemo = useMemo(refresh, [])
  let error= null;
  let isLoading= false;
    [, error, isLoading] = usePromise(fetchMemo);
  
  
  return {
    isLoading,
    error,
    refresh
  }
}