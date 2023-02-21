
export default class APIService {

  static UpdateDate(dateSpecs) {
    //console.log("from within update date");
    //console.log(dateSpecs);
    //return null;
    return fetch('http://127.0.0.1:5000/updatedate/', {
      method: 'PUT',
      headers: {
        'Content-Type': "application/json",
      },
      body: JSON.stringify(dateSpecs),
    })
    .then(resp => resp.json())
  }

  static DeleteDate(id) {
    return fetch('http://127.0.0.1:5000/deletedate/', {
      method: 'DELETE',
      headers: {
        'Content-Type': "application/json"
      },
      body: JSON.stringify(id)
    })
    .then(resp => resp.json());
    
  }

  static UploadDate(dateSpecs) {

    return fetch('http://127.0.0.1:5000/uploaddate/', {
      'method': 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(dateSpecs)
    })
    .then(resp =>resp.json())
  }
}