import { all } from "redux-saga/effects";
import { enemySaga } from "../features/enemy/saga";

export default function* rootSaga() {
  yield all([enemySaga()]);
}
