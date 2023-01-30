import Types from "./Types";

export const getAllCustomerReportsRequest = (body) => ({
  type: Types.SEARCH_CUSTOMER_REPORTS_REQUEST,
  payload: body,
});

export const getAllCustomerReportsSuccess = (data) => ({
  type: Types.SEARCH_CUSTOMER_REPORTS_SUCCESS,
  payload: data,
});

export const controlCustomerReportsLoading = (isLoading: boolean) => ({
  type: Types.CUSTOMER_REPORTS_LOADING,
  payload: isLoading,
});
