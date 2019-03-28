import { takeEvery, call, put, cancel, all } from "redux-saga/effects";
import API from "../api";
import * as actions from "../actions";

function* watchFetchDroneData(action) {
  const { error, data } = yield call(
    API.getDroneData
  );

  if (error) {
    console.log( "error", { error });
    yield put({ type: actions.DRONE_API_ERROR, payload: error.code });
    yield cancel();
    return;
  }

  yield put({ type: actions.DRONE_DATA_RECEIVED, data });
}

function* watchAppLoad() {
  yield all([
    takeEvery(actions.FETCH_DRONE_DATA, watchFetchDroneData),
  ]);
}

export default [watchAppLoad];
