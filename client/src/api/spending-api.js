import axios from "axios";
const apiBaseUrl = process.env.REACT_APP_BACKEND_API;

const spending = "/spending/";

export const getSpendingById = async sid => {
  await axios.get(apiBaseUrl + spending + sid);
};

export const getSpendingByUserId = async uid => {
  await axios.get(apiBaseUrl + spending + `user/${uid}`);
};

export const createSpending = async newSpending => {
  await axios.post(apiBaseUrl + spending, newSpending);
};

export const updateSpending = async (sid, spendingToUpdate) => {
  await axios.patch(apiBaseUrl + spending + sid, spendingToUpdate);
};

export const deleteSpending = async (sid, spendingToDelete) => {
  await axios.delete(apiBaseUrl + spending + sid, spendingToDelete);
};
