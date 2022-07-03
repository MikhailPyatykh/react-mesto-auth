import PopupWithForm from "./PopupWithForm";
import { useEffect, useRef } from "react";

function EditAvatarPopup(props) {
  const inputLinkAvatar = useRef("");

  useEffect(() => {
    inputLinkAvatar.current.value = "";
  }, [props.isOpen]);

  function handleSubmit(e) {
    e.preventDefault();

    props.onUpdateAvatar({
      avatar: inputLinkAvatar.current.value,
    });
  }
  return (
    <PopupWithForm
      name="edit-avatar"
      title="Обновить аватар"
      submitText="Сохранить"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    >
      <input
        required
        type="url"
        ref={inputLinkAvatar}
        className="popup__input"
        placeholder="Ссылка на аватар"
      />
      <span className="error" id="avatarLink-error" name="avatarLinkInputError"></span>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
