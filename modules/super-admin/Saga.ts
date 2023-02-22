import { extractErrorMsgFromResponse } from "utils/apiHelpers";
import { toast } from "react-toastify";
import { call, fork, put, takeLatest } from "redux-saga/effects";
import * as actions from "./Actions";
import * as drawerActions from "@/modules/drawer/Actions";
import * as api from "./Api";
import Types from "./Types";

const defBody = {
  filterBy: [{ role: "SUPER_ADMIN" }],
  attributesToRetrieve: [],
  offset: 0,
  size: 10,
  sort: "createdAt",
  dir: "desc",
  searchTerm: "",
  filterByDateFrom: null,
  filterByDateTo: null,
};

function* getAllSuperAdmins({ payload }) {
  const body = { ...defBody, ...payload };
  try {
    yield put(actions.controlSuperAdminLoading(true));
    const result = yield call(api.getAllSuperAdmins, body);
    yield put(actions.getAllSuperAdminsSuccess(result.data));
  } catch (error) {
    extractErrorMsgFromResponse(error);
  } finally {
    yield put(actions.controlSuperAdminLoading(false));
  }
}

function* createSuperAdmin(formData) {
  try {
    yield put(actions.controlSuperAdminLoading(true));
    const result = yield call(api.createSuperAdmin, formData.payload);
    yield put(actions.createSuperAdminsSuccess(result.data));
    yield put(drawerActions.drawerActionToggle(false, "", "super-admin"));
    toast.success("Admin created successfully.");
  } catch (error: any) {
    extractErrorMsgFromResponse(error);
  } finally {
    yield put(actions.controlSuperAdminLoading(false));
  }
}

function* activateUser(formData) {
  try {
    yield put(actions.controlSuperAdminLoading(true));
    const result = yield call(api.activateUser, formData.payload);
    window.location.reload();
  } catch (error: any) {
    extractErrorMsgFromResponse(error);
  } finally {
    yield put(actions.controlSuperAdminLoading(false));
  }
}

export default function* tablesSagas() {
  yield takeLatest(
    Types.GET_ALL_SUPER_ADMINS_REQUEST as any,
    getAllSuperAdmins
  );
  yield takeLatest(Types.CREATE_SUPER_ADMIN_REQUEST as any, createSuperAdmin);
  yield takeLatest(Types.ACTIVATE_USER_REQUEST as any, activateUser);
}
