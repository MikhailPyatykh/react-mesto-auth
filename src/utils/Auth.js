class Auth {
  constructor(config) {
    this._config = config;
  }

  _makeRequest(promise) {
    return promise
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
      })
      .then((obj) => {
        return obj;
      });
  }

  register(email, password) {
    return this._makeRequest(
      fetch(`${this._config.baseUrl}/signup`, {
        method: "POST",
        headers: this._config.headers,
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      })
    );
  }

  login(email, password) {
    return this._makeRequest(
      fetch(`${this._config.baseUrl}/signin`, {
        method: "POST",
        headers: this._config.headers,
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      })
    );
  }

  getContent(token) {
    return this._makeRequest(
      fetch(`${this._config.baseUrl}/signin`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-type": "application/json; charset=utf-8",
          Authorization: `Bearer ${token}`,
        },
      })
    );
  }
}

// Инициализируем класс Auth
const auth = new Auth({
  baseUrl: "https://auth.nomoreparties.co",
  headers: {
    Accept: "application/json",
    "Content-type": "application/json; charset=utf-8",
  },
});

export default auth;
