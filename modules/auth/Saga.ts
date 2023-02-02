import { toast } from "react-toastify";
import { call, fork, put, takeLatest } from "redux-saga/effects";
import { extractErrorMsgFromResponse } from "../../utils/apiHelpers";
import * as actions from "./Actions";
import * as api from "./Api";
import Types from "./Types";

// SIGNIN
function* signinUser(formData) {
  try {
    yield put(actions.addAuthLoading(true));
    const result = yield call(api.signin, formData.payload);

    yield put(
      actions.signinSuccess({
        data: result.data,
      })
    );

    if (result?.data?.user?.role === "SUPER_ADMIN") {
      window.location.href = "/system-logs/1";
    }

    toast.success("Successfully");
  } catch (error) {
    extractErrorMsgFromResponse(error);
    yield put(actions.signinFail());
  } finally {
    yield put(actions.addAuthLoading(false));
  }
}

//SIGNOUT
function* signoutUser() {
  try {
    yield put(actions.addAuthLoading(true));
    // const result = yield call(api.signout);
    yield put(actions.signoutSuccess());
    window.location.href = "/auth/signin";
  } catch (error) {
    extractErrorMsgFromResponse(error);
    yield put(actions.signoutFail());
  } finally {
    yield put(actions.addAuthLoading(false));
  }
}

function* forgotPassword(formData) {
  try {
    yield put(actions.addAuthLoading(true));
    const result = yield call(api.forgotPassword, formData.payload);
    yield put(
      actions.forgotPasswordSuccess({
        data: result.data,
      })
    );
    window.location.href = "/password/reset";
  } catch (error) {
    extractErrorMsgFromResponse(error);
    yield put(actions.resetPasswordFail());
  } finally {
    yield put(actions.addAuthLoading(false));
  }
}

function* resetPassword(formData) {
  try {
    yield put(actions.addAuthLoading(true));
    const result = yield call(api.resetPassword, formData.payload);
    yield put(
      actions.resetPasswordSuccess({
        data: result.data,
      })
    );
    toast.success("You can now login with your new password");
    window.location.href = "/auth/signin";
  } catch (error) {
    extractErrorMsgFromResponse(error);
    yield put(actions.resetPasswordFail());
  } finally {
    yield put(actions.addAuthLoading(false));
  }
}

function* resendVerifyCode(formData) {
  try {
    yield put(actions.addAuthLoading(true));
    const result = yield call(api.resendVerifyCode, formData.payload);
    yield put(
      actions.resendVerifyCodeSuccess({
        data: result.data,
      })
    );
    toast.success("Code send to you");
  } catch (error) {
    extractErrorMsgFromResponse(error);
    yield put(actions.resetPasswordFail());
  } finally {
    yield put(actions.addAuthLoading(false));
  }
}

export default function* authSagas() {
  yield takeLatest(Types.SIGNIN_REQUEST, signinUser);
  yield takeLatest(Types.SIGNOUT_REQUEST, signoutUser);
  yield takeLatest(Types.FORGOT_PASSWORD_REQUEST, forgotPassword);
  yield takeLatest(Types.RESET_PASSWORD_REQUEST, resetPassword);
  yield takeLatest(Types.RESEND_VERIFY_CODE_REQUEST, resendVerifyCode);
}
