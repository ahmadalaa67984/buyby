import Types from "./Types";

const INITIAL_STATE = {
  subReports: [],
  numberOfSubReports: 0,
  isLoading: false,
};

export default function subReports(state = INITIAL_STATE, action) {
  const { type, payload } = action;
  switch (type) {
    case Types.SUBSCRIPTION_REPORTS_DTD_SUCCESS: {
      return {
        ...state,
        subReports: payload.content,
        numberOfSubReports: payload.count,
      };
    }
    case Types.SUBSCRIPTION_REPORTS_WTW_SUCCESS: {
      return {
        ...state,
        subReports: payload.content,
        numberOfSubReports: payload.count,
      };
    }
    case Types.SUBSCRIPTION_REPORTS_MTM_SUCCESS: {
      return {
        ...state,
        subReports: payload.content,
        numberOfSubReports: payload.count,
      };
    }
    case Types.SUBSCRIPTION_REPORTS_YTY_SUCCESS: {
      return {
        ...state,
        subReports: payload.content,
        numberOfSubReports: payload.count,
      };
    }
    case Types.SUBSCRIPTION_REPORTS_LOADING: {
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
