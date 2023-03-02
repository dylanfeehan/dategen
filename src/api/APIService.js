
export default class APIService {

  static UpdateDate(dateSpecs) {
    return fetch('http://localhost:3000/api/updatedate/', {
      method: 'PUT',
      headers: {
        'Content-Type': "application/json",
      },
      body: JSON.stringify(dateSpecs),
    })
    .then(resp => resp.json())
  }

  static DeleteDate(id) {
    return fetch('http://localhost:3000/api/deletedate/', {
      method: 'DELETE',
      headers: {
        'Content-Type': "application/json"
      },
      body: JSON.stringify(id)
    })
    .then(resp => resp.json());
    
  }
  static GetDates(dateType) {
    const api_url = `http://localhost:3000/api/getdates/${dateType}/`;
    return fetch(api_url, {
      method: ['GET'],
      headers: {
        'Content-Type': 'application/JSON',
      },
    })
    .then(resp => resp.json());
  }

  static UploadDate(dateSpecs) {
    const result = fetch('http://localhost:3000/api/uploaddate/', {
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