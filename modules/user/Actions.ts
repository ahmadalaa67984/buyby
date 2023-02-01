import Types from "./Types";

export const getUserRequest = () => ({
  type: Types.GET_USER_REQUEST,
});

export const getUserSuccess = (formData) => ({
  type: Types.GET_USER_SUCCESS,
  payload: formData,
});

export const getProfileRequest = () => ({
  type: Types.GET_PROFILE_REQUEST,
});

export const getProfileSuccess = (formData) => ({
  type: Types.GET_PROFILE_SUCCESS,
  payload: formData,
});

export const addUserLoading = (isLoading) => ({
  type: Types.ADD_LOADING_USER,
  payload: isLoading,
});

export const addUserAuthLoading = (isLoading) => ({
  type: Types.ADD_USER_LOADING_AUTH,
  payload: isLoading,
});
export const addUserDataLoading = (isLoading) => ({
  type: Types.ADD_USER_LOADING_AUTH,
  payload: isLoading,
});
