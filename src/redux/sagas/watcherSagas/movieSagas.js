import { takeLatest } from "redux-saga/effects";
import { deleteMovie, putMovieData } from "../../slices/popupEditMovieHandlerSlice";
import { handleAddMovieData, handleDeleteMovie, handleEditMovieData } from "../handlers/movie";
import { postMovieData } from "../../slices/popupAddMovieHandlerSlice";

export function* moviePutWatcherSaga() {
    yield takeLatest(putMovieData.type, handleEditMovieData);
}

export function* movieDeleteWatcherSaga() {
  yield takeLatest(deleteMovie.type, handleDeleteMovie);
}

// скорректировать заглавную букву
export function* MoviePostWatcherSaga() {
  yield takeLatest(postMovieData.type, handleAddMovieData);
}