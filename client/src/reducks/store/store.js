import {
  legacy_createStore as reduxCreateStore,
  combineReducers,
  applyMiddleware,
} from "redux";
import thunkMiddleware from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

import { SpendingReducer } from "../spending/reducers";
import { UsersReducer } from "../users/reducers";

export const configureStore = preloadedState => {
  const middlewareEnhancer = applyMiddleware(thunkMiddleware);
  const composedEnhancers = composeWithDevTools(middlewareEnhancer);

  const store = reduxCreateStore(
    combineReducers({
      spending: SpendingReducer,
      users: UsersReducer,
    }),
    preloadedState,
    composedEnhancers
  );

  return store;
};
