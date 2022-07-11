import { Link, Route, Routes } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";

function Header(props) {
  return (
    <header className="header">
      <div className="header__logo"></div>
      <Routes>
        <Route
          path="/sign-up"
          element={
            <div className="header__info">
              <Link to="/sign-in" className="header__sign-btn">
                Войти
              </Link>
            </div>
          }
        ></Route>
        <Route
          path="/sign-in"
          element={
            <div className="header__info">
              <Link to="/sign-up" className="header__sign-btn">
                Регистрация
              </Link>
            </div>
          }
        ></Route>
        <Route
          path="/"
          element={
            <ProtectedRoute path="/" loggedIn={props.loggedIn}>
              <div className="header__info">
                <div className="header__user-email">{props.email}</div>
                <Link
                  to="/sign-in"
                  onClick={props.handleLogout}
                  className="header__sign-btn header__sign-btn_grey"
                >
                  Выйти
                </Link>
              </div>
            </ProtectedRoute>
          }
        ></Route>
      </Routes>
    </header>
  );
}

export default Header;
