import apiClient from "../services/jsonServerApi";
import axios from "axios";
import { useState } from "react";
import PopupBase from "./PopupBase";

const Popup3 = ({popupStatus, movieLastId, movieInfo, handleChange, isActive, popupTitle, handlePopup}) => {

  // const initialMovie = activeMovie;
  // console.log(initialMovie);
  
  
  // const [movieInfo, setMovieInfo] = useState({
  //   title: '',
  //   description: '',
  //   duration: '',
  //   country: ''
  // })



  // const [movieInfo, setMovieInfo] = useState(initialMovie);
  // console.log(movieInfo);

  
  // const handleChange = (e) => {
  //   setMovieInfo({...movieInfo, [e.target.name]: e.target.value});
  //   console.log(e.target.value);    
  // }

  const handleMovieAdding = (e) => {
    e.preventDefault();

    console.log('movie adding request');

    apiClient.post('/movies', {
      id: `${movieLastId+1}`,
      ...movieInfo
    }).then(response => {
      console.log(response);
    }).catch(error => {
      console.log(error);
    })
  }

  const handleMovieEditing = (e) => {
    e.preventDefault();

    console.log('movie editing request');

    apiClient.put(`/movies/${movieInfo.id}`, {
      ...movieInfo
    }).then(response => {
      console.log(response);
    }).catch(error => {
      console.log(error);
    })
  }

  if (popupStatus === 'adding film popup') {
    return (
      <PopupBase isActive={isActive} popupTitle={'Добавить фильм'} handlePopup={handlePopup}>
        <input 
          type="text" 
          name="title" 
          placeholder="Название фильма" 
          autoComplete="on"
          value={movieInfo.title}
          onChange={handleChange}
        />
        <textarea 
          name="description" 
          rows="5" 
          cols="33" 
          placeholder="Введите описание фильма" 
          autoComplete="on"
          value={movieInfo.description}
          onChange={handleChange}
        />
        <input 
          type="text" 
          // type="number" всё-таки длительность фильма это число
          name="duration" 
          placeholder="Длительность фильма" 
          autoComplete="on"
          value={movieInfo.duration}
          onChange={handleChange}
        />
        <input 
          type="text" 
          name="country" 
          placeholder="Название страны" 
          autoComplete="on"
          value={movieInfo.country}
          onChange={handleChange}
        />
        <input type="button" value={'Добавить фильм'} onClick={handleMovieAdding}/>
      </PopupBase>    
    )
  }
  // const activeClass = isActive ? ' active' : '';

  // console.dir(activeMovie);
  
  if (popupStatus === 'editing film popup') {
    return (    
      <>
        <PopupBase isActive={isActive} popupTitle={popupTitle} handlePopup={handlePopup}>
          <input 
            type="text" 
            name="title" 
            placeholder="Название фильма" 
            autoComplete="on"
            value={movieInfo.title}
            onChange={handleChange}
          />
          <textarea 
            name="description" 
            rows="5" 
            cols="33" 
            placeholder="Введите описание фильма" 
            autoComplete="on"
            value={movieInfo.description}
            onChange={handleChange}
          />
          <input 
            type="text" 
            // type="number" всё-таки длительность фильма это число
            name="duration" 
            placeholder="Длительность фильма" 
            autoComplete="on"
            value={movieInfo.duration}
            onChange={handleChange}
          />
          <input 
            type="text" 
            name="country" 
            placeholder="Название страны" 
            autoComplete="on"
            value={movieInfo.country}
            onChange={handleChange}
          />
          <input type="button" value={popupTitle} onClick={handleMovieEditing}/>
        </PopupBase>    
      </>
    )  
  }

  if (popupStatus === 'hide popup') {
    return null;
  }
  // return (    
  //   <>
  //     <PopupBase isActive={isActive} popupTitle={popupTitle} handlePopup={handlePopup}>
  //       <input 
  //         type="text" 
  //         name="title" 
  //         placeholder="Название фильма" 
  //         autoComplete="on"
  //         value={movieInfo.title}
  //         onChange={handleChange}
  //       />
  //       <textarea 
  //         name="description" 
  //         rows="5" 
  //         cols="33" 
  //         placeholder="Введите описание фильма" 
  //         autoComplete="on"
  //         value={movieInfo.description}
  //         onChange={handleChange}
  //       />
  //       <input 
  //         type="text" 
  //         // type="number" всё-таки длительность фильма это число
  //         name="duration" 
  //         placeholder="Длительность фильма" 
  //         autoComplete="on"
  //         value={movieInfo.duration}
  //         onChange={handleChange}
  //       />
  //       <input 
  //         type="text" 
  //         name="country" 
  //         placeholder="Название страны" 
  //         autoComplete="on"
  //         value={movieInfo.country}
  //         onChange={handleChange}
  //       />
  //       <input type="button" value={popupTitle} onClick={()=>console.log('sending request')}/>
  //     </PopupBase>    
  //   </>
  // )
}

export default Popup3