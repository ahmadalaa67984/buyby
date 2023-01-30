import { extractErrorMsgFromResponse } from "utils/apiHelpers";
import { toast } from "react-toastify";
import { call, fork, put, takeLatest } from "redux-saga/effects";
import * as actions from "./Actions";
import * as api from "./Api";
import Types from "./Types";

const defBody = {
  filterBy: [{ type: "CUSTOMER" }],
  attributesToRetrieve: [],
  offset: 0,
  size: 10,
  sort: "createdAt",
  dir: "desc",
  searchTerm: "",
  filterByDateFrom: null,
  filterByDateTo: null,
};

function* getAllCustomers({ payload }) {
  const body = { ...defBody, ...payload };
  try {
    yield put(actions.controlCustomersLoading(true));
    const result = yield call(api.getAllCustomers, body);
    yield put(actions.getAllCustomerSuccess(result.data));
  } catch (error) {
    extractErrorMsgFromResponse(error);
  } finally {
    yield put(actions.controlCustomersLoading(false));
  }
}

function* getCustomer(formData) {
  try {
    yield put(actions.controlCustomersLoading(true));
    const result = yield call(api.getCustomer, formData.payload);
    yield put(actions.getCustomerSuccess(result.data));
    // window.location.reload();
  } catch (error) {
    extractErrorMsgFromResponse(error);
  } finally {
    yield put(actions.controlCustomersLoading(false));
  }
}

function* createCustomer(formData) {
  try {
    yield put(actions.controlCustomersLoading(true));
    const result = yield call(api.createCustomer, formData.payload);
    yield put(actions.createCustomerSuccess(result.data));
    window.location.reload();
  } catch (error) {
    extractErrorMsgFromResponse(error);
  } finally {
    yield put(actions.controlCustomersLoading(false));
  }
}

function* updateCustomer(formData) {
  try {
    yield put(actions.controlCustomersLoading(true));
    const result = yield call(api.updateCustomer, formData.payload);
    yield put(actions.updateCustomerSuccess(result.data));
    window.location.reload();
  } catch (error) {
    extractErrorMsgFromResponse(error);
  } finally {
    yield put(actions.controlCustomersLoading(false));
  }
}

function* applyRecievePromotion(formData) {
  try {
    yield put(actions.controlCustomersLoading(true));
    const result = yield call(api.applyRecievePromotion, formData.payload);
    yield put(actions.applyRecievePromotionSuccess(result.data));
    window.location.reload();
  } catch (error) {
    extractErrorMsgFromResponse(error);
  } finally {
    yield put(actions.controlCustomersLoading(false));
  }
}

export default function* tablesSagas() {
  yield takeLatest(Types.SEARCH_ALL_CUSTOMERS_REQUEST as any, getAllCustomers);
  yield takeLatest(Types.GET_CUSTOMER_REQUEST as any, getCustomer);
  yield takeLatest(Types.CREATE_CUSTOMER_REQUEST as any, createCustomer);
  yield takeLatest(Types.UPDATE_CUSTOMER_REQUEST as any, updateCustomer);
  yield takeLatest(
    Types.APPLY_RECIEVE_PROMOTION_REQUEST as any,
    applyRecievePromotion
  );
}
