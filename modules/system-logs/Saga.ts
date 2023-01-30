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

function* getAllSystemLogs({ payload }) {
  const body = { ...defBody, ...payload };
  try {
    yield put(actions.controlSystemLogsLoading(true));
    const result = yield call(api.getAllSystemLogs, body);
    yield put(actions.getAllSystemLogsSuccess(result.data));
  } catch (error) {
    extractErrorMsgFromResponse(error);
  } finally {
    yield put(actions.controlSystemLogsLoading(false));
  }
}

function* getSystemLog(formData) {
  try {
    yield put(actions.controlSystemLogsLoading(true));
    const result = yield call(api.getSystemLog, formData.payload);
    yield put(actions.getSystemLoguccess(result.data));
    // window.location.reload();
  } catch (error) {
    extractErrorMsgFromResponse(error);
  } finally {
    yield put(actions.controlSystemLogsLoading(false));
  }
}

function* deleteGift(formData) {
  try {
    yield put(actions.controlSystemLogsLoading(true));
    const result = yield call(api.deleteSystemLog, formData.payload);
    yield put(actions.deleteSystemLogSuccess(result.data));
    window.location.reload();
  } catch (error) {
    extractErrorMsgFromResponse(error);
  } finally {
    yield put(actions.controlSystemLogsLoading(false));
  }
}

export default function* tablesSagas() {
  yield takeLatest(Types.DELETE_SYSTEM_LOG_REQUEST as any, deleteGift);
  yield takeLatest(Types.SEARCH_SYSTEM_LOGS_REQUEST as any, getAllSystemLogs);
  yield takeLatest(Types.GET_SYSTEM_LOGS_REQUEST as any, getSystemLog);
}
