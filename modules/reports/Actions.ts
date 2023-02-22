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

export const getAllCustomersReportsRequest = (body) => ({
  type: Types.SEARCH_CUSTOMERS_LIST_REPORTS_REQUEST,
  payload: body,
});

export const getAllCustomersReportsSuccess = (data) => ({
  type: Types.SEARCH_CUSTOMERS_LIST_REPORTS_SUCCESS,
  payload: data,
});

export const controlLogsReportsLoading = (
  isLoading: boolean,
  component?: string
) => ({
  type: Types.REPORTS_LOADING,
  payload: { isLoading, component },
});
