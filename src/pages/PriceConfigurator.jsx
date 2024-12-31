import { useState } from "react";
import apiClient from "../services/jsonServerApi";

import HallConfiguratorTitles from "./HallConfiguratorTitles"
import SectionButtons from "./SectionButtons"
import SectionHeader from "./SectionHeader"
import axios from "axios";
import { updateHallInDB } from "../services/DBUpdater";

const PriceConfigurator = ({ halls }) => {

  // // Показ/скрытие секции
  const [isActiveHeaderState, setIsActiveHeaderState] = useState(true);
  const handleClick = (e) => {
    console.log(e.currentTarget.className);
    // if (e.target.contains)
    if (e.currentTarget.classList.contains('conf-step__header')) {
      setIsActiveHeaderState(!isActiveHeaderState);
    }
    // setIsActiveHeaderState(!isActiveHeaderState);
  }

  // выбранное название зала
  const [checked, setChecked] = useState((halls.length > 0) ? halls[0].title : undefined);

  // Выбранный зал
  const [hall, setHall] = useState((halls.length > 0) ? halls[0] : undefined);

  // Конфигурации цен всех залов
  let initialConfigurations = [];
  halls.forEach(hall => {
    const configuration = {
      hall_id: hall.id,
      normal_price: hall.normal_price,
      vip_price: hall.vip_price,
    }
    initialConfigurations.push(configuration);
  })

  const [configurations, setConfigurations] = useState(initialConfigurations);
  console.log({ configurations });

  const handleChange = (e) => {
    console.log(checked);

    console.log('checked true');
    setChecked(e.target.value);

    console.log(e);
    console.dir(e.target);

    const chosenHall = halls.filter(hall => hall.title === e.target.value)[0]; // возвращаю первый элемент полученного массива
    // console.log(chosenHall);
    setHall((previousHall) => ({ ...previousHall, ...chosenHall }));
    console.log(hall);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log('handleSubmit');

    // 1) Есть ли изменения в ценах залов
    let hallPriceDiffs = []; // Залы с изменившимися ценами

    halls.filter(hallData => {
      const configuration = configurations.find(configuration => configuration.hall_id === hallData.id);

      // return (!(hallData.rows === configuration.rows && hallData.places === configuration.places))

      if (!(hallData.normal_price === configuration.normal_price && hallData.vip_price === configuration.vip_price)) {
        hallPriceDiffs.push({ ...hallData, normal_price: configuration.normal_price, vip_price: configuration.vip_price });
        return true;
      }
    })

    console.log({ hallPriceDiffs });

    if (hallPriceDiffs.length > 0) {
      const promises = hallPriceDiffs.map(async data => {
        const updatedHall = {
          title: data.title,
          rows: data.rows,
          places: data.places,
          normal_price: Number(data.normal_price).toFixed(2),
          vip_price: Number(data.vip_price).toFixed(2)
        };
        try {
          // return await apiClient.put(`api/places/${data.id}`, updatedHall);
          return await updateHallInDB(data.id, updatedHall);
        } catch (error) {
          console.log(error);
        }
      })
    
      try {
        console.log({promises});        
        const response = await Promise.all(promises);
        console.log(response);
      } catch (error) {
        console.log(error);
      }
    }
  }

  const handleRefresh = (e) => {
    // Почему срабатывает при Enter в инпуте, будто это произошло событие Submit?

    console.log('handleRefresh');
    console.log(e.target);


    // Возврат к конфигурации
    const refreshedConfigurations = configurations.map(configuration => {
      if (configuration.hall_id === hall.id) {
        return { ...configuration, normal_price: Number(hall.normal_price), vip_price: Number(hall.vip_price) }
      } else {
        return configuration;
      }
    })

    setConfigurations(refreshedConfigurations);
  }

  const handleInput = (e) => {
    // setPrices((previousPrices) => ({...previousPrices, normal_price: e.target.value}))
    console.log(e);
    
    // Уточнить, как сделать ввод нескольких символов без обновления 
    const newConfigurations = configurations.map(configuration => {
      if (configuration.hall_id === hall.id) {
        return { ...configuration, [e.target.name]: e.target.value }
      } else {
        return configuration;
      }
    })

    setConfigurations(newConfigurations);
  }

  const handleBlur = (e) => {
    // setPrices((previousPrices) => ({...previousPrices, normal_price: e.target.value}))
    console.log(e);
    
    // Уточнить, как 
    const newConfigurations = configurations.map(configuration => {
      if (configuration.hall_id === hall.id) {
        return { ...configuration, [e.target.name]: Number(parseFloat(e.target.value).toFixed(2)) }
      } else {
        return configuration;
      }
    })

    setConfigurations(newConfigurations);
  }


  return (
    <section className="conf-step">

      <SectionHeader name={'Конфигурация цен'} isActiveHeaderState={isActiveHeaderState} handleClick={handleClick} />

      <div className="conf-step__wrapper">
        <form onSubmit={handleSubmit}>

          <p className="conf-step__paragraph">Выберите зал для конфигурации:</p>
          <HallConfiguratorTitles halls={halls} name="prices-hall" handleChange={handleChange} checked={checked} onClick={handleInput} />

          <p className="conf-step__paragraph">Установите цены для типов кресел:</p>
          <div className="conf-step__legend">
            <label className="conf-step__label">Цена, рублей
              <input type="text"
                className="conf-step__input"
                name="normal_price"
                placeholder="0"
                value={configurations.find(configuration => configuration.hall_id === hall.id).normal_price}
                // onClick={handleInput}
                onChange={handleInput} 
                onBlur={handleBlur}
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
                value={configurations.find(configuration => configuration.hall_id === hall.id).vip_price}
                onChange={handleInput}
                onBlur={handleBlur}
              />
            </label>
            за <span className="conf-step__chair conf-step__chair_vip"></span> VIP кресла
          </div>

          <SectionButtons handleRefresh={handleRefresh} />
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