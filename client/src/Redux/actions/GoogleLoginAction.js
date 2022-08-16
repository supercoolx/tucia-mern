export const switchLogin = () => {
  return {
    type: "switch",
  };
};
export const trueLoginGoogle = (data) => {
  return {
    type: "true",
    payload: data,
  };
};
export const falseLogin = () => {
  return {
    type: "false",
  };
};
