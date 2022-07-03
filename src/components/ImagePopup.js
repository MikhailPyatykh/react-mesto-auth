function ImagePopup(props) {
  return (
    <section className={`popup popup_view${props.isOpen ? " popup_opened" : ""}`}>
      <div className="popup__container">
        <button
          type="button"
          className="popup__close-btn"
          onClick={props.onClose}
        ></button>
        <figure className="popup__figure">
          <img
            className="popup__picture"
            src={props.card ? props.card.link : ""}
            alt={`Вид на ${props.card ? props.card.name : ""}`}
          />
          <figcaption className="popup__caption">
            {props.card ? props.card.name : ""}
          </figcaption>
        </figure>
      </div>
    </section>
  );
}

export default ImagePopup;
