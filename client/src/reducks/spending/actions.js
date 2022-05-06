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

export const UPDATE_SPENDING = "UPDATE_SPENDING";
export const updateSpendingAction = (spendingId, spending) => {
  console.log(spendingId)
  return {
    type: "UPDATE_SPENDING",
    payload: {
      id: spendingId,
      data: spending,
    },
  };
};
