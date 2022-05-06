export const CREATE_SPENDING = "CREATE_SPENDING";
export const createSpendingAction = spending => {
  console.log(spending);
  return {
    type: "CREATE_SPENDING",
    payload: spending,
  };
};
