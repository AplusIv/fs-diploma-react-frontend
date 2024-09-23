import React from 'react'

const Place = ({place, handlePlaceType}) => {
  const placeType = place.type;
  return (
    <span className={"conf-step__chair conf-step__chair_" + placeType} onClick={() => handlePlaceType(place.id)}/>
  )
}

export default Place