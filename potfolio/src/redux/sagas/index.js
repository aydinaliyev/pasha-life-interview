import { all } from 'redux-saga/effects';
import { watchInvoicesAsync } from './invoice';

export function* rootSaga() {
  yield all([watchInvoicesAsync()]);
}
