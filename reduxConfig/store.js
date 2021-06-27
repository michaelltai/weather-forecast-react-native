import { createStore, applyMiddleware, combineReducers } from "redux";
import weatherReducers from "./reducers/weatherReducers";
import createSagaMiddleware from "redux-saga";
import rootSaga from "./sagas/saga";

const rootReducer = combineReducers({
  weatherReducers: weatherReducers,
});

const sagaMiddleware = createSagaMiddleware();
const store = createStore(rootReducer, applyMiddleware(sagaMiddleware));
sagaMiddleware.run(rootSaga);

export default store;
