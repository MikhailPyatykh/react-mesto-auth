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
          {props.isSuccess ? (
            <div className="popup__block">
              <div className="popup__message popup__message_success">
                Вы успешно зарегистрировались!
              </div>
            </div>
          ) : (
            <div className="popup__block">
              <div className="popup__message popup__message_fail">
                Что-то пошло не так! Попробуйте ещё раз.
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default InfoTooltip;
