export interface data<T=any> {
    [id: string]: T[];
}

export interface resultsInterface<T> {
    [id: string]: T[];
}

export interface forecastInterface{
    id: number,
    pression: string,
    humidity: string,
    weather: string[],
    dateObj: Date,
    icon: string,
    createdAt: Date,
    updateAt: Date,
    cityId: number,
    cloudId: number,
    precipitationId: number,
    temperatureId: number,
    windId: number,
    Precipitation: precipitationInterface,
    Cloud: cloudsInterface
    Temperature: temperatureInterface,
    Wind: windInterface,
    City: string
}

interface precipitationInterface{
    id: number,
    mode: string,
    value: string,
    createdAt: Date,
    updateAt: Date
}

interface cloudsInterface{
    id: number,
    cover: number,
    name: string,
    createdAt: Date,
    updateAt: Date
}

interface temperatureInterface{
    id: number,
    value: string,
    value_max: string,
    value_min: string,
    feeling: string,
    createdAt: Date,
    updateAt: Date
}

interface windInterface{
    id: number,
    direction_degree: string,
    direction_code: string,
    direction_name: string,
    speed: string,
    speed_name: string,
    createdAt: Date,
    updatedAt: Date
}

export interface birdInterface {
  props: JSX.IntrinsicElements['group'];
  callback: () => void;
  birdSpeed: number;
}