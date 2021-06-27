import { put, call, all, fork, takeLatest } from "redux-saga/effects";
import ApiService from "../services/apiservices";

import {
  writeWeeklyWeather,
  writeHourlyWeather,
} from "../actions/weatherAction";

function* getWeatherData() {
  const result = yield call(
    ApiService.getAPI,
    `https://api.openweathermap.org/data/2.5/onecall?lat=3.15&lon=101.71&exclude=current,minutely,alerts&units=metric&appid=b25c314cd84a8c1039c7a68fb4490a0c`
  );

  if (result) {
    yield put(writeWeeklyWeather(result));
  }
}

function* getHourlyData() {
  const result = yield call(
    ApiService.getAPI,
    `https://api.openweathermap.org/data/2.5/forecast?q=Kuala%20Lumpur&units=metric&appid=b25c314cd84a8c1039c7a68fb4490a0c`
  );

  if (result) {
    yield put(writeHourlyWeather(result));
  }
}

export function* weatherDataListener() {
  yield takeLatest("GET_WEATHER", getWeatherData);
}

export function* hourDataListener() {
  yield takeLatest("GET_HOURLY_WEATHER", getHourlyData);
}

export default function* rootSaga() {
  yield all([weatherDataListener(), hourDataListener()]);
}
