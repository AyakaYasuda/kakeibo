import {
  legacy_createStore as reduxCreateStore,
  combineReducers,
  applyMiddleware,
  compose,
} from "redux";
import thunk from "redux-thunk";

import { SpendingReducer } from "../spending/reducers";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = reduxCreateStore(
  combineReducers({
    spending: SpendingReducer,
    // users: UsersReducer,
  }),
  composeEnhancers(applyMiddleware(thunk))
);

export default store;
