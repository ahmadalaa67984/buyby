import Types from "./Types";

const INITIAL_STATE = {
  customerAccs: [],
  numberOfCustomerAcc: 0,
  isLoading: false,
  singleCustomer: {},
};

export default function customerAccs(state = INITIAL_STATE, action) {
  const { type, payload } = action;
  switch (type) {
    case Types.SEARCH_ALL_CUSTOMERS_SUCCESS: {
      return {
        ...state,
        customerAccs: payload.content,
        numberOfCustomerAcc: payload.count,
      };
    }
    case Types.GET_CUSTOMER_SUCCESS: {
      return {
        ...state,
        singleCustomer: payload,
      };
    }
    case Types.CUSTOMERS_LOADING: {
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
