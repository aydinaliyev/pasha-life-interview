import { getInvoicesAPI,deleteInvoiceAPI } from '../../api/index';
import { getInvoicesSlice,deleteInvoiceSlice } from '../slice/invoices';
import { GET_INVOICES,DELETE_INVOICE} from '../types';
import { put, takeEvery } from 'redux-saga/effects';

export function* getInvoiceSaga() {
  const invoices = yield getInvoicesAPI();
  yield put(getInvoicesSlice(invoices.data));
}

export function* deleteInvoiceSaga(action){
  yield deleteInvoiceAPI(action.id)
  yield put(deleteInvoiceSlice(action.id))
}

export function* watchInvoicesAsync() {
  yield takeEvery(GET_INVOICES, getInvoiceSaga);
  yield takeEvery(DELETE_INVOICE, deleteInvoiceSaga);
}
