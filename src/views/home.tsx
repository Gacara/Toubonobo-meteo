import React, { useEffect, useState } from 'react';
import { getJSON } from '../callAPI/fetch-json'
import useRefreshablePromise from '../callAPI/use-refreshable-promise'
import Model, { switchModetype } from "./model";
import { data, forecastInterface } from "../interfaces/utils";
import { CircularProgress } from '@material-ui/core';

const fetchForecastData = async (city: string) => {
  return getJSON<data>(``)
 }
 //https://iim-a4-back-toubonobo.herokuapp.com/api/data/forecas/${city}

function Home(): React.ReactElement{
  const [resultData, setResultData] = useState<forecastInterface[]>();
  const defaultCity = "Paris";
  const [city, setCity] = useState<string>(defaultCity);
  const { refresh: refreshStations } = useRefreshablePromise(() => fetchForecastData(city), setResultData);
  const [testMode, setTestMode] = useState<switchModetype | undefined>();

  useEffect(() => {
    refreshStations()
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
      <Model data={resultData[0]} onCityClick={(city) => setCity(city)} />
      :
      <>
      {
        testMode ?
        <Model mode={testMode} data={null} onCityClick={(city) => setCity(city)} />
      :
      loadingBeforeTestMode()
      }
      </>
    }
    </>
  );
}

export default Home;