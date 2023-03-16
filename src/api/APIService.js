
export default class APIService {

  static url_prefix = process.env.REACT_APP_API_URL_PREFIX;

  /**
   * 
   * @param {JWT} token for verification
   * @param {PostSpecs} postSpecs instance to send to server
   * @returns result from the api as a JSON object, or a list of them
   */
  static APICall(token, postSpecs) {
    const api_url = this.url_prefix + 'requestRoute/';
    const post_obj = postSpecs.getJSON();

    if(post_obj === null) {
      console.error('There are non null fields in the PostSpecs instance')
    }

    return fetch(api_url, {
      method: 'METHOD',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': token,
      },
      body: JSON.stringify(post_obj)
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
    const api_url = this.url_prefix + 'get_posts/';
    return fetch(api_url, {
      method: 'GET',
      headers: {
        'Content-Type': "application/json",
        'Authorization': token
      },
    }).then(resp => resp.json())
      .catch((error) => console.log(error))
  }


  /**
   * Post a new Post to the server
   * @param {PostSpecs} postSpecs the PostSpecs class instance to be sent to the server
   * @param {JWT} jwt the serialized web token used for auth
   * @returns success codes idk
   */
  static SubmitDate(postSpecs, jwt) {
    const post_obj = postSpecs.getJSON();
    if(post_obj === null) {
      console.error('postspecs had one or more null fields');
      return;
    }

    const api_url = this.url_prefix + 'upload_post/';
    return fetch(api_url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': jwt
      },
      body: JSON.stringify(post_obj),
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