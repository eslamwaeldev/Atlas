export type CountryName = {
  common: string;
  official: string;
};

export type CountryCurrency = {
  name: string;
  symbol: string;
};
export type Currencies = {
  [key: string]: CountryCurrency;
};
export type CountryFlags = {
  png: string;
  svg: string;
  alt: string;
};

export type Country = {
  name: CountryName;
  currencies: Currencies;
  capital: [string];
  latlng: number[];
  borders: [string];
  flags: CountryFlags;
  continents: [string];
  population: number;
};

export type Time = {
  year: number;
  month: number;
  day: number;
  hour: number;
  minute: number;
  seconds: number;
  milliSeconds: number;
  dateTime: string;
  date: string;
  time: string;
  timeZone: string;
  dayOfWeek: string;
  dstActive: boolean;
};

export type WeatherMain = {
  feels_like: number;
  grnd_level: number;
  humidity: number;
  pressure: number;
  sea_level: number;
  temp: number;
  temp_max: number;
  temp_min: number;
};

export type WeatherObj = {
  description: string;
  icon: string;
  id: number;
  main: string;
};

export type Weather = {
  main: WeatherMain;
  weather: [WeatherObj];
};

export type ImageUrls = {
  full: string;
  raw: string;
  regular: string;
  small: string;
  small_s3: string;
  thumb: string;
};

export type ImageUser = {
  first_name: string;
  last_name: string;
};

export type CountryImageUrls = {
  urls: ImageUrls;
  user: ImageUser;
  description: string;
};
export type CountryImages = {
  results: [CountryImageUrls];
};
