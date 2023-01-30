import { extractErrorMsgFromResponse } from "utils/apiHelpers";
import { toast } from "react-toastify";
import { call, fork, put, takeLatest } from "redux-saga/effects";
import * as actions from "./Actions";
import * as api from "./Api";
import Types from "./Types";

const defBody = {
  filterBy: [{ type: "BUSINESS" }],
  attributesToRetrieve: [],
  offset: 0,
  size: 10,
  sort: "createdAt",
  dir: "desc",
  searchTerm: "",
  filterByDateFrom: null,
  filterByDateTo: null,
};

function* getAllBusinessAccs({ payload }) {
  const body = { ...defBody, ...payload };
  try {
    yield put(actions.controlBussinesAccLoading(true));
    const result = yield call(api.getAllBusinessAccs, body);
    yield put(actions.getAllBusinessAccountsSuccess(result.data));
  } catch (error) {
    extractErrorMsgFromResponse(error);
  } finally {
    yield put(actions.controlBussinesAccLoading(false));
  }
}

export default function* tablesSagas() {
  yield takeLatest(
    Types.SEARCH_ALL_BUSINESS_ACCS_REQUEST as any,
    getAllBusinessAccs
  );
}
