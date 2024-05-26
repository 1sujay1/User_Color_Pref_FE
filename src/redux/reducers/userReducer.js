const initialState = {
  name: "Guest",
  token: "",
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_NAME":
      return { ...state, name: action.payload };
    case "SET_TOKEN":
      return { ...state, token: action.payload };
    case "REM_TOKEN":
      return { ...state, token: "" };
    default:
      return state;
  }
};

export default userReducer;
