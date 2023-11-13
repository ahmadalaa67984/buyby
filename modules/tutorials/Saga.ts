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

function* getAllTutorials({ payload }) {
  const body = { ...defBody, ...payload };
  try {
    yield put(actions.controlTutorialsLoading(true));
    const result = yield call(api.getAllTutorials, body);
    yield put(actions.getAllTutorialsSuccess(result.data));
  } catch (error) {
    extractErrorMsgFromResponse(error);
  } finally {
    yield put(actions.controlTutorialsLoading(false));
  }
}

function* getAllUserTutorials({ payload }) {
  const body = { ...defBody, ...payload };
  try {
    yield put(actions.controlTutorialsLoading(true));
    const result = yield call(api.getAllUserTutorials, body);
    yield put(actions.getAllUserTutorialsSuccess(result.data));
  } catch (error) {
    extractErrorMsgFromResponse(error);
  } finally {
    yield put(actions.controlTutorialsLoading(false));
  }
}

function* getTutorial(formData) {
  try {
    yield put(actions.controlTutorialsLoading(true));
    const result = yield call(api.getTutorial, formData.payload);
    yield put(actions.getTutorialSuccess(result.data));
    // window.location.reload();
  } catch (error) {
    extractErrorMsgFromResponse(error);
  } finally {
    yield put(actions.controlTutorialsLoading(false));
  }
}

function* createTutorial(formData) {
  try {
    yield put(actions.controlTutorialsLoading(true));
    const result = yield call(api.createTutorial, formData.payload);
    yield put(actions.createTutorialSuccess(result.data));
    yield put(drawerActions.drawerActionToggle(false, "", "tutorials"));
    toast.success("Tutorial created successfully.");
  } catch (error) {
    extractErrorMsgFromResponse(error);
  } finally {
    yield put(actions.controlTutorialsLoading(false));
  }
}
function* updateTutorial(formData) {
  try {
    yield put(actions.controlTutorialsLoading(true));
    const result = yield call(api.updateTutorial, formData.payload);
    window.location.reload();
  } catch (error) {
    extractErrorMsgFromResponse(error);
  } finally {
    yield put(actions.controlTutorialsLoading(false));
  }
}

function* deleteTutorial(formData) {
  try {
    yield put(actions.controlTutorialsLoading(true));
    const result = yield call(api.deleteTutorial, formData.payload);
    yield put(actions.deleteTutorialSuccess(result.data));
    window.location.reload();
  } catch (error) {
    extractErrorMsgFromResponse(error);
  } finally {
    yield put(actions.controlTutorialsLoading(false));
  }
}

export default function* tablesSagas() {
  yield takeLatest(Types.DELETE_TUTORIAL_REQUEST as any, deleteTutorial);
  yield takeLatest(Types.SEARCH_TUTORIALS_REQUEST as any, getAllTutorials);
  yield takeLatest(
    Types.SEARCH_USER_TUTORIALS_REQUEST as any,
    getAllUserTutorials
  );
  yield takeLatest(Types.CREATE_TUTORIALS_REQUEST as any, createTutorial);
  yield takeLatest(Types.EDIT_TUTORIALS_REQUEST as any, updateTutorial);
  yield takeLatest(Types.GET_TUTORIALS_REQUEST as any, getTutorial);
}
