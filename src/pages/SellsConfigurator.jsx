import { useState } from "react";
import SectionHeader from "./SectionHeader";

const SellsConfigurator = () => {
  const [isActiveHeaderState, setIsActiveHeaderState] = useState(true);

  const handleClick = (e) => {
    console.log(e.currentTarget.className);
    // if (e.target.contains)
    if (e.currentTarget.classList.contains('conf-step__header')) {
      setIsActiveHeaderState(!isActiveHeaderState);
    }
    // setIsActiveHeaderState(!isActiveHeaderState);
  }

  return (
    <section className="conf-step">
      <SectionHeader name={'Открыть продажи'} isActiveHeaderState={isActiveHeaderState} handleClick={handleClick}/>
      <div className="conf-step__wrapper text-center">
        <p className="conf-step__paragraph">Всё готово, теперь можно:</p>
        <button className="conf-step__button conf-step__button-accent">Открыть продажу билетов</button>
        {/* <button className="conf-step__button conf-step__button-accent">Приостановить продажу билетов</button> */}
      </div>
    </section>    
  )
}

export default SellsConfigurator