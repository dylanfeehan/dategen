
export default class APIService {

  static UpdateDate(dateSpecs) {
    //console.log("from within update date");
    //console.log(dateSpecs);
    //return null;
    //return fetch('http://127.0.0.1:5000/api/updatedate/', {
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
    //return fetch('http://127.0.0.1:5000/api/deletedate/', {
    // might need to add environment variables in here for debugging lol
    // resolves to nginx, which routes to api/5000 !
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
    //return fetch('http://127.0.0.1:5000http://localhost:3000/api/uploaddate/', {
    const result = fetch('http://localhost:3000/api/uploaddate/', {
      'method': 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(dateSpecs)
    })
    .then(resp =>resp.json())
    return result;
  }
}