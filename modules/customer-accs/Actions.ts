import Types from "./Types";

export const getAllCustomerRequest = (body) => ({
  type: Types.SEARCH_ALL_CUSTOMERS_REQUEST,
  payload: body,
});

export const getAllCustomerSuccess = (data) => ({
  type: Types.SEARCH_ALL_CUSTOMERS_SUCCESS,
  payload: data,
});

export const createCustomerRequest = (body) => ({
  type: Types.CREATE_CUSTOMER_REQUEST,
  payload: body,
});

export const createCustomerSuccess = (data) => ({
  type: Types.CREATE_CUSTOMER_SUCCESS,
  payload: data,
});

export const updateCustomerRequest = (body) => ({
  type: Types.UPDATE_CUSTOMER_REQUEST,
  payload: body,
});

export const updateCustomerSuccess = (data) => ({
  type: Types.UPDATE_CUSTOMER_SUCCESS,
  payload: data,
});

export const getCustomerRequest = (body) => ({
  type: Types.GET_CUSTOMER_REQUEST,
  payload: body,
});

export const getCustomerSuccess = (data) => ({
  type: Types.GET_CUSTOMER_SUCCESS,
  payload: data,
});

export const applyRecievePromotionRequest = (body) => ({
  type: Types.APPLY_RECIEVE_PROMOTION_REQUEST,
  payload: body,
});

export const applyRecievePromotionSuccess = (data) => ({
  type: Types.APPLY_RECIEVE_PROMOTION_SUCCESS,
  payload: data,
});

export const controlCustomersLoading = (isLoading: boolean) => ({
  type: Types.CUSTOMERS_LOADING,
  payload: isLoading,
});
