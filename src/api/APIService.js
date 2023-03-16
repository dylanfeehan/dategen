
export default class APIService {

  static url_prefix = process.env.REACT_APP_API_URL_PREFIX;

  /**
   * 
   * @param {JWT} token for verification
   * @param {Date} params to send to server
   * @returns 
   */
  static APICall(token, params) {
    const api_url = this.url_prefix + 'requestRoute/';
    return fetch(api_url, {
      method: 'METHOD',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': token,
      },
      body: JSON.stringify(params)
    })
      .catch((error) => console.log(error))
      // worth testing this out, in case the format of returned data is wrong
      // .then((resp) => resp.json())
  }

  static Verify(token) {
    const api_url = this.url_prefix + 'verify/'
    return fetch(api_url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': token
      },
      body: JSON.stringify(""),
    })
      .catch((error) => console.log(error))
  }


  /**
   * Get a User's Private Feed (All their posts)
   * @param {JWT} token for verification
   * @returns a list of Date objects
   */
  static GetDatesProtected(token) {
    const api_url = this.url_prefix + 'get_dates/';
    return fetch(api_url, {
      method: 'GET',
      headers: {
        'Content-Type': "application/json",
        'Authorization': token
      },
    }).then(resp => resp.json())
      .catch((error) => console.log(error))
  }


  static SubmitDate(datespecs, token) {
    const api_url = this.url_prefix + 'upload_date/';
    return fetch(api_url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': token
      },
      body: JSON.stringify(datespecs)
    })
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
  }

  static UploadDate(dateSpecs) {
    const api_url = this.url_prefix + 'uploaddate/'
    return fetch(api_url, {
      'method': 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(dateSpecs)
    })
      .then(resp => resp.json())
  }
}