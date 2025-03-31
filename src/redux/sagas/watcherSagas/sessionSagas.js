import { takeLatest } from "redux-saga/effects";
import { handleAddSessionData, handleDeleteSession, handleEditSessionData } from "../handlers/session";
import { postSessionData } from "../../slices/popupAddSessionHandlerSlice";
import { deleteSession, putSessionData } from "../../slices/popupEditSessionsHandlerSlice";

export function* sessionPostWatcherSaga() {
  yield takeLatest(postSessionData.type, handleAddSessionData);
}

export function* sessionPutWatcherSaga() {
    yield takeLatest(putSessionData.type, handleEditSessionData);
}

export function* sessionDeleteWatcherSaga() {
  yield takeLatest(deleteSession.type, handleDeleteSession);
}
