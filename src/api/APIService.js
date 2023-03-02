
export default class APIService {

  static UpdateDate(dateSpecs) {
    return fetch('/api/updatedate/', {
      method: 'PUT',
      headers: {
        'Content-Type': "application/json",
      },
      body: JSON.stringify(dateSpecs),
    })
    .then(resp => resp.json())
  }

  static DeleteDate(id) {
    return fetch('/api/deletedate/', {
      method: 'DELETE',
      headers: {
        'Content-Type': "application/json"
      },
      body: JSON.stringify(id)
    })
    .then(resp => resp.json());
    
  }
  static GetDates(dateType) {
    const api_url = `/api/getdates/${dateType}/`;
    return fetch(api_url, {
      method: ['GET'],
      headers: {
        'Content-Type': 'application/JSON',
      },
    })
    .then(resp => resp.json());
  }

  static UploadDate(dateSpecs) {
    const result = fetch('/api/uploaddate/', {
      'method': 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(dateSpecs)
    })
    .then(resp =>resp.json())
    return result;
  }
}