function InfoTooltip(props) {
  return (
    <section
      className={`popup popup_${props.name}${props.isOpen ? " popup_opened" : ""}`}
    >
      <div className="popup__container">
        <button
          type="button"
          className="popup__close-btn"
          onClick={props.onClose}
        ></button>
        {props.isSuccess ? (
          <div className="popup__block">
            <div className="popup__icon popup__icon_success"></div>
            <div className="popup__message">Вы успешно зарегистрировались!</div>
          </div>
        ) : (
          <div className="popup__block">
            <div className="popup__icon popup__icon_fail"></div>
            <div className="popup__message">Что-то пошло не так! Попробуйте ещё раз.</div>
          </div>
        )}
      </div>
    </section>
  );
}

export default InfoTooltip;
