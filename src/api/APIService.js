export default class APIService {

  static url_prefix = process.env.REACT_APP_API_URL_PREFIX;

  static Verify(token) {
    const api_url = this.url_prefix + 'verify/'
    return fetch(api_url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(""),
    })
    .then((resp => resp.json()))
    .catch((error) => console.log(error));
  }

  static UpdateDate(dateSpecs) {
    const api_url = this.url_prefix + 'updatedate/'
    return fetch(api_url, {
      method: 'PUT',
      headers: {
        'Content-Type': "application/json",
      },
      body: JSON.stringify(dateSpecs),
    })
      .then(resp => resp.json())
  }

  static DeleteDate(id) {
    const api_url = this.url_prefix + 'deletedate/'
    return fetch(api_url, {
      method: 'DELETE',
      headers: {
        'Content-Type': "application/json"
      },
      body: JSON.stringify(id)
    })
      .then(resp => resp.json());

  }
  static GetDates(dateType) {
    const api_url = this.url_prefix + `getdates/${dateType}/`;
    return fetch(api_url, {
      method: ['GET'],
      headers: {
        'Content-Type': 'application/JSON',
      },
    })
      .then(resp => resp.json());
  }

  static UploadDate(dateSpecs) {
    const api_url = this.url_prefix + 'uploaddate/'
    return fetch(api_url, {
      //const result = fetch('/api/uploaddate/', {
      'method': 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(dateSpecs)
    })
      .then(resp => resp.json())
  }
}