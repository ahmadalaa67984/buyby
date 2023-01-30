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

function* getAllBusinessReports({ payload }) {
  const body = { ...defBody, ...payload };
  try {
    yield put(actions.controlBusinessReportsLoading(true));
    const result = yield call(api.getAllBusinessReports, body);
    yield put(actions.getAllBusinessReportsSuccess(result.data));
  } catch (error) {
    extractErrorMsgFromResponse(error);
  } finally {
    yield put(actions.controlBusinessReportsLoading(false));
  }
}

export default function* tablesSagas() {
  yield takeLatest(
    Types.SEARCH_BUSINESS_REPORTS_REQUEST as any,
    getAllBusinessReports
  );
}
