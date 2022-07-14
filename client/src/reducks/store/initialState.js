const initialState = {
  spending: {
    spendingList: [],
  },
  users: {
    isLoggedIn: false,
    uid: null,
    username: '',
    email: '',
    password: '',
    token: null,
    budget: null,
  },
};

export default initialState;
