import React, { useEffect, useState } from 'react';
import { getJSON } from '../callAPI/fetch-json'
import useRefreshablePromise from '../callAPI/use-refreshable-promise'
import Async from '../callAPI/async';
import Model from "./model";
import { data, forecastInterface } from "../interfaces/utils";
import { CircularProgress } from '@material-ui/core';

const fetchForecastData = async (city: string) => {
  return getJSON<data>(`https://iim-a4-back-toubonobo.herokuapp.com/api/data/forecast/${city}`)
 }

function Home(): React.ReactElement{
  const [resultData, setResultData] = useState<forecastInterface[]>();
  const defaultCity = "Paris";
  const [city, setCity] = useState<string>(defaultCity);
  const { refresh: refreshStations } = useRefreshablePromise(() => fetchForecastData(city), setResultData);

  useEffect(() => {
    refreshStations()
  }, [city]);

  return (
    <>
    {
      resultData ?
      <Model data={resultData[0]} onCityClick={(city) => setCity(city)} />
      :
      <CircularProgress />
    }
    </>
  );
}

export default Home;