import { useState, useEffect } from "react";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import api from "../utils/Api";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { CardsContext } from "../contexts/CardsContext";

function App() {
  // Хуки, управляющие внутренним состоянием.
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isImagePopupOpen, setIsImagePopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [currentUser, setCurrentUser] = useState({ name: "", about: "", avatar: "" });
  const [cards, setCards] = useState([]);

  //Запрос на сервер данных пользователя и списка карточек
  useEffect(() => {
    Promise.all([api.getUserInfo(), api.getCards()])
      .then(([userInfo, cards]) => {
        // Заполняем информацию профиля с сервера, добавляем нужную информацию профиля элементам
        setCurrentUser(userInfo);
        setCards(cards);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  //Обработка клика по изображению карточки места
  function handleCardClick(cardData) {
    setSelectedCard(cardData);
    setIsImagePopupOpen(true);
  }

  //Обработка клика по кнопке редактирования аватара пользователя
  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  //Обработка клика по кнопке редактирования профиля пользователя
  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  //Обработка клика по кнопке добавления нового места
  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  //Функция закрытия попапов
  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsImagePopupOpen(false);
  }

  // Функция удаления карточки
  function handleCardDelete(card) {
    api
      .deleteCard(card)
      .then(() => {
        setCards((state) => state.filter((c) => c._id !== card._id));
      })
      .catch((err) => {
        console.error(err);
      });
  }

  // Обновляем карточку после нажатия на кнопку лайк
  function mapCards(card, newCard) {
    setCards((state) => state.map((c) => (c._id === card._id ? newCard : c)));
  }

  // Функция обработки нажатия кнопки лайк у карточки
  function handleCardLike(card, isLiked) {
    // Если карточка лайкнута, лайк при нажатии убираем
    if (isLiked) {
      api
        .removeLike(card)
        .then((newCard) => {
          mapCards(card, newCard);
        })
        .catch((err) => {
          console.error(err);
        });
      // Если карточка не лайкнута, лайк при нажатии добавляем
    } else {
      api
        .putLike(card)
        .then((newCard) => {
          mapCards(card, newCard);
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }

  //Обработка изменения данных профиля пользователя
  function handleUpdateUser(userData) {
    api
      .setUserInfo(userData)
      .then((newData) => {
        setCurrentUser(newData);
      })
      .then(() => {
        closeAllPopups();
      })
      .catch((err) => {
        console.error(err);
      });
  }

  //Обработка изменения аватара пользователя
  function handleUpdateAvatar(avatarData) {
    api
      .setUserAvatar(avatarData)
      .then((newAvatar) => {
        setCurrentUser(newAvatar);
      })
      .then(() => {
        closeAllPopups();
      })
      .catch((err) => {
        console.error(err);
      });
  }

  //Обработка добавления нового места
  function handleAddPlaceSubmit(newPlaceData) {
    api
      .AddPlace(newPlaceData)
      .then((newCard) => {
        setCards([newCard, ...cards]);
      })
      .then(() => {
        closeAllPopups();
      })
      .catch((err) => {
        console.error(err);
      });
  }

  return (
    // <Route
    // path="/"
    // element={
    <div className="page">
      <CurrentUserContext.Provider value={currentUser}>
        <CardsContext.Provider value={cards}>
          <Header />
          <Main
            onEditAvatar={handleEditAvatarClick}
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onCardClick={handleCardClick}
            setCards={setCards}
            cards={cards}
            onCardLike={handleCardLike}
            onCardDelete={handleCardDelete}
          />
          <Footer />

          <ImagePopup
            card={selectedCard}
            isOpen={isImagePopupOpen}
            onClose={closeAllPopups}
          />

          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
            onUpdateUser={handleUpdateUser}
          />

          <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            onUpdateAvatar={handleUpdateAvatar}
          />

          <AddPlacePopup
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
            onAddPlace={handleAddPlaceSubmit}
          />

          <PopupWithForm
            name="delete-card"
            title="Вы уверены?"
            submitText="Да"
            onClose={closeAllPopups}
          />
        </CardsContext.Provider>
      </CurrentUserContext.Provider>
    </div>
    // }
    // ></Route>
  );
}

export default App;
