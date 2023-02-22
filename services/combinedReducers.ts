import { combineReducers } from "redux";
import drawerReducer from "../modules/drawer/Reducer";
import systemLogsReducer from "../modules/system-logs/Reducer";
import notificationReducer from "../modules/notifications/Reducer";
import customerReducer from "../modules/customer-accs/Reducer";
import bussinesReducer from "../modules/business-accs/Reducer";
import reportsReducer from "../modules/reports/Reducer";
import businessReportsReducer from "../modules/business-reports/Reducer";
import subscriptionReportsReducer from "../modules/subscription-reports/Reducer";
import superAdminsReducer from "../modules/super-admin/Reducer";
import authReducer from "../modules/auth/Reducer";
import userReducer from "../modules/user/Reducer";

const rootReducer = combineReducers({
  drawer: drawerReducer,
  systemLogs: systemLogsReducer,
  notification: notificationReducer,
  customer: customerReducer,
  bussines: bussinesReducer,
  reports: reportsReducer,
  businessReports: businessReportsReducer,
  subscriptionReports: subscriptionReportsReducer,
  superAdmins: superAdminsReducer,
  auth: authReducer,
  user: userReducer,
});

export default rootReducer;
export type RootState = ReturnType<typeof rootReducer>;
