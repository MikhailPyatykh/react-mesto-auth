function PopupWithForm(props) {
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
          <h3 className="popup__heading">{props.title}</h3>
          <form
            className="popup__inputs"
            name={`${props.name}`}
            onSubmit={props.onSubmit}
          >
            {props.children}
            <button type="submit" className="popup__submit-btn">
              {props.submitText}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

export default PopupWithForm;
