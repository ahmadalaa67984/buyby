import { toast } from "react-toastify";
import { call, fork, put, takeLatest } from "redux-saga/effects";
import { extractErrorMsgFromResponse } from "../../utils/apiHelpers";
import * as actions from "./Actions";
import * as api from "./Api";
import Types from "./Types";

function* getUser(formData) {
  try {
    yield put(actions.addUserAuthLoading(true));
    const result = yield call(api.getUser);
    yield put(actions.getUserSuccess(result.data));
  } catch (error) {
    extractErrorMsgFromResponse(error);
  } finally {
    yield put(actions.addUserAuthLoading(false));
  }
}

// Get Profile
function* getProfile(formData) {
  try {
    yield put(actions.addUserDataLoading(true));
    const result = yield call(api.getProfile);
    yield put(actions.getProfileSuccess(result.data));
  } catch (error) {
    const { response, message } = error;
    // toast.error(error?.response?.data?.message);
  } finally {
    yield put(actions.addUserDataLoading(false));
  }
}
export default function* userSagas() {
  yield takeLatest(Types.GET_USER_REQUEST, getUser);
  yield takeLatest(Types.GET_PROFILE_REQUEST, getProfile);
}
