import { Link } from "react-router-dom";

function Header(props) {
  return (
    <header className="header">
      <div className="header__logo"></div>
      <div className="header__info">
        <div className="header__user-email">{props.email}</div>
        <Link
          to={props.link}
          onClick={props.handleLogout}
          className={`header__sign-btn ${
            props.changeButtonColor ? "header__sign-btn_grey" : ""
          }`}
        >
          {props.sign}
        </Link>
      </div>
    </header>
  );
}

export default Header;
