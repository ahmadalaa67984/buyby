import Types from "./Types";

export const getAllBusinessReportsRequest = (body) => ({
  type: Types.SEARCH_BUSINESS_REPORTS_REQUEST,
  payload: body,
});

export const getAllBusinessReportsSuccess = (data) => ({
  type: Types.SEARCH_BUSINESS_REPORTS_SUCCESS,
  payload: data,
});

export const controlBusinessReportsLoading = (isLoading: boolean) => ({
  type: Types.BUSINESS_REPORTS_LOADING,
  payload: isLoading,
});
