import Types from "./Types";

export const getAllSuperAdminsRequest = (body) => ({
  type: Types.GET_ALL_SUPER_ADMINS_REQUEST,
  payload: body,
});

export const getAllSuperAdminsSuccess = (data) => ({
  type: Types.GET_ALL_SUPER_ADMINS_SUCCESS,
  payload: data,
});

export const createSuperAdminsRequest = (body) => ({
  type: Types.CREATE_SUPER_ADMIN_REQUEST,
  payload: body,
});

export const createSuperAdminsSuccess = (data) => ({
  type: Types.CREATE_SUPER_ADMIN_SUCCESS,
  payload: data,
});

export const controlSuperAdminLoading = (isLoading: boolean) => ({
  type: Types.SUPER_ADMIN_LOADING,
  payload: isLoading,
});
