import { fork } from "redux-saga/effects";
import sysLogSagas from "../modules/system-logs/Saga";
import notificationsSagas from "../modules/notifications/Saga";
import customerSagas from "../modules/customer-accs/Saga";
import businessSagas from "../modules/business-accs/Saga";
import customerReportsSagas from "../modules/customer-reports/Saga";
import businessReportsSagas from "../modules/business-reports/Saga";
import subscriptionReportsSagas from "../modules/subscription-reports/Saga";
import superAdminsSagas from "../modules/super-admin/Saga";
import authSagas from "../modules/auth/Saga";
import userSagas from "../modules/user/Saga";

export default function* rootSaga() {
  yield fork(sysLogSagas);
  yield fork(notificationsSagas);
  yield fork(customerSagas);
  yield fork(businessSagas);
  yield fork(customerReportsSagas);
  yield fork(businessReportsSagas);
  yield fork(subscriptionReportsSagas);
  yield fork(superAdminsSagas);
  yield fork(authSagas);
  yield fork(userSagas);
}
