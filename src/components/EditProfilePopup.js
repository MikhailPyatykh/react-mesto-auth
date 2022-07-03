import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { useContext, useEffect, useState } from "react";

function EditProfilePopup(props) {
  const currentUser = useContext(CurrentUserContext);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser && props.isOpen]);

  function handleChangeName(e) {
    setName(e.target.value);
  }

  function handleChangeDescription(e) {
    setDescription(e.target.value);
  }

  function handleSubmit(e) {
    // Запрещаем браузеру переходить по адресу формы
    e.preventDefault();

    // Передаём значения управляемых компонентов во внешний обработчик
    props.onUpdateUser({
      name,
      about: description,
    });
  }

  return (
    <>
      <PopupWithForm
        name="edit_profile"
        title="Редактировать профиль"
        submitText="Сохранить"
        isOpen={props.isOpen}
        onClose={props.onClose}
        onSubmit={handleSubmit}
      >
        <input
          required
          type="text"
          value={name}
          onChange={handleChangeName}
          className="popup__input"
          placeholder={`${currentUser.name}`}
        />
        <span className="error" id="name-error" name="editProfileInputsError"></span>
        <input
          required
          type="text"
          value={description}
          onChange={handleChangeDescription}
          className="popup__input"
          placeholder={`${currentUser.about}`}
        />
        <span
          className="error"
          id="description-error"
          name="descriptionInputError"
        ></span>
      </PopupWithForm>
    </>
  );
}

export default EditProfilePopup;
