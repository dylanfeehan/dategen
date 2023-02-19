
export default class APIService {

  static UpdateDate(id, dateSpecs) {


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