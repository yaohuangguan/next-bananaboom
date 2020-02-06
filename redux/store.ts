import { createStore, applyMiddleware } from "redux";

import rootReducer from "./reducers/RootReducer";
export const initializeStore = (initialState = {}) => {
  return createStore(
    rootReducer,
    initialState,
    applyMiddleware())
}