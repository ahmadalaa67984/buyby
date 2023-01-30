import Types from "./Types";

const INITIAL_STATE = {
  businessAccs: [],
  numberOfBusinessAcc: 0,
  isLoading: false,
};

export default function businessAccs(state = INITIAL_STATE, action) {
  const { type, payload } = action;
  switch (type) {
    case Types.SEARCH_ALL_BUSINESS_ACCS_SUCCESS: {
      return {
        ...state,
        businessAccs: payload.content,
        numberOfBusinessAcc: payload.count,
      };
    }
    case Types.BUSINESS_LOADING: {
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
