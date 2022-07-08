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
              <img
                className="popup__picture"
                src=""
                alt="Информационная картинка успешной регистрации"
              />
              <div className="popup__message">Вы успешно зарегистрировались!</div>
            </div>
          ) : (
            <div className="popup__block">
              <img
                className="popup__picture"
                src=""
                alt="Информационная картинка ошибки при регистрации"
              />
              <div className="popup__message">
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
