import { useState } from "react"
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
  }

  return (
    <section className="conf-step">
      <SectionHeader name={'Конфигурация залов'} isActiveHeaderState={ isActiveHeaderState } handleClick={ handleClick }/>
      <div className="conf-step__wrapper">
        <p className="conf-step__paragraph">Выберите зал для конфигурации:</p>
        <HallConfiguratorTitles halls={ halls } name="chairs-hall" handleChange={handleChange} checked={checked} />
        <p className="conf-step__paragraph">Укажите количество рядов и максимальное количество кресел в ряду:</p>
        <div className="conf-step__legend">
          <label className="conf-step__label">Рядов, шт<input type="text" className="conf-step__input" placeholder="10" /></label>
          <span className="multiplier">x</span>
          <label className="conf-step__label">Мест, шт<input type="text" className="conf-step__input" placeholder="8" /></label>
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
        
        <SectionButtons />
      </div>
    </section>
  )
}

export default HallConfigurator