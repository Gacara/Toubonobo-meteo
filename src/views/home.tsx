/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { getJSON } from '../callAPI/fetch-json'
import useRefreshablePromise from '../callAPI/use-refreshable-promise'
import Model, { switchModetype } from "./model";
import { data, forecastInterface } from "../interfaces/utils";
import { Button } from '@mui/material';
import FranceMap from '../component/france';
import GradientBtn from '../designSystem/button/button';

const fetchForecastData = async (city: string) => {
  return getJSON<data>(`https://wtow.xyz/api/data/forecast/${city}`)
 }

function Home(): React.ReactElement{
  const [resultData, setResultData] = useState<forecastInterface[]>();
  const defaultCity = "Paris";
  const [city, setCity] = useState<string>(defaultCity);
  const { refresh: refreshData } = useRefreshablePromise(() => fetchForecastData(city), setResultData);
  const [testMode, setTestMode] = useState<switchModetype | undefined>(undefined);
  const [validateEnter, setValidateEnter] = useState<boolean>(false);

  useEffect(() => {
    refreshData()
  }, [city]);

  function loadingBeforeTestMode(){
      setTimeout(() => {
        setTestMode("test");
      }, 3000);

      return <div style={{color: "black", height: "100%", background: "#f9e4b7", display: "flex", alignItems: "center", justifyContent: "center"}}>
        <div>
        <div>
      Bienvenue dans What To Wear !
      </div>
      <div>
        {<span role="img" aria-label="Rain">Toubonobo va t'aider à t'habiller pour demain 🐵</span>}
      </div>
      <div style={{paddingTop: "10px"}}>
        Où habites-tu ? - {city}
      </div>
      <div style={{display: "flex", alignItems: "center", justifyContent:"center", width:"100%", height:"100%", paddingTop: "20px"}}>
          <FranceMap selectedCity={city} onRegionClick={(city) => {setCity(city)}} /> 
        </div>
      <div>
      <GradientBtn label="Entrer"  onClick={() => setValidateEnter(true)} />
      </div>
      </div>
    </div>;
  }

  return (
    <>
    {
      resultData && validateEnter ?
      <Model data={resultData} city={city} onCityClick={(city) => setCity(city)} />
      :
      <>
      {
        testMode && validateEnter ?
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
