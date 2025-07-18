import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";

import { settingsSlice } from "./settingsSlice";
import enemyReducer from "../features/enemy/slice";
import rootSaga from "./rootSaga";

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: {
    settings: settingsSlice.reducer,
    enemy: enemyReducer,
  },
  middleware: (getDefault) =>
    getDefault({ thunk: false }).concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
