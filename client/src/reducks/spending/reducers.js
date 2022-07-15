import * as Actions from './actions';
import initialState from '../store/initialState';

export const SpendingReducer = (state = initialState.spending, action) => {
  switch (action.type) {
    case Actions.FETCH_USERS_SPENDING:
      return {
        ...state,
        spendingList: [...action.payload],
      };

    case Actions.CREATE_SPENDING:
      return {
        ...state,
        spendingList: [action.payload, ...state.spendingList],
      };

    case Actions.DELETE_SPENDING:
      return {
        ...state,
        spendingList: state.spendingList.filter(
          (spending) => spending.id !== action.payload
        ),
      };

    case Actions.UPDATE_SPENDING:
      let identifiedSpending = state.spendingList.find(
        (spending) => spending.id === action.payload.id
      );
      identifiedSpending = action.payload.data;

      const remainingSpending = state.spendingList.filter(
        (spending) => spending.id !== action.payload.id
      );
      return {
        ...state,
        spendingList: [...remainingSpending, identifiedSpending],
      };

    case Actions.SET_ERROR:
      return {
        ...state,
        error: {
          status: action.payload.status,
          message: action.payload.message,
        },
      };

    case Actions.RESET_ERROR:
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
