class UserShadow {
  
  constructor(config) {
    this.url = config.url;
    this.headers = config.headers;
  }

  _getResponseData(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(new Error(`Ошибка: ${res.status}`));
  }

  //Добавляет значение в таблицу userShadows
  insertUserShadow(shadowId) {
    return fetch(this.url + '/add-user-shadow', {
      method: 'POST',
      headers: this.headers(),
      body: JSON.stringify({
        shadowId: shadowId
      })
    })
      .then((res) => {
        return this._getResponseData(res);
      });
  }

  //Удаляет значение из таблицы userShadows
  removeUserShadow(shadowId) {
    return fetch(this.url + '/remove-user-shadow', {
      method: 'DELETE',
      headers: this.headers(),
      body: JSON.stringify({
        shadowId: shadowId
      })
    })
      .then((res) => {
        return this._getResponseData(res);
      });
  }

  //Получает все shadows конкретного user из таблицы userShadows
  getUserShadows() {
    return fetch(this.url + '/get-user-shadows', {
      method: 'GET',
      headers: this.headers()
    })
      .then((res) => {
        return this._getResponseData(res);
      });
  }
}

const userShadow = new UserShadow({
  url: 'http://localhost:3002',
  headers: () => new Headers({
    'Accept': 'application/json',
    "Content-Type": "application/json",
    "Authorization" : `Bearer ${localStorage.getItem('token')}`
  })
})

export default userShadow;