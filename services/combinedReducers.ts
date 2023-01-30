import { combineReducers } from "redux";
import drawerReducer from "../modules/drawer/Reducer";
import systemLogsReducer from "../modules/system-logs/Reducer";
import notificationReducer from "../modules/notifications/Reducer";
import customerReducer from "../modules/customer-accs/Reducer";
import bussinesReducer from "../modules/business-accs/Reducer";
import customerReportsReducer from "../modules/customer-reports/Reducer";
import businessReportsReducer from "../modules/business-reports/Reducer";

const rootReducer = combineReducers({
  drawer: drawerReducer,
  systemLogs: systemLogsReducer,
  notification: notificationReducer,
  customer: customerReducer,
  bussines: bussinesReducer,
  customerReports: customerReportsReducer,
  businessReports: businessReportsReducer,
});

export default rootReducer;
export type RootState = ReturnType<typeof rootReducer>;
