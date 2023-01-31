import Types from "./Types";

export const getSubReportsDTDRequest = (body) => ({
  type: Types.SUBSCRIPTION_REPORTS_DTD_REQUEST,
  payload: body,
});

export const getSubReportsDTDSuccess = (data) => ({
  type: Types.SUBSCRIPTION_REPORTS_DTD_SUCCESS,
  payload: data,
});

export const getSubReportsWTWRequest = (body) => ({
  type: Types.SUBSCRIPTION_REPORTS_WTW_REQUEST,
  payload: body,
});

export const getSubReportsWTWSuccess = (data) => ({
  type: Types.SUBSCRIPTION_REPORTS_WTW_SUCCESS,
  payload: data,
});

export const getSubReportsMTMRequest = (body) => ({
  type: Types.SUBSCRIPTION_REPORTS_MTM_REQUEST,
  payload: body,
});

export const getSubReportsMTMSuccess = (data) => ({
  type: Types.SUBSCRIPTION_REPORTS_MTM_SUCCESS,
  payload: data,
});

export const getSubReportsYTYRequest = (body) => ({
  type: Types.SUBSCRIPTION_REPORTS_YTY_REQUEST,
  payload: body,
});

export const getSubReportsYTYSuccess = (data) => ({
  type: Types.SUBSCRIPTION_REPORTS_YTY_SUCCESS,
  payload: data,
});

export const controlsubReportsLoading = (isLoading: boolean) => ({
  type: Types.SUBSCRIPTION_REPORTS_LOADING,
  payload: isLoading,
});
