/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { getJSON } from '../callAPI/fetch-json'
import useRefreshablePromise from '../callAPI/use-refreshable-promise'
import Model, { switchModetype } from "./model";
import { data, forecastInterface } from "../interfaces/utils";
import { CircularProgress } from '@material-ui/core';

const fetchForecastData = async (city: string) => {
  return getJSON<data>(`https://api.wtow.xyz/api/data/forecast/${city}`)
 }

function Home(): React.ReactElement{
  const [resultData, setResultData] = useState<forecastInterface[]>();
  const defaultCity = "Paris";
  const [city, setCity] = useState<string>(defaultCity);
  const { refresh: refreshData } = useRefreshablePromise(() => fetchForecastData(city), setResultData);
  const [testMode, setTestMode] = useState<switchModetype | undefined>();
  useEffect(() => {
    refreshData()
  }, [city]);

  function loadingBeforeTestMode(){
      setTimeout(() => {
        setTestMode("test");
      }, 3000);
      return <div>
      Waiting for data...
      <CircularProgress />
    </div>;
  }

  return (
    <>
    {
      resultData ?
      <Model data={resultData} city={city} onCityClick={(city) => setCity(city)} />
      :
      <>
      {
        testMode ?
        <Model mode={testMode} city={city} data={null} onCityClick={(city) => setCity(city)} />
      :
      loadingBeforeTestMode()
      }
      </>
    }
    </>
  );
}

export default Home;