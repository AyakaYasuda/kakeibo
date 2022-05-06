const initialState = {
  spending: {
    spendingList: [
      {
        id: "s1",
        category: "Shopping",
        title: "boots",
        amount: 121.89,
        memo: "a treat for myself",
      },
    ],
  },
  users: {
    isLoggedIn: false,
    uid: "",
    username: "",
  },
};

export default initialState;
