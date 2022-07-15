import * as Actions from './actions';
import initialState from '../store/initialState';

export const UsersReducer = (state = initialState.users, action) => {
  switch (action.type) {
    case Actions.LOGIN:
      return {
        ...state,
        ...action.payload,
      };

    case Actions.SIGNUP:
      return {
        ...state,
        ...action.payload,
      };

    case Actions.LOGOUT:
      return {
        ...state,
        ...action.payload,
      };

    case Actions.ADD_BUDGET:
      return {
        ...state,
        ...action.payload,
      };

    case Actions.FETCH_BUDGET:
      return {
        ...state,
        ...action.payload,
      };

    case Actions.SET_ERROR:
      return {
        ...state,
        error: {
          status: action.payload.status,
          message: action.payload.message,
        },
      };

    default:
      return state;
  }
};
