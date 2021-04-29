import { forecastInterface } from "../../interfaces/utils";

export const mockedCharts = {
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

export function TemperatureChart(allData: forecastInterface[]){
return {
        labels: [`${allData[0].dateObj}`, `${allData[1].dateObj}`, `${allData[2].dateObj}`, `${allData[3].dateObj}`, `${allData[4].dateObj}`],
        datasets: [
          {
            label: 'Temperature',
            backgroundColor: 'rgba(255,99,132,0.2)',
            borderColor: 'rgba(255,99,132,1)',
            borderWidth: 1,
            hoverBackgroundColor: 'rgba(255,99,132,0.4)',
            hoverBorderColor: 'rgba(255,99,132,1)',
            data: [+allData[0].Temperature.value, +allData[1].Temperature.value, +allData[2].Temperature.value, +allData[3].Temperature.value, +allData[4].Temperature.value],
          }
        ],
      }
}