import Types from "./Types";

const INITIAL_STATE = {
  logsReports: [],
  subscriptions: [],
  numberOfLogsReports: 0,
  isLoading: false,
};

export default function reports(state = INITIAL_STATE, action) {
  const { type, payload } = action;
  switch (type) {
    case Types.SEARCH_LOGS_REPORTS_SUCCESS: {
      return {
        ...state,
        logsReports: payload,
      };
    }
    case Types.SEARCH_SUBSCRIPTIONS_REPORTS_SUCCESS: {
      return {
        ...state,
        subscriptions: payload,
      };
    }
    case Types.REPORTS_LOADING: {
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
