import Types from "./Types";

const INITIAL_STATE = {
  businessReports: [],
  numberOfBusinessReports: 0,
  isLoading: false,
};

export default function businessReports(state = INITIAL_STATE, action) {
  const { type, payload } = action;
  switch (type) {
    case Types.SEARCH_BUSINESS_REPORTS_SUCCESS: {
      return {
        ...state,
        businessReports: payload.content,
        numberOfBusinessReports: payload.count,
      };
    }
    case Types.BUSINESS_REPORTS_LOADING: {
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
