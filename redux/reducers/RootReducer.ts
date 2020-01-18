import { combineReducers } from "redux";
const INITIAL_STATE = {
  currentUser: ""
};

const UserReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "LOGIN_USER":
      return {
        ...state,
        currentUser: action.payload
      };

    default:
      return {
        ...state
      };
  }
};
const rootReducer = combineReducers({ user: UserReducer });

export default rootReducer;
