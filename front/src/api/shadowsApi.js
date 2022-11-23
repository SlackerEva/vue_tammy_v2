class Shadows {
  
  constructor(config) {
    this.url = config.url;
  }

  _getResponseData(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(new Error(`Ошибка: ${res.status}`));
  }

  getShadows(page) {
    const token = localStorage.getItem('token');
    const APISettings = {
      headers: new Headers({
          'Accept': 'application/json',
          "Content-Type": "application/json",
          "Authorization" : `Bearer ${token}`
      }),
    }
    
    let newPageUrl = (this.url + '/?' + new URLSearchParams({ page: page }).toString());
    return fetch(newPageUrl, {
      method: 'GET',
      headers: APISettings.headers
    })
      .then((res) => {
        return this._getResponseData(res);
      }); 
  }
}

const shadows = new Shadows({
  url: 'http://localhost:3002',
})

export default shadows;