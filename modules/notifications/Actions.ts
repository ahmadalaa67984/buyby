import Types from "./Types";

export const getAllNotificationsRequest = (body) => ({
  type: Types.SEARCH_NOTIFICATIONS_REQUEST,
  payload: body,
});

export const getAllNotificationsSuccess = (data) => ({
  type: Types.SEARCH_NOTIFICATIONS_SUCCESS,
  payload: data,
});

export const getAllUserNotificationsRequest = (body) => ({
  type: Types.SEARCH_USER_NOTIFICATIONS_REQUEST,
  payload: body,
});

export const getAllUserNotificationsSuccess = (data) => ({
  type: Types.SEARCH_USER_NOTIFICATIONS_SUCCESS,
  payload: data,
});

export const createNotificationRequest = (body) => ({
  type: Types.CREATE_NOTIFICATIONS_REQUEST,
  payload: body,
});

export const createNotificationSuccess = (data) => ({
  type: Types.CREATE_NOTIFICATIONS_SUCCESS,
  payload: data,
});

export const getNotificationRequest = (body) => ({
  type: Types.GET_NOTIFICATIONS_REQUEST,
  payload: body,
});

export const getNotificationSuccess = (data) => ({
  type: Types.GET_NOTIFICATIONS_SUCCESS,
  payload: data,
});

export const deleteNotificationRequest = (body) => ({
  type: Types.DELETE_NOTIFICATION_REQUEST,
  payload: body,
});

export const deleteNotificationSuccess = (data) => ({
  type: Types.DELETE_NOTIFICATION_SUCCESS,
  payload: data,
});

export const controlNotificationsLoading = (isLoading: boolean) => ({
  type: Types.NOTIFICATIONS_LOADING,
  payload: isLoading,
});
