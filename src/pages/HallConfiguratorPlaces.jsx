import Place from "./Place";
import { nanoid } from "nanoid";

const HallConfiguratorPlaces = ({ places, handlePlaceType }) => {

  return (
    <div className="conf-step__hall-wrapper">
      {/* {rowsContent.map(row => row)} */}
      {/* {rows.map(row => <div className="conf-step__row">
        {row.map(place => <Place key={place.id} place={place}/>)}
        </div>)} */}

      {/* {places.map(row => <div className="conf-step__row">
        {row.map(place => <Place key={place.id} place={place}/>)}
        </div>)} */}

      {places.map(row => <div key={nanoid()} className="conf-step__row">
        {row.map(place => <Place key={nanoid()} place={place} handlePlaceType={handlePlaceType}/>)}
      </div>)}

        {/* {places.map(place => <Place key={place.id} place={place}/>)} */}
    </div> 
  )
}

export default HallConfiguratorPlaces