import { useState, useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import PopupWithForm from "./PopupWithForm";
import ProtectedRoute from "./ProtectedRoute";
import InfoTooltip from "./InfoTooltip";
import ImagePopup from "./ImagePopup";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import Register from "./Register";
import Login from "./Login";
import api from "../utils/Api";
import auth from "../utils/Auth";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { CardsContext } from "../contexts/CardsContext";

function App() {
  // Хуки, управляющие внутренним состоянием.
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isImagePopupOpen, setIsImagePopupOpen] = useState(false);
  const [isInfoTooltipPopupOpen, setIsInfoTooltipPopupOpen] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [email, setEmail] = useState({ email: "" });
  const [selectedCard, setSelectedCard] = useState(null);
  const [currentUser, setCurrentUser] = useState({ name: "", about: "", avatar: "" });
  const [cards, setCards] = useState([]);
  const navigate = useNavigate();

  // Функция обработки регистрации данных пользователя
  function handleRegister(email, password) {
    auth
      .register(email, password)
      //Проверяем ответ от сервера
      .then((data) =>
        data
          ? (setIsSuccess(true), setIsInfoTooltipPopupOpen(true))
          : (setIsSuccess(false), setIsInfoTooltipPopupOpen(true))
      );
  }

  useEffect(() => {
    navigate("/sign-in");
  }, [isSuccess]);

  // Функция обработки входа пользователя
  function handleLogin(email, password) {
    auth
      .login(email, password)
      .then((data) => {
        localStorage.setItem("token", data.token);
        setEmail(email);
        setLoggedIn(true);
        navigate("/");
      })
      .catch((err) => {
        console.error(err);
        setIsInfoTooltipPopupOpen(true);
        setIsSuccess(false);
      });
  }

  //Функция проверки токена
  function tokenCheck() {
    const token = localStorage.getItem("token");
    if (token) {
      auth
        .getContent(token)
        .then((res) => {
          const { email } = res.data;
          setEmail(email);
          setLoggedIn(true);
          navigate("/");
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  //Проверка токена
  useEffect(() => {
    tokenCheck();
  }, []);

  //Функция обработки выхода пользователя
  function handleLogout() {
    localStorage.removeItem("token");
    setEmail({ email: "" });
    setLoggedIn(false);
  }

  //Запрос на сервер данных пользователя и списка карточек
  useEffect(() => {
    loggedIn &&
      Promise.all([api.getUserInfo(), api.getCards()])
        .then(([userInfo, cards]) => {
          // Заполняем информацию профиля с сервера, добавляем нужную информацию профиля элементам
          setCurrentUser(userInfo);
          setCards(cards);
        })
        .catch((err) => {
          console.error(err);
        });
  }, [loggedIn]);

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
    setIsInfoTooltipPopupOpen(false);
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
    <div className="page">
      <CurrentUserContext.Provider value={currentUser}>
        <CardsContext.Provider value={cards}>
          <Header handleLogout={handleLogout} loggedIn={loggedIn} email={email}></Header>
          <Routes>
            <Route
              path="/"
              element={
                <ProtectedRoute path="/" loggedIn={loggedIn}>
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
                </ProtectedRoute>
              }
            ></Route>
            <Route
              path="/sign-up"
              element={<Register handleRegister={handleRegister} />}
            ></Route>
            <Route path="/sign-in" element={<Login handleLogin={handleLogin} />}></Route>
          </Routes>

          <InfoTooltip
            isOpen={isInfoTooltipPopupOpen}
            onClose={closeAllPopups}
            isSuccess={isSuccess}
          ></InfoTooltip>
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
  );
}

export default App;
