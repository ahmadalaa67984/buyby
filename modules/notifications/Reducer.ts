import Types from "./Types";

const INITIAL_STATE = {
  notifications: [],
  numberOfNotifications: 0,
  isLoading: false,
  singleNotification: {},
};

export default function notifications(state = INITIAL_STATE, action) {
  const { type, payload } = action;
  switch (type) {
    case Types.SEARCH_NOTIFICATIONS_SUCCESS: {
      return {
        ...state,
        notifications: payload.content,
        numberOfNotifications: payload.count,
      };
    }
    case Types.SEARCH_USER_NOTIFICATIONS_SUCCESS: {
      return {
        ...state,
        notifications: payload.content,
        numberOfNotifications: payload.count,
      };
    }
    case Types.GET_NOTIFICATIONS_SUCCESS: {
      return {
        ...state,
        singleNotification: payload,
      };
    }
    case Types.NOTIFICATIONS_LOADING: {
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
