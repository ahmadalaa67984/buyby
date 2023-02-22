import { extractErrorMsgFromResponse } from "utils/apiHelpers";
import { toast } from "react-toastify";
import { call, fork, put, takeLatest } from "redux-saga/effects";
import * as actions from "./Actions";
import * as api from "./Api";
import Types from "./Types";

const defBody = {
  filterBy: [],
  filterPeriod: {
    date: "2023-02-21T13:59:00.010Z",
    period: "LASTWEEK",
  },
  dailyChart: {
    date: "2023-02-21T13:59:00.010Z",
    period: "LASTMONTH",
  },
  filterByDateFrom: "2023-02-21T13:59:00.010Z",
  filterByDateTo: "2023-02-21T13:59:00.010Z",
};

const subsBody = {
  firstDate: "2022-01-01",
  secondDate: "2023-01-02",
  thirdDate: "2023-01-03",
  fourthDate: "2024-01-02",
};

const customersBody = {
  filterByDateFrom: "2022-01-01",
  filterByDateTo: "2023-01-02",
};

function* getAllLogsReports({ payload }) {
  const body = { ...defBody, ...payload };
  try {
    yield put(actions.controlLogsReportsLoading(true, "logs"));
    const result = yield call(api.getLogsReports, body);
    yield put(actions.getAllLogsReportsSuccess(result.data));
  } catch (error) {
    extractErrorMsgFromResponse(error);
  } finally {
    yield put(actions.controlLogsReportsLoading(false));
  }
}

function* getAllSubscriptionsReports({ payload }) {
  const body = { ...subsBody, ...payload };
  try {
    yield put(actions.controlLogsReportsLoading(true, "subs"));
    const result = yield call(api.getSubscriptionsReports, body);
    yield put(actions.getAllSubscriptionsReportsSuccess(result.data));
  } catch (error) {
    extractErrorMsgFromResponse(error);
  } finally {
    yield put(actions.controlLogsReportsLoading(false));
  }
}

function* getAllCustomersReports({ payload }) {
  const body = { ...customersBody, ...payload };
  try {
    yield put(actions.controlLogsReportsLoading(true, "cust"));
    const result = yield call(api.getCustomersReports, body);
    yield put(actions.getAllCustomersReportsSuccess(result.data));
  } catch (error) {
    extractErrorMsgFromResponse(error);
  } finally {
    yield put(actions.controlLogsReportsLoading(false));
  }
}

export default function* tablesSagas() {
  yield takeLatest(Types.SEARCH_LOGS_REPORTS_REQUEST as any, getAllLogsReports);
  yield takeLatest(
    Types.SEARCH_SUBSCRIPTIONS_REPORTS_REQUEST as any,
    getAllSubscriptionsReports
  );
  yield takeLatest(
    Types.SEARCH_CUSTOMERS_LIST_REPORTS_REQUEST as any,
    getAllCustomersReports
  );
}
