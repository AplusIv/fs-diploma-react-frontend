const SectionButtons = ({ handleRefresh }) => {
  return (
    <fieldset className="conf-step__buttons text-center">
      <button className="conf-step__button conf-step__button-regular" onClick={handleRefresh}>Отмена</button>
      <input type="submit" value="Сохранить" className="conf-step__button conf-step__button-accent"/>
    </fieldset>
  )
}

export default SectionButtons