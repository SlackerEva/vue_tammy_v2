class Shadows {
  
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

  //Находит все тени, прогружает по 10, есть пагинация
  getShadows(from, to, searchStr) {
    let newPageUrl = (this.url + '/?' + new URLSearchParams({ from: from, to: to, str: searchStr }).toString());
    return fetch(newPageUrl, {
      method: 'GET',
      headers: this.headers
    })
      .then((res) => {
        return this._getResponseData(res);
      }); 
  }
}

const shadows = new Shadows({
  url: 'http://localhost:3002',
  headers: new Headers({
    'Accept': 'application/json',
    "Content-Type": "application/json",
    "Authorization" : `Bearer ${localStorage.getItem('token')}`
  })
})

export default shadows;