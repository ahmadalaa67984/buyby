import Types from "./Types";

const INITIAL_STATE = {
  customerReports: [],
  numberOfCustomerReports: 0,
  isLoading: false,
};

export default function customerReports(state = INITIAL_STATE, action) {
  const { type, payload } = action;
  switch (type) {
    case Types.SEARCH_CUSTOMER_REPORTS_SUCCESS: {
      return {
        ...state,
        customerReports: payload.content,
        numberOfCustomerReports: payload.count,
      };
    }
    case Types.CUSTOMER_REPORTS_LOADING: {
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
