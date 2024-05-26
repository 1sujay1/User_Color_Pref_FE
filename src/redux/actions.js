export const setColor = (color) => ({
  type: "SET_COLOR",
  payload: color,
});

export const setName = (name) => ({
  type: "SET_NAME",
  payload: name,
});
export const setToken = (token) => ({
  type: "SET_TOKEN",
  payload: token,
});
export const remToken = () => ({
  type: "REM_TOKEN",
});
