import Place from "./Place";

const HallConfiguratorPlaces = ({ places, handlePlaceType }) => {
  /* const rowsCount = hall.rows;
  // const placesCount = halls.places;
  const placesCount = hall.places;


  // let rowsContent = [];
  // for (let i = 0; i < rowsCount; i++) {
  //   rowsContent.push(<div className="conf-step__row"/>);
  // }

  let placesContent = [];
  for (let i = 0; i < placesCount; i++) {
    placesContent.push(<span className="conf-step__chair conf-step__chair_standart"/>);
  }

  let rowsContent = [];
  for (let i = 0; i < rowsCount; i++) {
    rowsContent.push(<div className="conf-step__row">
                      {placesContent.map(place => place)}
                    </div>);
  } */

  // let rows = [];
  // for (let index = 1; index <= rowsCount; index++) {
  //   const row = places.filter(place => place.row === rowsCount);
  //   rows.push(row);
  // }
  // console.log(rows);
  

  return (
    <div className="conf-step__hall-wrapper">
      {/* {rowsContent.map(row => row)} */}
      {/* {rows.map(row => <div className="conf-step__row">
        {row.map(place => <Place key={place.id} place={place}/>)}
        </div>)} */}

      {/* {places.map(row => <div className="conf-step__row">
        {row.map(place => <Place key={place.id} place={place}/>)}
        </div>)} */}

      {places.map(row => <div className="conf-step__row">
        {row.map(place => <Place key={place.id} place={place} handlePlaceType={handlePlaceType}/>)}
      </div>)}

        {/* {places.map(place => <Place key={place.id} place={place}/>)} */}
    </div> 
  )
}

export default HallConfiguratorPlaces