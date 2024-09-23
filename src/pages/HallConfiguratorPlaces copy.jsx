const HallConfiguratorPlaces = ({ hall, places }) => {
  const rowsCount = hall.rows;
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
  }

  return (
    <div className="conf-step__hall-wrapper">
      {rowsContent.map(row => row)}
    </div> 
  )
}

export default HallConfiguratorPlaces