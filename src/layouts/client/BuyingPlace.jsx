import React from 'react'

const BuyingPlace = ({place, handlePlaceSelected}) => {
  const placeType = place.type;
  const placeSelected = place.is_selected;
  return (
    placeSelected ? <span className={"buying-scheme__chair buying-scheme__chair_" + "selected"} onClick={() => handlePlaceSelected(place.id)}><h3>{place.id}</h3></span>
      : <span className={"buying-scheme__chair buying-scheme__chair_" + placeType} onClick={() => handlePlaceSelected(place.id)}><h3>{place.id}</h3></span>
    
    // <span className={"buying-scheme__chair buying-scheme__chair_" + placeType} onClick={() => console.log(place.id)}><h3>{place.id}</h3></span>
  )
}

export default BuyingPlace