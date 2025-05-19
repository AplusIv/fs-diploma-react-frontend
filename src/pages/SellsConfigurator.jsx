import { useState } from "react";
import SectionHeader from "./SectionHeader";

const SellsConfigurator = () => {
  const [isActiveHeaderState, setIsActiveHeaderState] = useState(true);
  const toggleSectionVisibility = () => {
    setIsActiveHeaderState(!isActiveHeaderState);
  }

  return (
    <section className="conf-step">
      <SectionHeader name={'Открыть продажи'} isActiveHeaderState={isActiveHeaderState} handleClick={toggleSectionVisibility}/>
      <div className="conf-step__wrapper text-center">
        <p className="conf-step__paragraph">Всё готово, теперь можно:</p>
        <button className="conf-step__button conf-step__button-accent">Открыть продажу билетов</button>
        {/* <button className="conf-step__button conf-step__button-accent">Приостановить продажу билетов</button> */}
      </div>
    </section>    
  )
}

export default SellsConfigurator