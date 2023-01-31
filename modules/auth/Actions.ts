import Types from "./Types";

// SIGNIN User
export const signinRequest = (formData) => ({
  type: Types.SIGNIN_REQUEST,
  payload: formData,
});

export const signinSuccess = ({ data }) => ({
  type: Types.SIGNIN_SUCCESS,
  payload: {
    data,
  },
});

export const signinFail = () => ({
  type: Types.SIGNIN_FAIL,
});

export const signoutRequest = () => ({
  type: Types.SIGNOUT_REQUEST,
});

export const signoutSuccess = () => ({
  type: Types.SIGNOUT_SUCCESS,
});

export const signoutFail = () => ({
  type: Types.SIGNOUT_FAIL,
});

export const resetPasswordRequest = (formData) => ({
  type: Types.RESET_PASSWORD_REQUEST,
  payload: formData,
});

export const resetPasswordSuccess = ({ data }) => ({
  type: Types.RESET_PASSWORD_SUCCESS,
  payload: {
    data,
  },
});

export const resetPasswordFail = () => ({
  type: Types.RESET_PASSWORD_FAIL,
});

export const addAuthLoading = (isLoading) => ({
  type: Types.ADD_LOADING_AUTH,
  payload: isLoading,
});
