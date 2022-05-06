export const CREATE_SPENDING = "CREATE_SPENDING";
export const createSpendingAction = spending => {
  return {
    type: "CREATE_SPENDING",
    payload: spending,
  };
};

export const DELETE_SPENDING = "DELETE_SPENDING";
export const deleteSpendingAction = spendingId => {
  return {
    type: "DELETE_SPENDING",
    payload: spendingId,
  };
};
