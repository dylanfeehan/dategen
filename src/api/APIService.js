export default class APIService {

  static url_prefix = process.env.REACT_APP_API_URL_PREFIX;

  // use environment variables to multiplex this!

  static UpdateDate(dateSpecs) {
    //return fetch('/api/updatedate/', {
    //return fetch('https://api.dategen.fun/updatedate/', {
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
    //return fetch('/api/deletedate/', {
    //return fetch('https://api.dategen.fun/deletedate/', {
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
    //const api_url = `/api/getdates/${dateType}/`;
    //const api_url = `https://api.dategen.fun/getdates/${dateType}/`;
    console.log(this.url_prefix);
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
    const result = fetch(api_url, {
      //const result = fetch('/api/uploaddate/', {
      'method': 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(dateSpecs)
    })
      .then(resp => resp.json())
    return result;
  }
}