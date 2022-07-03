function Card(props) {
  //Обработка клика по картинке карточки
  function handleCardClick() {
    props.onCardClick(props.card);
  }

  //Обработка клика по кнопке лайк
  function handleLikeClick() {
    props.onCardLike(props.card, props.isLiked);
  }

  //Обработка клика по кнопке удаления
  function handleDeleteClick() {
    props.onCardDelete(props.card);
  }

  return (
    <li className="place">
      <img
        src={props.card.link}
        className="place__image"
        alt={`Вид на ${props.card.name}`}
        onClick={handleCardClick}
      />
      <button
        type="button"
        className={`place__icon-basket${
          props.showBasketIcon ? " place__icon-basket_active" : ""
        }`}
        onClick={handleDeleteClick}
      ></button>
      <div className="place__card-info">
        <h2 className="place__title">{props.card.name}</h2>
        <div className="place__likes">
          <button
            type="button"
            className={`place__likes_icon-heart${
              props.isLiked ? " place__likes_icon-heart_active" : ""
            }`}
            onClick={handleLikeClick}
          ></button>
          <div className="place__likes_numbers">{props.card.likes.length}</div>
        </div>
      </div>
    </li>
  );
}

export default Card;
