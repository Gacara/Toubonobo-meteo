import React from 'react';
import Drawer from '@material-ui/core/Drawer';
import { forecastInterface } from '../../interfaces/utils';
import { Grid } from '@material-ui/core';
import {Bar} from 'react-chartjs-2';


interface DrawerInterface {
    open: boolean;
    onClose: (event: {}, reason: "backdropClick" | "escapeKeyDown") => void;
    allData: forecastInterface[] | null;
    city: string;
}

export default function TemporaryDrawer({open, onClose, allData, city}: DrawerInterface) {
  const data = allData ? allData[0] : null;
  
  const chartData = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
  datasets: [
    {
      label: 'Temperature',
      backgroundColor: 'rgba(255,99,132,0.2)',
      borderColor: 'rgba(255,99,132,1)',
      borderWidth: 1,
      hoverBackgroundColor: 'rgba(255,99,132,0.4)',
      hoverBorderColor: 'rgba(255,99,132,1)',
      data: [65, 59, 80, 81, 56, 55, 40]
    }
  ]
};

  return (
          <Drawer anchor="right" open={open} onClose={onClose}>
              <Grid style={{width: "800px", background: "#FFC371"}} container item sm={12} justify="center" alignItems="center">
                  <Grid container item sm={6} justify="center">
                  <iframe title="city" src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyDERFj1udznFe_t0Dw_jQFgsxHG7EGmg2E&q=${city}+France`} sandbox=''/>
                  </Grid>
                  <Grid container item sm={6} justify="center">
                      {//`${data?.Temperature.value}°C`
                      }
                       {chartData &&
                      <Bar
                      data={chartData}
                      width={400}
                      height={200}
                      options={{
                      maintainAspectRatio: false
                      }}
                      />}
                      </Grid>
                      <Grid container item sm={6} justify="center">
                      {`${data?.Wind.speed}km/h`}
                      </Grid>
                      <Grid container item sm={6} justify="center">
                     {`${data?.humidity}%`}
                      </Grid>
              </Grid>
          </Drawer>
  );
}
