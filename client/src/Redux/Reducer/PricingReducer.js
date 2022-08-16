const initialState = {
  counter: 3,
  isLogged: true,
};

const CounterReducer = (state = initialState, action) => {
  switch (action.type) {
    case "one": {
      return {
        ...state,
        counter: 1,
      };
    }

    case "two": {
      return {
        ...state,
        counter: 2,
      };
    }

    case "three": {
      return {
        ...state,
        counter: 3,
      };
    }

    default:
      return state;
  }
};

export default CounterReducer;
