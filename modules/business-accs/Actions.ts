import Types from "./Types";

export const getAllBusinessAccountsRequest = (body) => ({
  type: Types.SEARCH_ALL_BUSINESS_ACCS_REQUEST,
  payload: body,
});

export const getAllBusinessAccountsSuccess = (data) => ({
  type: Types.SEARCH_ALL_BUSINESS_ACCS_SUCCESS,
  payload: data,
});

export const controlBussinesAccLoading = (isLoading: boolean) => ({
  type: Types.BUSINESS_LOADING,
  payload: isLoading,
});
