import * as Actions from "./actions";
import initialState from "../store/initialState";

export const SpendingReducer = (state = initialState.spending, action) => {
  console.log(action);
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
    default:
      return state;
  }
};
