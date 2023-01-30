import Types from "./Types";

export const getAllSystemLogsRequest = (body) => ({
  type: Types.SEARCH_SYSTEM_LOGS_REQUEST,
  payload: body,
});

export const getAllSystemLogsSuccess = (data) => ({
  type: Types.SEARCH_SYSTEM_LOGS_SUCCESS,
  payload: data,
});

export const getSystemLogRequest = (body) => ({
  type: Types.GET_SYSTEM_LOGS_REQUEST,
  payload: body,
});

export const getSystemLoguccess = (data) => ({
  type: Types.GET_SYSTEM_LOGS_SUCCESS,
  payload: data,
});

export const deleteSystemLogRequest = (body) => ({
  type: Types.DELETE_SYSTEM_LOG_REQUEST,
  payload: body,
});

export const deleteSystemLogSuccess = (data) => ({
  type: Types.DELETE_SYSTEM_LOG_SUCCESS,
  payload: data,
});

export const controlSystemLogsLoading = (isLoading: boolean) => ({
  type: Types.SYSTEM_LOGS_LOADING,
  payload: isLoading,
});
