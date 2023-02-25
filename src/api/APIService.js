
export default class APIService {

  static UpdateDate(dateSpecs) {
    //console.log("from within update date");
    //console.log(dateSpecs);
    //return null;
    return fetch('http://127.0.0.1:5000/api/updatedate/', {
      method: 'PUT',
      headers: {
        'Content-Type': "application/json",
      },
      body: JSON.stringify(dateSpecs),
    })
    .then(resp => resp.json())
  }

  static DeleteDate(id) {
    return fetch('http://127.0.0.1:5000/api/deletedate/', {
      method: 'DELETE',
      headers: {
        'Content-Type': "application/json"
      },
      body: JSON.stringify(id)
    })
    .then(resp => resp.json());
    
  }

  static UploadDate(dateSpecs) {

    return fetch('http://127.0.0.1:5000/api/uploaddate/', {
      'method': 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(dateSpecs)
    })
    .then(resp =>resp.json())
  }
}