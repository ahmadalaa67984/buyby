import { extractErrorMsgFromResponse } from "utils/apiHelpers";
import { toast } from "react-toastify";
import { call, fork, put, takeLatest } from "redux-saga/effects";
import * as actions from "./Actions";
import * as drawerActions from "@/modules/drawer/Actions";
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

function* getAllStockitem({ payload }) {
  const body = { ...defBody, ...payload };
  try {
    yield put(actions.controlStockitemLoading(true));
    const result = yield call(api.getAllStockitem, body);
    yield put(actions.getAllStockitemSuccess(result.data));
  } catch (error) {
    extractErrorMsgFromResponse(error);
  } finally {
    yield put(actions.controlStockitemLoading(false));
  }
}

function* getAllUserStockitem({ payload }) {
  const body = { ...defBody, ...payload };
  try {
    yield put(actions.controlStockitemLoading(true));
    const result = yield call(api.getAllUserStockitem, body);
    yield put(actions.getAllUserStockitemSuccess(result.data));
  } catch (error) {
    extractErrorMsgFromResponse(error);
  } finally {
    yield put(actions.controlStockitemLoading(false));
  }
}

function* getStockitem(formData) {
  try {
    yield put(actions.controlStockitemLoading(true));
    const result = yield call(api.getStockitem, formData.payload);
    yield put(actions.getStockitemSuccess(result.data));
    // window.location.reload();
  } catch (error) {
    extractErrorMsgFromResponse(error);
  } finally {
    yield put(actions.controlStockitemLoading(false));
  }
}

function* createStockitem(formData) {
  try {
    yield put(actions.controlStockitemLoading(true));
    const result = yield call(api.createStockitem, formData.payload);
    yield put(actions.createStockitemSuccess(result.data));
    yield put(drawerActions.drawerActionToggle(false, "", "stockitem"));
    toast.success("Stockitem created successfully.");
  } catch (error) {
    extractErrorMsgFromResponse(error);
  } finally {
    yield put(actions.controlStockitemLoading(false));
  }
}

function* deleteStockitem(formData) {
  try {
    yield put(actions.controlStockitemLoading(true));
    const result = yield call(api.deleteStockitem, formData.payload);
    yield put(actions.deleteStockitemSuccess(result.data));
    window.location.reload();
  } catch (error) {
    extractErrorMsgFromResponse(error);
  } finally {
    yield put(actions.controlStockitemLoading(false));
  }
}

export default function* tablesSagas() {
  yield takeLatest(Types.DELETE_STOCKITEM_REQUEST as any, deleteStockitem);
  yield takeLatest(Types.SEARCH_STOCKITEMS_REQUEST as any, getAllStockitem);
  yield takeLatest(
    Types.SEARCH_USER_STOCKITEMS_REQUEST as any,
    getAllUserStockitem
  );
  yield takeLatest(Types.CREATE_STOCKITEMS_REQUEST as any, createStockitem);
  yield takeLatest(Types.GET_STOCKITEMS_REQUEST as any, getStockitem);
}
