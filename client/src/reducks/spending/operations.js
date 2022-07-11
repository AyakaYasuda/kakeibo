import axios from "axios";
import {
  fetchUsersSpendingAction,
  createSpendingAction,
  deleteSpendingAction,
  updateSpendingAction,
} from "./actions";

export const getSpendingByUserId = userId => {
  return async dispatch => {
    await axios
      .get(`${process.env.REACT_APP_BACKEND_API}/spending/user/${userId}`)
      .then(response => {
        dispatch(fetchUsersSpendingAction(response.data.usersSpending));
      })
      .catch(err => {
        console.log(err);
      });
  };
};

export const createSpending = (newSpending, token) => {
  return async dispatch => {
    await axios
      .post(`${process.env.REACT_APP_BACKEND_API}/spending`, newSpending, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(response => {
        dispatch(createSpendingAction(response.data.spending));
      })
      .catch(err => {
        console.log(err);
      });
  };
};

export const deleteSpending = (spendingId, token) => {
  return async dispatch => {
    await axios
      .delete(`${process.env.REACT_APP_BACKEND_API}/spending/${spendingId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(response => {
        dispatch(deleteSpendingAction(response.data.spendingId));
      })
      .catch(err => {
        console.log(err);
      });
  };
};

export const updateSpending = (spendingId, updatedSpending, token) => {
  return async dispatch => {
    await axios
      .patch(
        `${process.env.REACT_APP_BACKEND_API}/spending/${spendingId}`,
        updatedSpending,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then(response => {
        dispatch(
          updateSpendingAction({
            id: response.data.spendingId,
            data: response.data.spending,
          })
        );
      })
      .catch(err => {
        console.log(err);
      });
  };
};
