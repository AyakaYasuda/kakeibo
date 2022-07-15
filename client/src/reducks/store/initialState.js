const initialState = {
  spending: {
    spendingList: [],
    error: {
      status: null,
      message: '',
    },
  },
  users: {
    isLoggedIn: false,
    uid: null,
    username: '',
    email: '',
    password: '',
    token: null,
    budget: null,
    error: {
      status: null,
      message: '',
    },
  },
};

export default initialState;
