import { extractErrorMsgFromResponse } from "utils/apiHelpers";
import { toast } from "react-toastify";
import { call, fork, put, takeLatest } from "redux-saga/effects";
import * as actions from "./Actions";
import * as api from "./Api";
import Types from "./Types";

const defBody = {
  filterBy: [],
  attributesToRetrieve: [],
  offset: 0,
  size: 10,
  sort: "createdAt",
  dir: "desc",
  searchTerm: "",
  filterByDateFrom: null,
  filterByDateTo: null,
};

function* getAllNotifications({ payload }) {
  const body = { ...defBody, ...payload };
  try {
    yield put(actions.controlNotificationsLoading(true));
    const result = yield call(api.getAllNotifications, body);
    yield put(actions.getAllNotificationsSuccess(result.data));
  } catch (error) {
    extractErrorMsgFromResponse(error);
  } finally {
    yield put(actions.controlNotificationsLoading(false));
  }
}

function* getAllUserNotifications({ payload }) {
  const body = { ...defBody, ...payload };
  try {
    yield put(actions.controlNotificationsLoading(true));
    const result = yield call(api.getAllUserNotifications, body);
    yield put(actions.getAllUserNotificationsSuccess(result.data));
  } catch (error) {
    extractErrorMsgFromResponse(error);
  } finally {
    yield put(actions.controlNotificationsLoading(false));
  }
}

function* getNotification(formData) {
  try {
    yield put(actions.controlNotificationsLoading(true));
    const result = yield call(api.getNotification, formData.payload);
    yield put(actions.getNotificationSuccess(result.data));
    // window.location.reload();
  } catch (error) {
    extractErrorMsgFromResponse(error);
  } finally {
    yield put(actions.controlNotificationsLoading(false));
  }
}

function* createNotification(formData) {
  try {
    yield put(actions.controlNotificationsLoading(true));
    const result = yield call(api.createNotification, formData.payload);
    yield put(actions.createNotificationSuccess(result.data));
    window.location.reload();
  } catch (error) {
    extractErrorMsgFromResponse(error);
  } finally {
    yield put(actions.controlNotificationsLoading(false));
  }
}

function* deleteNotification(formData) {
  try {
    yield put(actions.controlNotificationsLoading(true));
    const result = yield call(api.deleteNotification, formData.payload);
    yield put(actions.deleteNotificationSuccess(result.data));
    window.location.reload();
  } catch (error) {
    extractErrorMsgFromResponse(error);
  } finally {
    yield put(actions.controlNotificationsLoading(false));
  }
}

export default function* tablesSagas() {
  yield takeLatest(
    Types.DELETE_NOTIFICATION_REQUEST as any,
    deleteNotification
  );
  yield takeLatest(
    Types.SEARCH_NOTIFICATIONS_REQUEST as any,
    getAllNotifications
  );
  yield takeLatest(
    Types.SEARCH_USER_NOTIFICATIONS_REQUEST as any,
    getAllUserNotifications
  );
  yield takeLatest(
    Types.CREATE_NOTIFICATIONS_REQUEST as any,
    createNotification
  );
  yield takeLatest(Types.GET_NOTIFICATIONS_REQUEST as any, getNotification);
}
