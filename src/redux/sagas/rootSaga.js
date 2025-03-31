import { fork } from "redux-saga/effects";
// import { postHallData } from "../slices/hallPopupDataHandlerSlice";
// import { handleAddHallData } from "./handlers/hall";
import { getHallsWatcherSaga, hallDeleteWatcherSaga, hallPostWatcherSaga, hallPutWatcherSaga } from "./watcherSagas/hallSagas";
import { movieDeleteWatcherSaga, MoviePostWatcherSaga, moviePutWatcherSaga } from "./watcherSagas/movieSagas";
import { sessionDeleteWatcherSaga, sessionPostWatcherSaga, sessionPutWatcherSaga } from "./watcherSagas/sessionSagas";

export default function* rootSaga() {
  // yield takeLatest(postHallData.type, handleAddHallData);
  // get main datas
  yield fork(getHallsWatcherSaga);

  yield fork(hallPostWatcherSaga);
  yield fork(hallPutWatcherSaga); // edit prices
  yield fork(hallDeleteWatcherSaga);
  
  yield fork(moviePutWatcherSaga);
  yield fork(movieDeleteWatcherSaga);
  yield fork(MoviePostWatcherSaga);

  yield fork(sessionPostWatcherSaga);
  yield fork(sessionPutWatcherSaga);
  yield fork(sessionDeleteWatcherSaga);


}