import { takeEvery, call } from "redux-saga/effects";
import * as actions from "../actions";
import { toast } from "react-toastify";

function* droneApiErrorReceived(action) {
    yield call(toast.error, `Drone data fetch error: ${action.code}`);
}

function* watchDroneApiError() {
    yield takeEvery(actions.DRONE_API_ERROR, droneApiErrorReceived);
}

export default [watchDroneApiError];