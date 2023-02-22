import Types from "./Types";

export const getAllLogsReportsRequest = (body) => ({
  type: Types.SEARCH_LOGS_REPORTS_REQUEST,
  payload: body,
});

export const getAllLogsReportsSuccess = (data) => ({
  type: Types.SEARCH_LOGS_REPORTS_SUCCESS,
  payload: data,
});

export const getAllSubscriptionsReportsRequest = (body) => ({
  type: Types.SEARCH_SUBSCRIPTIONS_REPORTS_REQUEST,
  payload: body,
});

export const getAllSubscriptionsReportsSuccess = (data) => ({
  type: Types.SEARCH_SUBSCRIPTIONS_REPORTS_SUCCESS,
  payload: data,
});

export const controlLogsReportsLoading = (isLoading: boolean) => ({
  type: Types.REPORTS_LOADING,
  payload: isLoading,
});
