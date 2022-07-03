import { useEffect, useState } from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup(props) {
  const [place, setPlace] = useState("");
  const [link, setLink] = useState("");

  function handleChangePlace(e) {
    setPlace(e.target.value);
  }

  function handleChangeLink(e) {
    setLink(e.target.value);
  }

  useEffect(() => {
    setPlace("");
    setLink("");
  }, [props.isOpen]);

  function handleSubmit(e) {
    // Запрещаем браузеру переходить по адресу формы
    e.preventDefault();

    // Передаём значения управляемых компонентов во внешний обработчик
    props.onAddPlace({
      name: place,
      link: link,
    });
  }

  return (
    <PopupWithForm
      name="add_place"
      title="Новое место"
      submitText="Создать"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    >
      <input
        required
        value={place}
        onChange={handleChangePlace}
        type="text"
        placeholder="Название"
        className="popup__input popup__input_type_place"
      />
      <span
        className="error"
        id="newPlaceName-error"
        name="newPlaceNameInputError"
      ></span>
      <input
        required
        value={link}
        onChange={handleChangeLink}
        type="url"
        placeholder="Ссылка на картинку"
        className="popup__input popup__input_type_link"
      />
      <span
        className="error"
        id="newPlaceLink-error"
        name="newPlaceLinkInputError"
      ></span>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
