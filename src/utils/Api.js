class Api {
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

  getUserInfo() {
    return this._makeRequest(
      fetch(`${this._config.baseUrl}/users/me`, {
        method: "GET",
        headers: this._config.headers,
      })
    );
  }

  getCards() {
    return this._makeRequest(
      fetch(`${this._config.baseUrl}/cards`, {
        method: "GET",
        headers: this._config.headers,
      })
    );
  }

  setUserInfo(data) {
    return this._makeRequest(
      fetch(`${this._config.baseUrl}/users/me`, {
        method: "PATCH",
        headers: this._config.headers,
        body: JSON.stringify({
          name: data.name,
          about: data.about,
        }),
      })
    );
  }

  AddPlace(data) {
    return this._makeRequest(
      fetch(`${this._config.baseUrl}/cards`, {
        method: "POST",
        headers: this._config.headers,
        body: JSON.stringify({
          name: data.name,
          link: data.link,
        }),
      })
    );
  }

  deleteCard(data) {
    return this._makeRequest(
      fetch(`${this._config.baseUrl}/cards/${data._id}`, {
        method: "DELETE",
        headers: this._config.headers,
      })
    );
  }

  setUserAvatar(data) {
    return this._makeRequest(
      fetch(`${this._config.baseUrl}/users/me/avatar`, {
        method: "PATCH",
        headers: this._config.headers,
        body: JSON.stringify({
          avatar: data.avatar,
        }),
      })
    );
  }

  putLike(data) {
    return this._makeRequest(
      fetch(`${this._config.baseUrl}/cards/${data._id}/likes`, {
        method: "PUT",
        headers: this._config.headers,
      })
    );
  }

  removeLike(data) {
    return this._makeRequest(
      fetch(`${this._config.baseUrl}/cards/${data._id}/likes`, {
        method: "DELETE",
        headers: this._config.headers,
        body: JSON.stringify({
          likes: data,
        }),
      })
    );
  }
}

// Инициализируем класс Api
const api = new Api({
  baseUrl: "https://mesto.nomoreparties.co/v1/cohort-38",
  headers: {
    authorization: "da546cc6-febd-4e48-90b5-e55f89894793",
    Accept: "application/json",
    "Content-type": "application/json; charset=utf-8",
  },
});

export default api;
