import Types from "./Types";

export const getAllStockitemRequest = (body) => ({
  type: Types.SEARCH_STOCKITEMS_REQUEST,
  payload: body,
});

export const getAllStockitemSuccess = (data) => ({
  type: Types.SEARCH_STOCKITEMS_SUCCESS,
  payload: data,
});

export const getAllUserStockitemRequest = (body) => ({
  type: Types.SEARCH_USER_STOCKITEMS_REQUEST,
  payload: body,
});

export const getAllUserStockitemSuccess = (data) => ({
  type: Types.SEARCH_USER_STOCKITEMS_SUCCESS,
  payload: data,
});

export const createStockitemRequest = (body) => ({
  type: Types.CREATE_STOCKITEMS_REQUEST,
  payload: body,
});

export const createStockitemSuccess = (data) => ({
  type: Types.CREATE_STOCKITEMS_SUCCESS,
  payload: data,
});

export const getStockitemRequest = (body) => ({
  type: Types.GET_STOCKITEMS_REQUEST,
  payload: body,
});

export const getStockitemSuccess = (data) => ({
  type: Types.GET_STOCKITEMS_SUCCESS,
  payload: data,
});

export const deleteStockitemRequest = (body) => ({
  type: Types.DELETE_STOCKITEM_REQUEST,
  payload: body,
});

export const deleteStockitemSuccess = (data) => ({
  type: Types.DELETE_STOCKITEM_SUCCESS,
  payload: data,
});

export const controlStockitemLoading = (isLoading: boolean) => ({
  type: Types.STOCKITEMS_LOADING,
  payload: isLoading,
});
