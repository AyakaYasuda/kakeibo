export const FETCH_USERS_SPENDING = 'FETCH_USERS_SPENDING';
export const fetchUsersSpendingAction = (spending) => {
  return {
    type: 'FETCH_USERS_SPENDING',
    payload: spending,
  };
};

export const CREATE_SPENDING = 'CREATE_SPENDING';
export const createSpendingAction = (spending) => {
  return {
    type: 'CREATE_SPENDING',
    payload: spending,
  };
};

export const DELETE_SPENDING = 'DELETE_SPENDING';
export const deleteSpendingAction = (spendingId) => {
  return {
    type: 'DELETE_SPENDING',
    payload: spendingId,
  };
};

export const UPDATE_SPENDING = 'UPDATE_SPENDING';
export const updateSpendingAction = (spending) => {
  return {
    type: 'UPDATE_SPENDING',
    payload: { id: spending.id, data: spending.data },
  };
};

export const SET_ERROR = 'SET_ERROR';
export const setErrorAction = (error) => {
  return {
    type: 'SET_ERROR',
    payload: error,
  };
};
