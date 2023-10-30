import Types from "./Types";

export const getAllEntityRequest = (body) => ({
  type: Types.SEARCH_ENTITY_REQUEST,
  payload: body,
});

export const getAllEntitySuccess = (data) => ({
  type: Types.SEARCH_ENTITY_SUCCESS,
  payload: data,
});

export const getAllUserEntityRequest = (body) => ({
  type: Types.SEARCH_USER_ENTITY_REQUEST,
  payload: body,
});

export const getAllUserEntitySuccess = (data) => ({
  type: Types.SEARCH_USER_ENTITY_SUCCESS,
  payload: data,
});

export const createEntityRequest = (body) => ({
  type: Types.CREATE_ENTITY_REQUEST,
  payload: body,
});

export const createEntitySuccess = (data) => ({
  type: Types.CREATE_ENTITY_SUCCESS,
  payload: data,
});

export const getEntityRequest = (body) => ({
  type: Types.GET_ENTITY_REQUEST,
  payload: body,
});

export const getEntitySuccess = (data) => ({
  type: Types.GET_ENTITY_SUCCESS,
  payload: data,
});

export const deleteEntityRequest = (body) => ({
  type: Types.DELETE_ENTITY_REQUEST,
  payload: body,
});

export const deleteEntitySuccess = (data) => ({
  type: Types.DELETE_ENTITY_SUCCESS,
  payload: data,
});

export const controlEntityLoading = (isLoading: boolean) => ({
  type: Types.ENTITY_LOADING,
  payload: isLoading,
});
