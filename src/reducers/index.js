const initialState = {
  winners: [],
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case 'GET_WINNERS': {
      return {
        ...state,
        winners: action.payload,
      };
    }

    default: {
      return state;
    }
  }
}

export default rootReducer;
