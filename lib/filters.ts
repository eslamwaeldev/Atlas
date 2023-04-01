export const weatherFilter = (weatherData: any) => {
  if (weatherData?.list?.length > 1) {
    return weatherData?.list?.[1];
  } else {
    return weatherData?.list?.[0];
  }
};
