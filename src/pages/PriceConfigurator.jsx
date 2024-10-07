import { useState } from "react";
import apiClient from "../services/jsonServerApi";

import HallConfiguratorTitles from "./HallConfiguratorTitles"
import SectionButtons from "./SectionButtons"
import SectionHeader from "./SectionHeader"
import axios from "axios";

const PriceConfigurator = ({ halls }) => {
  const [checked, setChecked] = useState('Зал 1');

  const [hall, setHall] = useState(halls[0]);

  const [isActiveHeaderState, setIsActiveHeaderState] = useState(true);

  // const [normalPrice, setNormalPrice] = useState(hall.normal_price);
  // const [vipPrice, setVipPrice] = useState(hall.vip_price);


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

  // прошлый вариант
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
    setHall((previousHall) => ({ ...previousHall, ...chosenHall }));
    console.log(hall);

    // Смена цены при выборе другого зала
    // setNormalPrice(hall.normal_price);
    // setVipPrice(hall.vip_price);

    // прошлая версия
    // setPrices((previousPrices) => ({...previousPrices, normal_price: Number(hall.normal_price), vip_price: Number(hall.vip_price)}));
  }

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

    // Смена цены при выборе другого зала
    // setNormalPrice(hall.normal_price);
    // setVipPrice(hall.vip_price);

    // setPrices((previousPrices) => ({...previousPrices, normal_price: Number(chosenHall.normal_price), vip_price: Number(chosenHall.vip_price)}));
    // setPrices({...prices, [e.target.name]: e.target.value})
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log('handleSubmit');

    // Обновление конфигурации мест в залах
    apiClient.get(`/halls`)
      .then(response => {
        console.log(response);
        const hallsData = [...response.data];

        // есть ли изменения с сохранеными в БД
        const newHallsData = hallsData.map(hallData => {
          const configuration = configurations.find(configuration => configuration.hall_id === hallData.id);

          if (!(hallData.normal_price === configuration.normal_price && hallData.vip_price === configuration.vip_price)) {
            return { ...hallData, normal_price: configuration.normal_price, vip_price: configuration.vip_price }
          }
        });

        // если есть (массив непустой), то обновить конфигурацию в БД
        const filteredNewHallsData = newHallsData.filter(data => data !== undefined);
        if (filteredNewHallsData.length !== 0) {
          console.log(filteredNewHallsData);

          let putRequests = filteredNewHallsData.map(newHallData => apiClient.put(`/halls/${newHallData.id}`, newHallData));
          axios.all(putRequests).then(response => console.log(response)).catch(error => console.log(error));
        } else {
        // если массив пустой - ничего не делать
        console.log('Изменения в конфигурации не выявлены, сохранять не нужно');
        }

      }).catch(error => console.log(error));

    // Прошлая версия
    // const data = {...hall, ...prices}
    // // put axios
    // apiClient.put(`/halls/${hall.id}`, 
    //   data)
    //   .then(response => console.log(response))
    //   .catch(error => console.error(error));    
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
    // setConfiguration((previousConfiguration) => ({...previousConfiguration, rows: Number(hall.rows), places: Number(hall.places)}));


    // прошлая версия
    // e.preventDefault();
    // console.log(e.target);
    // setNormalPrice(hall.normal_price);
    // setVipPrice(hall.vip_price);
    // console.log(hall);
    // setPrices((previousPrices) => ({...previousPrices, normal_price: Number(hall.normal_price), vip_price: Number(hall.vip_price)}));
    // setPrices({...prices, [e.target.name]: e.target.value})

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


    // прошлая версия
    // setPrices({...prices, [e.target.name]: Number(e.target.value)});
    // console.dir(e.target.name);
    // console.log(e.target.value);
    // console.log(prices);

    // const chosenHall = halls.filter(hall => hall.title === e.target.value)[0]; // возвращаю первый элемент полученного массива
    // setHall((previousHall) => ({...previousHall, ...chosenHall}));
    // console.log(hall);
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