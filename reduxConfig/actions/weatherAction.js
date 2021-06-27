export const writeWeeklyWeather = (data) => ({
  type: "WRITE_WEEKLY_WEATHER",
  payload: data,
});

export const getWeather = () => ({
  type: "GET_WEATHER",
});

export const getHourlyWeather = () => ({
  type: "GET_HOURLY_WEATHER",
});

export const writeHourlyWeather = (data) => ({
  type: "WRITE_HOURLY_WEATHER",
  payload: data,
});
