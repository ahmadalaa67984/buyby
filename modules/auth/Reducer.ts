import Types from "./Types";
import Cookie from "js-cookie";
import setAuthToken from "../../utils/apiHelpers";
const INITIAL_STATE = {
  data: {},
  userData: {},
  isLoading: false,
  isUserLoading: false,
  token: Cookie.get("token"),
  isLogged: false,
  verified: false,
};

export default function users(state = INITIAL_STATE, action) {
  const { type, payload } = action;
  switch (type) {
    case Types.SIGNIN_SUCCESS: {
      Cookie.set("token", payload.data.accessToken, { expires: 7 });
      // setLocalStorage('login', JSON.stringify(payload.data.user));
      setAuthToken(payload.data.accessToken);
      return {
        ...state,
        userData: payload.data.user,
        token: payload.data.accessToken,
        isLogged: true,
      };
    }

    case Types.ADD_LOADING_AUTH: {
      return {
        ...state,
        isLoading: payload,
      };
    }

    case Types.SIGNOUT_SUCCESS: {
      Cookie.remove("token");
      Cookie.remove("branchid");
      // window.localStorage.removeItem('login');

      return {
        ...state,
        data: {},
        userData: null,
        token: null,
        isLogged: false,
      };
    }
    default: {
      return state;
    }
  }
}
