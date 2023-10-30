import Types from "./Types";

const INITIAL_STATE = {
  stockitems: [],
  numberOfStockitems: 0,
  isLoading: false,
  singleStockitem: {},
};

export default function stockitem(state = INITIAL_STATE, action) {
  const { type, payload } = action;
  switch (type) {
    case Types.SEARCH_STOCKITEMS_SUCCESS: {
      return {
        ...state,
        stockitems: payload.content,
        numberOfStockitems: payload.count,
      };
    }
    case Types.SEARCH_USER_STOCKITEMS_SUCCESS: {
      return {
        ...state,
        stockitems: payload.content,
        numberOfStockitems: payload.count,
      };
    }
    case Types.CREATE_STOCKITEMS_SUCCESS: {
      return {
        ...state,
        stockitems: [action.payload, ...state.stockitems],
      };
    }
    case Types.GET_STOCKITEMS_SUCCESS: {
      return {
        ...state,
        singleStockitem: payload,
      };
    }
    case Types.STOCKITEMS_LOADING: {
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
