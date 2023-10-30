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

function* getAllEntity({ payload }) {
  const body = { ...defBody, ...payload };
  try {
    yield put(actions.controlEntityLoading(true));
    const result = yield call(api.getAllEntity, body);
    yield put(actions.getAllEntitySuccess(result.data));
  } catch (error) {
    extractErrorMsgFromResponse(error);
  } finally {
    yield put(actions.controlEntityLoading(false));
  }
}

function* getAllUserEntity({ payload }) {
  const body = { ...defBody, ...payload };
  try {
    yield put(actions.controlEntityLoading(true));
    const result = yield call(api.getAllUserEntity, body);
    yield put(actions.getAllUserEntitySuccess(result.data));
  } catch (error) {
    extractErrorMsgFromResponse(error);
  } finally {
    yield put(actions.controlEntityLoading(false));
  }
}

function* getEntity(formData) {
  try {
    yield put(actions.controlEntityLoading(true));
    const result = yield call(api.getEntity, formData.payload);
    yield put(actions.getEntitySuccess(result.data));
    // window.location.reload();
  } catch (error) {
    extractErrorMsgFromResponse(error);
  } finally {
    yield put(actions.controlEntityLoading(false));
  }
}

function* createEntity(formData) {
  try {
    yield put(actions.controlEntityLoading(true));
    const result = yield call(api.createEntity, formData.payload);
    yield put(actions.createEntitySuccess(result.data));
    yield put(drawerActions.drawerActionToggle(false, "", "stockitem"));
    toast.success("Entity created successfully.");
  } catch (error) {
    extractErrorMsgFromResponse(error);
  } finally {
    yield put(actions.controlEntityLoading(false));
  }
}

function* deleteEntity(formData) {
  try {
    yield put(actions.controlEntityLoading(true));
    const result = yield call(api.deleteEntity, formData.payload);
    yield put(actions.deleteEntitySuccess(result.data));
    window.location.reload();
  } catch (error) {
    extractErrorMsgFromResponse(error);
  } finally {
    yield put(actions.controlEntityLoading(false));
  }
}

export default function* tablesSagas() {
  yield takeLatest(Types.DELETE_ENTITY_REQUEST as any, deleteEntity);
  yield takeLatest(Types.SEARCH_ENTITY_REQUEST as any, getAllEntity);
  yield takeLatest(Types.SEARCH_USER_ENTITY_REQUEST as any, getAllUserEntity);
  yield takeLatest(Types.CREATE_ENTITY_REQUEST as any, createEntity);
  yield takeLatest(Types.GET_ENTITY_REQUEST as any, getEntity);
}
