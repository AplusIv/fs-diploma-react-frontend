import { useState } from "react"
import apiClient from "../services/jsonServerApi"

import HallConfiguratorPlaces from "./HallConfiguratorPlaces"
import HallConfiguratorTitles from "./HallConfiguratorTitles"
import SectionButtons from "./SectionButtons"
import SectionHeader from "./SectionHeader"

const HallConfigurator = ({ halls }) => {

  // выбранный зал (для выгрузки плана зала)
  const [hall, setHall] = useState(halls[0]);

  // выбранное название зала
  const [checked, setChecked] = useState('Зал 1');


  // Показ/скрытие секции
  const [isActiveHeaderState, setIsActiveHeaderState] = useState(true);

  // Количество рядов/мест в выбранном зале
  const [configuration, setConfiguration] = useState({
    rows: '',
    places: '',
  });

  const handleClick = (e) => {
    console.log(e.currentTarget.className);
    // if (e.target.contains)
    if (e.currentTarget.classList.contains('conf-step__header')) {
      setIsActiveHeaderState(!isActiveHeaderState);
    }
    // setIsActiveHeaderState(!isActiveHeaderState);
  }

  const handleChange = (e) => {
    console.log(checked);

    console.log('checked true');
    setChecked(e.target.value);

    const chosenHall = halls.filter(hall => hall.title === e.target.value)[0]; // возвращаю первый элемент полученного массива
    // console.log(chosenHall);
    setHall((previousHall) => ({...previousHall, ...chosenHall}));
    console.log(hall);

    setConfiguration((previousConfiguration) => ({...previousConfiguration, rows: Number(chosenHall.rows), places: Number(chosenHall.places)}))
  }

  const handleInput = (e) => {
    setConfiguration({...configuration, [e.target.name]: Number(e.target.value)});
    console.dir(e.target.name);
    console.log(e.target.value);
  }

  const handleRefresh = (e) => {
    console.log('refresh');
    setConfiguration((previousConfiguration) => ({...previousConfiguration, rows: Number(hall.rows), places: Number(hall.places)}))
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('submit');

    console.log(typeof configuration.places);
    console.log(typeof configuration.rows);

    
    const data = {...hall, ...configuration}
    // put axios
    apiClient.put(`/halls/${hall.id}`, 
      data)
      .then(response => console.log(response))
      .catch(error => console.error(error));    
  }

  return (
    <section className="conf-step">
      <SectionHeader name={'Конфигурация залов'} isActiveHeaderState={ isActiveHeaderState } handleClick={ handleClick }/>
      
        <div className="conf-step__wrapper">
          <form onSubmit={handleSubmit}> 
            <p className="conf-step__paragraph">Выберите зал для конфигурации:</p>
            <HallConfiguratorTitles halls={ halls } name="chairs-hall" handleChange={handleChange} checked={checked} />
            <p className="conf-step__paragraph">Укажите количество рядов и максимальное количество кресел в ряду:</p>
            <div className="conf-step__legend">
              <label className="conf-step__label">Рядов, шт
                <input 
                  type="text" 
                  name="rows"
                  className="conf-step__input" 
                  value={configuration.rows} 
                  onChange={handleInput}
                  placeholder="10" />
                </label>
              <span className="multiplier">x</span>
              <label className="conf-step__label">Мест, шт
                <input 
                type="text" 
                name="places"
                className="conf-step__input" 
                value={configuration.places} 
                onChange={handleInput}
                placeholder="8" />
              </label>
            </div>
            <p className="conf-step__paragraph">Теперь вы можете указать типы кресел на схеме зала:</p>
            <div className="conf-step__legend">
              <span className="conf-step__chair conf-step__chair_standart"></span> — обычные кресла
              <span className="conf-step__chair conf-step__chair_vip"></span> — VIP кресла
              <span className="conf-step__chair conf-step__chair_disabled"></span> — заблокированные (нет кресла)
              <p className="conf-step__hint">Чтобы изменить вид кресла, нажмите по нему левой кнопкой мыши</p>
            </div>  
            
            <div className="conf-step__hall">
              <HallConfiguratorPlaces halls={ hall } />
            </div>
            
            <SectionButtons handleRefresh={handleRefresh}/>
          </form>
        </div>
    </section>
  )
}

export default HallConfigurator