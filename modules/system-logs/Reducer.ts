import Types from "./Types";

const INITIAL_STATE = {
  sysLogs: [],
  numberOfSystemLog: 0,
  isLoading: false,
  singleSysLog: {},
};

export default function systemLogs(state = INITIAL_STATE, action) {
  const { type, payload } = action;
  switch (type) {
    case Types.SEARCH_SYSTEM_LOGS_SUCCESS: {
      return {
        ...state,
        sysLogs: payload.content,
        numberOfSystemLog: payload.count,
      };
    }
    case Types.GET_SYSTEM_LOGS_SUCCESS: {
      return {
        ...state,
        singleSysLog: payload,
      };
    }
    case Types.SYSTEM_LOGS_LOADING: {
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
