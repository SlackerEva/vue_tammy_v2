class Auth {
  
  constructor(config) {
    this.url = config.url;
  }

  _getResponseData(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(new Error(`Ошибка: ${res.status}`));
  }

  register (email, password) {
    return fetch(`${this.url}/register`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({email, password})
    })
    .then((res) => {
      return this._getResponseData(res);
    }); 
  }

  authorize = (email, password) => {
    return fetch(`${this.url}/login`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({email, password})
    })
    .then((res) => {
      return this._getResponseData(res);
    }); 
  }
}

const auth = new Auth({
  url: 'http://localhost:3002',
})

export default auth;