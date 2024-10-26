import apiClient from "../services/jsonServerApi";

const HallName = ({ hall, handleDeleteHall }) => {
  // const { hall } = props;

  // const handleDeleteHall = () => {
  //   // if (e.target.tagName === 'BUTTON') {
  //     apiClient.delete(`/halls/${hall.id}`)
  //       .then(response => console.log(response.statusText))
  //       .catch(error => console.log(error))
  //   // }
  // }
  return (
    <li>{hall.title}{' '}
      <button className="conf-step__button conf-step__button-trash" onClick={() => handleDeleteHall(hall.id)}></button>
    </li>
  )
}

export default HallName