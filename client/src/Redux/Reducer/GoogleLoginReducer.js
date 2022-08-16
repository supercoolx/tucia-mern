const initialState = {
  isloggedin: false,
  name: "",
  imageurl: "",
  email: "",
};

const LoginReducer = (state = initialState, action) => {
  switch (action.type) {
    case "switch": {
      return {
        ...state,
        isloggedin: !state.isloggedin,
      };
    }
    case "true": {
      return {
        ...state,
        isloggedin: true,
        name: action.payload.name,
        email: action.payload.email,
        imageurl: action.payload.imageurl,
      };
    }
    case "false": {
      return {
        ...state,
        isloggedin: false,
      };
    }
    default:
      return state;
  }
};

export default LoginReducer;
