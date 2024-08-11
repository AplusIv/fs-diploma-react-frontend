const SectionButtons = ({ handleRefresh }) => {
  return (
    <fieldset className="conf-step__buttons text-center">
      <button type="button" className="conf-step__button conf-step__button-regular" onClick={handleRefresh}>Отмена</button> {/* type='button' */}
      <input type="submit" value="Сохранить" className="conf-step__button conf-step__button-accent"/>
    </fieldset>
  )
}

export default SectionButtons