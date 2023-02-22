import Types from "./Types";

const INITIAL_STATE = {
  logsReports: [],
  subscriptions: [],
  customersList: [],
  numberOfLogsReports: 0,
  isLoading: false,
  component: "",
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
    case Types.SEARCH_CUSTOMERS_LIST_REPORTS_SUCCESS: {
      return {
        ...state,
        customersList: payload,
      };
    }
    case Types.REPORTS_LOADING: {
      return {
        ...state,
        isLoading: payload.isLoading,
        component: payload.component,
      };
    }

    default: {
      return state;
    }
  }
}
