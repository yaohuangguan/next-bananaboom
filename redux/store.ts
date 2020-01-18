import { createStore, applyMiddleware } from "redux";
import logger from 'redux-logger';
import thunk from "redux-thunk";
import rootReducer from "./reducers/RootReducer";
const middlewares = [logger,thunk]
export const initializeStore = (initialState = {}) => {
  return createStore(
    rootReducer,
    initialState,
    applyMiddleware(...middlewares))
}