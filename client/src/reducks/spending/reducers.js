import * as Actions from "./actions";
import initialState from "../store/initialState";

export const SpendingReducer = (state = initialState.spending, action) => {
  switch (action.type) {
    case Actions.CREATE_SPENDING:
      return {
        spendingList: [...state.spendingList, action.payload],
      };

    case Actions.DELETE_SPENDING:
      return {
        spendingList: state.spendingList.filter(
          spending => spending.id !== action.payload
        ),
      };

    case Actions.UPDATE_SPENDING:
      let identifiedSpending = state.spendingList.find(
        spending => spending.id === action.payload.id
      );
      identifiedSpending = action.payload.data;

      const remainingSpending = state.spendingList.filter(
        spending => spending.id !== action.payload.id
      );
      return {
        spendingList: [...remainingSpending, identifiedSpending],
      };

    default:
      return state;
  }
};
