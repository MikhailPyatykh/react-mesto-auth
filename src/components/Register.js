import PageWithForm from "./PageWithForm";
import { useState } from "react";

function Register(props) {
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  // const [message, setMessage] = useState("");

  function handleChange(e) {
    const { name, value } = e.target;
    setData((oldData) => ({
      ...oldData,
      [name]: value,
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    // let { email, password } = data;
    const { email, password } = data;
    // console.log(email, password);
    props.handleRegister(email, password);
  }

  return (
    <PageWithForm
      name="sign-up"
      title="Регистрация"
      submitText="Зарегистрироваться"
      description="Уже зарегистрированы?"
      signin="Войти"
      onSubmit={handleSubmit}
      link="/sign-in"
    >
      <input
        required
        name="email"
        type="email"
        className="page__input"
        placeholder="Email"
        onChange={handleChange}
      />
      <span className="error" id="email-error" name="emailInputError"></span>
      <input
        required
        name="password"
        type="password"
        className="page__input"
        placeholder="Пароль"
        onChange={handleChange}
      />
      <span className="error" id="password-error" name="passwordInputError"></span>
    </PageWithForm>
  );
}

export default Register;
