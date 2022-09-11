import { configureStore } from '@reduxjs/toolkit';
import invoices from './redux/slice/invoices';
import createSagaMiddleware from '@redux-saga/core';
import { rootSaga } from './redux/sagas';
const sagaMiddleware = createSagaMiddleware();
const store = configureStore({
  reducer: {
    invoices,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ thunk: false }).concat(sagaMiddleware),
});
sagaMiddleware.run(rootSaga);

export default store;
