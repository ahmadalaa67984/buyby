import Types from "./Types";

export const getAllTutorialsRequest = (body) => ({
  type: Types.SEARCH_TUTORIALS_REQUEST,
  payload: body,
});

export const getAllTutorialsSuccess = (data) => ({
  type: Types.SEARCH_TUTORIALS_SUCCESS,
  payload: data,
});

export const getAllUserTutorialsRequest = (body) => ({
  type: Types.SEARCH_USER_TUTORIALS_REQUEST,
  payload: body,
});

export const getAllUserTutorialsSuccess = (data) => ({
  type: Types.SEARCH_USER_TUTORIALS_SUCCESS,
  payload: data,
});

export const createTutorialRequest = (body) => ({
  type: Types.CREATE_TUTORIALS_REQUEST,
  payload: body,
});

export const createTutorialSuccess = (data) => ({
  type: Types.CREATE_TUTORIALS_SUCCESS,
  payload: data,
});
export const editTutorialRequest = (body) => ({
  type: Types.EDIT_TUTORIALS_REQUEST,
  payload: body,
});

export const editTutorialSuccess = (data) => ({
  type: Types.EDIT_TUTORIALS_SUCCESS,
  payload: data,
});

export const getTutorialRequest = (body) => ({
  type: Types.GET_TUTORIALS_REQUEST,
  payload: body,
});

export const getTutorialSuccess = (data) => ({
  type: Types.GET_TUTORIALS_SUCCESS,
  payload: data,
});

export const deleteTutorialRequest = (body) => ({
  type: Types.DELETE_TUTORIAL_REQUEST,
  payload: body,
});

export const deleteTutorialSuccess = (data) => ({
  type: Types.DELETE_TUTORIAL_SUCCESS,
  payload: data,
});

export const controlTutorialsLoading = (isLoading: boolean) => ({
  type: Types.TUTORIALS_LOADING,
  payload: isLoading,
});
