import { useMemo } from 'react'
import _ from "lodash";
import { usePromise } from 'react-hook-utils'
import { data } from "../interfaces/utils";

type T=any;
export default (fetchResult: () => Promise<data>, setResult: (result: T) => any) => {
  const refresh = async () => {
    return fetchResult()
      .then((result) => {
        const newResults = _.uniqBy(result as unknown as T[], "dateObj")
        setResult(newResults);
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