import Types from "./Types";

const INITIAL_STATE = {
  tutorials: [],
  numberOfTutorials: 0,
  isLoading: false,
  singleTutorial: {},
};

export default function tutorials(state = INITIAL_STATE, action) {
  const { type, payload } = action;
  switch (type) {
    case Types.SEARCH_TUTORIALS_SUCCESS: {
      return {
        ...state,
        tutorials: payload.content,
        numberOfTutorials: payload.count,
      };
    }
    case Types.SEARCH_USER_TUTORIALS_SUCCESS: {
      return {
        ...state,
        tutorials: payload.content,
        numberOfTutorials: payload.count,
      };
    }
    case Types.CREATE_TUTORIALS_SUCCESS: {
      return {
        ...state,
        tutorials: [action.payload, ...state.tutorials],
      };
    }
    case Types.GET_TUTORIALS_SUCCESS: {
      return {
        ...state,
        singleTutorial: payload,
      };
    }
    case Types.TUTORIALS_LOADING: {
      return {
        ...state,
        isLoading: payload,
      };
    }

    default: {
      return state;
    }
  }
}
