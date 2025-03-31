import { takeLatest } from "redux-saga/effects";
import { deleteHall, postHallData } from "../../slices/hallPopupDataHandlerSlice";
import { handleAddHallData, handleDeleteHall, handleEditHallData, handleGetHalls } from "../handlers/hall";
import { getHalls } from "../../slices/hallSlice";
import { putHallData } from "../../slices/hallPricesSlice";

export function* getHallsWatcherSaga() {
  yield takeLatest(getHalls.type, handleGetHalls);
}

export function* hallPostWatcherSaga() {
    yield takeLatest(postHallData.type, handleAddHallData);
}

export function* hallPutWatcherSaga() {
  yield takeLatest(putHallData.type, handleEditHallData);
}

export function* hallDeleteWatcherSaga() {
  yield takeLatest(deleteHall.type, handleDeleteHall);
}

