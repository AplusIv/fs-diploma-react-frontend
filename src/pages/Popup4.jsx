import PopupBase from "./PopupBase";
import PopupChangeForm from "./PopupChangeForm";
import PopupHallAdding from "./PopupHallAdding";
import PopupMovieAdding from "./PopupMovieAdding";
import PopupChangeSessions2 from "./PopupChangeSessions2";

const Popup4 = ({ 
  popupInfo, 
  halls = [], 
  movies = [], 
  sessions = [], /* editedElement = {}, handleInput, handleSelect,  */
  onChangeCallback, 
  onAddCallback, 
  onDeleteCallback, /* edit, handleChange, */ 
  handlePopup 
}) => {

  // Ids
  let lastSessionId = sessions.at(-1)?.id; // (?) operator https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Operators/Optional_chaining
  let lastHallId = halls.at(-1)?.id;
  let lastMovieId = movies && movies.at(-1)?.id;

  if (popupInfo.status === 'adding movie popup') {
    return (
      <PopupBase popupInfo={popupInfo} handlePopup={handlePopup}>
        <PopupMovieAdding
          /* initialItem={
            {
              id: ++lastMovieId,
              // пустой объект, который будет заполнен данными из формы
            }} */
          buttonTitle={'Добавить фильм'}
          onAddCallback={onAddCallback}
          handlePopup={handlePopup}
        />
      </PopupBase>
    )
  }

  if (popupInfo.status === 'adding hall popup') {
    return (
      <PopupBase popupInfo={popupInfo} handlePopup={handlePopup}>
        <PopupHallAdding
          // initialItem={
          //   {
          //     // id: `${++lastHallId}`,
          //     rows: 5,
          //     places: 8,
          //     normal_price: Number(250).toFixed(2),
          //     vip_price: Number(550.5).toFixed(2)
          //   }}
          buttonTitle={'Добавить зал'}
          onAddCallback={onAddCallback}
          handlePopup={handlePopup} />
      </PopupBase>
    )
  }

  if (popupInfo.status === 'editing movie popup') {
    return (
      <>
        <PopupBase popupInfo={popupInfo} handlePopup={handlePopup}>
          <PopupChangeForm
            // editedElement={editedElement}
            onChangeCallback={onChangeCallback}
            onDeleteCallback={onDeleteCallback}
            buttonTitle={'Изменить фильм'}
            handlePopup={handlePopup} />
        </PopupBase>
      </>
    )
  }

  if (popupInfo.status === 'editing sessions') {
    return (
      <>
        <PopupBase popupInfo={popupInfo} handlePopup={handlePopup}>
          <PopupChangeSessions2
          // selectedMovieTitle={selectedMovieTitle}
          // handleSelectedMovieTitle={handleSelectedMovieTitle}
          movies={movies}
          sessions={sessions}
          halls={halls}
          // filtredSessions={filtredSessions}
          lastSessionId={lastSessionId}
          onChangeCallback={onChangeCallback}
          onAddCallback={onAddCallback}
          onDeleteCallback={onDeleteCallback}
          />
        </PopupBase>
      </>
    )
  }

  if (popupInfo.status === 'hide popup') {
    return (
      <PopupBase popupInfo={popupInfo} handlePopup={handlePopup}></PopupBase>
    )
  }
}

export default Popup4