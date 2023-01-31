import Types from "./Types";

const INITIAL_STATE = {
  superAdmins: [],
  numberOfSuperAdmins: 0,
  isLoading: false,
};

export default function superAdmin(state = INITIAL_STATE, action) {
  const { type, payload } = action;
  switch (type) {
    case Types.GET_ALL_SUPER_ADMINS_SUCCESS: {
      return {
        ...state,
        superAdmins: payload.content,
        numberOfSuperAdmins: payload.count,
      };
    }
    case Types.CREATE_SUPER_ADMIN_SUCCESS: {
      return {
        ...state,
        superAdmins: [action.payload, ...state.superAdmins],
      };
    }
    case Types.SUPER_ADMIN_LOADING: {
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
