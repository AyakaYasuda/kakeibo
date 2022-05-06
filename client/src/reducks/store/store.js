import {
  legacy_createStore as reduxCreateStore,
  combineReducers,
  applyMiddleware,
  compose,
} from "redux";
import thunk from "redux-thunk";

import { SpendingReducer } from "../spending/reducers";

const store = reduxCreateStore(
  combineReducers({
    spending: SpendingReducer,
    // users: UsersReducer,
  }),
  applyMiddleware(thunk),
);

export default store;
