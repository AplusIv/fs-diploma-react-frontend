import { useState } from "react";
import apiClient from "../services/jsonServerApi";

import HallConfiguratorTitles from "./HallConfiguratorTitles"
import SectionButtons from "./SectionButtons"
import SectionHeader from "./SectionHeader"

const PriceConfigurator = ({ halls }) => {
  const [checked, setChecked] = useState('Зал 1');

  const [hall, setHall] = useState(halls[0]);

  const [isActiveHeaderState, setIsActiveHeaderState] = useState(true);

  // const [normalPrice, setNormalPrice] = useState(hall.normal_price);
  // const [vipPrice, setVipPrice] = useState(hall.vip_price);

  const [prices, setPrices] = useState({
    normal_price: '',
    vip_price: '',
  });


  const handleClick = (e) => {
    console.log(e.currentTarget.className);
    // if (e.target.contains)
    if (e.currentTarget.classList.contains('conf-step__header')) {
      setIsActiveHeaderState(!isActiveHeaderState);
    }
    // setIsActiveHeaderState(!isActiveHeaderState);
  }

  const handleChooseHall = (e) => {
    console.log(checked);

    console.log('click ' + e.target.value);
    setChecked(e.target.value);

    const chosenHall = halls.filter(hall => hall.title === e.target.value)[0]; // возвращаю первый элемент полученного массива
    setHall((previousHall) => ({...previousHall, ...chosenHall}));
    console.log(hall);

    // Смена цены при выборе другого зала
    // setNormalPrice(hall.normal_price);
    // setVipPrice(hall.vip_price);
    
    setPrices((previousPrices) => ({...previousPrices, normal_price: Number(hall.normal_price), vip_price: Number(hall.vip_price)}));
  }

  const handleChange = (e) => {
    console.log(checked);

    console.log('checked true');
    setChecked(e.target.value);

    console.log(e);
    console.dir(e.target);

    const chosenHall = halls.filter(hall => hall.title === e.target.value)[0]; // возвращаю первый элемент полученного массива
    // console.log(chosenHall);
    setHall((previousHall) => ({...previousHall, ...chosenHall}));
    console.log(hall);

    // Смена цены при выборе другого зала
    // setNormalPrice(hall.normal_price);
    // setVipPrice(hall.vip_price);
    
    setPrices((previousPrices) => ({...previousPrices, normal_price: Number(chosenHall.normal_price), vip_price: Number(chosenHall.vip_price)}));
    // setPrices({...prices, [e.target.name]: e.target.value})
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log('submit section');

    const data = {...hall, ...prices}
    // put axios
    apiClient.put(`/halls/${hall.id}`, 
      data)
      .then(response => console.log(response))
      .catch(error => console.error(error));    
  } 

  const handleRefresh = (e) => {
    // Почему срабатывает при Enter в инпуте, будто это произошло событие Submit?

    // e.preventDefault();
    console.log(e.target);
    // setNormalPrice(hall.normal_price);
    // setVipPrice(hall.vip_price);
    console.log(hall);
    setPrices((previousPrices) => ({...previousPrices, normal_price: Number(hall.normal_price), vip_price: Number(hall.vip_price)}));
    // setPrices({...prices, [e.target.name]: e.target.value})

  }

  const handleInput = (e) => {
    // setPrices((previousPrices) => ({...previousPrices, normal_price: e.target.value}))
    setPrices({...prices, [e.target.name]: Number(e.target.value)});
    console.dir(e.target.name);
    console.log(e.target.value);
    console.log(prices);

    // const chosenHall = halls.filter(hall => hall.title === e.target.value)[0]; // возвращаю первый элемент полученного массива
    // setHall((previousHall) => ({...previousHall, ...chosenHall}));
    // console.log(hall);
  }


  return (
    <section className="conf-step">
      
      <SectionHeader name={'Конфигурация цен'} isActiveHeaderState={isActiveHeaderState} handleClick={handleClick} />
      
      <div className="conf-step__wrapper">
        <form onSubmit={handleSubmit}> 
    
          <p className="conf-step__paragraph">Выберите зал для конфигурации:</p>
          <HallConfiguratorTitles halls={ halls } name="prices-hall" handleChange={handleChange} checked={checked} onClick={handleInput}/>
            
          <p className="conf-step__paragraph">Установите цены для типов кресел:</p>
            <div className="conf-step__legend">
              <label className="conf-step__label">Цена, рублей
                <input type="text" 
                  className="conf-step__input"
                  name="normal_price" 
                  placeholder="0" 
                  value={prices.normal_price} 
                  // onClick={handleInput}
                  onChange={handleInput}
                  // onChange={(e) => setPrices((previousPrices) => ({...previousPrices, normal_price: e.target.value}))}
                  />
                {/* <input type="text" className="conf-step__input" placeholder="0" value={normalPrice} onChange={(e) => setNormalPrice(e.target.value)}/> */}
              </label>
              за <span className="conf-step__chair conf-step__chair_standart"></span> обычные кресла
            </div>  
            <div className="conf-step__legend">
              <label className="conf-step__label">Цена, рублей
                <input 
                  type="text" 
                  className="conf-step__input" 
                  name="vip_price" 
                  placeholder="0" 
                  value={prices.vip_price} 
                  onChange={handleInput}                  
                />
              </label>
              за <span className="conf-step__chair conf-step__chair_vip"></span> VIP кресла
            </div>   

          <SectionButtons handleRefresh={handleRefresh}/>
          {/* <fieldset className="conf-step__buttons text-center">
            <button className="conf-step__button conf-step__button-regular">Отмена</button>
            <input type="submit" value="Сохранить" className="conf-step__button conf-step__button-accent"/>
          </fieldset> */}
        </form>  
      </div>
    </section>
  )
}

export default PriceConfigurator