const initialState = { value: "#ffffff" };

const colorReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_COLOR":
      return { ...state, value: action.payload };
    default:
      return state;
  }
};

export default colorReducer;
