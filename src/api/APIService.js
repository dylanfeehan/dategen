
export default class APIService {

  static UpdateDate(dateSpecs) {
    console.log("from within update date");
    console.log(dateSpecs);
    return null;
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