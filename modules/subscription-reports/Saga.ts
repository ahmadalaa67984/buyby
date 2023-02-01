import { extractErrorMsgFromResponse } from "utils/apiHelpers";
import { toast } from "react-toastify";
import { call, fork, put, takeLatest } from "redux-saga/effects";
import * as actions from "./Actions";
import * as api from "./Api";
import Types from "./Types";

const defBody = {
  firstDate: null,
  secondDate: null,
};

function* getSubReportsDTD({ payload }) {
  const body = { ...defBody, ...payload };
  try {
    yield put(actions.controlsubReportsLoading(true));
    const result = yield call(api.getSubReportsDTD, body);
    yield put(actions.getSubReportsDTDSuccess(result.data));
  } catch (error) {
    extractErrorMsgFromResponse(error);
  } finally {
    yield put(actions.controlsubReportsLoading(false));
  }
}

function* getSubReportsWTW({ payload }) {
  const body = { ...defBody, ...payload };
  try {
    yield put(actions.controlsubReportsLoading(true));
    const result = yield call(api.getSubReportsWTW, body);
    yield put(actions.getSubReportsWTWSuccess(result.data));
  } catch (error) {
    extractErrorMsgFromResponse(error);
  } finally {
    yield put(actions.controlsubReportsLoading(false));
  }
}

function* getSubReportsMTM({ payload }) {
  const body = { ...defBody, ...payload };
  try {
    yield put(actions.controlsubReportsLoading(true));
    const result = yield call(api.getSubReportsMTM, body);
    yield put(actions.getSubReportsMTMSuccess(result.data));
  } catch (error) {
    extractErrorMsgFromResponse(error);
  } finally {
    yield put(actions.controlsubReportsLoading(false));
  }
}

function* getSubReportsYTY({ payload }) {
  const body = { ...defBody, ...payload };
  try {
    yield put(actions.controlsubReportsLoading(true));
    const result = yield call(api.getSubReportsYTY, body);
    yield put(actions.getSubReportsYTYSuccess(result.data));
  } catch (error) {
    extractErrorMsgFromResponse(error);
  } finally {
    yield put(actions.controlsubReportsLoading(false));
  }
}

export default function* tablesSagas() {
  yield takeLatest(
    Types.SUBSCRIPTION_REPORTS_DTD_REQUEST as any,
    getSubReportsDTD
  );
  yield takeLatest(
    Types.SUBSCRIPTION_REPORTS_WTW_REQUEST as any,
    getSubReportsWTW
  );
  yield takeLatest(
    Types.SUBSCRIPTION_REPORTS_MTM_REQUEST as any,
    getSubReportsMTM
  );
  yield takeLatest(
    Types.SUBSCRIPTION_REPORTS_YTY_REQUEST as any,
    getSubReportsYTY
  );
}
