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
        <div className="popup__block">
          <div
            className={`popup__icon ${
              props.isSuccess ? "popup__icon_success" : "popup__icon_fail"
            }`}
          ></div>
          <div className="popup__message">
            {props.isSuccess
              ? "Вы успешно зарегистрировались!"
              : "Что-то пошло не так! Попробуйте ещё раз."}
          </div>
        </div>
      </div>
    </section>
  );
}

export default InfoTooltip;
