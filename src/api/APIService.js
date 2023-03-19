import PostSpecs from '../assets/PostSpecs';
export default class APIService {
  static url_prefix = process.env.REACT_APP_API_URL_PREFIX;

  /** 
   * Generates a fetch object to be passed as the second parameter of the fetch function.
   * To reduce amount of code in this API service
   * @param {String} method the HTTP method being called
   * @param {JWT} jwt The user token
   * @param {String Optional} body the body of the request
   * @returns a fetch built from params
   */
  static fetchOptions(method, jwt, body = "") {
    return {
      method: method,
      headers: {
        'Content-Type': "application/json",
        'Authorization': jwt,
      },
      body: (body === "" ? null : JSON.stringify(body)),
    };
  }

  /**
   * Get a User's Private Feed (All their posts)
   * @param {JWT} jwt for verification
   * @returns a list of Date objects
   * TODO: consider adding a server side "time uploaded"
   */
  static async GetUserPosts(jwt) {
    const api_url = this.url_prefix + 'get_posts/';
    const options = this.fetchOptions('GET', jwt);

    const result = await fetch(api_url, options);
    const post_obj_arr = await result.json();

    const postSpecs = post_obj_arr.map((post_obj) => PostSpecs.fromObject(post_obj));
    return postSpecs;
  }

  /**
   * Upload a new post for the user associated with the token
   * @param {PostSpecs} postSpecs
   * @param {JWT} jwt the encoded web token used for auth
   * @returs successful ? ok : null
   */
  static async UploadPost(postSpecs, jwt) {
    const post_obj = postSpecs.getJSON()
    const api_url = this.url_prefix + "upload_post/";
    const options = this.fetchOptions('PUT', jwt, postSpecs);

    const result = await fetch(api_url, options);
    const response = await result.json();
    console.log("response: " + response)
    return response;
  }

  /**
   * Updates an existing date with new information
   * @param {PostSpecs} postSpecs
   * @param {JWT} jwt
   * TODO: 
   *      - eventually i'll need to update this to index the database by post ID, 
   *        since we won't want to enforce unique titles later on
   *      - or maybe figure out how to use existing post ID and merge it with the new data...
   */
  static async UpdatePost(postSpecs, jwt) {
    console.log('send me');
    console.log(postSpecs);
    post_obj = postSpecs.getJSON();
    const api_url = this.url_prefix + "update_post/"
    const options = this.fetchOptions('PUT', jwt, postSpecs);

    const result = await fetch(api_url, options);
    const response = await result.json();
    console.log("response: " + response)
    return response;
  }

  /**
   * Delete a user's date by id
   * @param {?} id 
   * @param {JWT} jwt
   */
  static async DeletePost(id, jwt) {
    const api_url = this.url_prefix + 'delete_post/'
    const options = this.fetchOptions('DELETE', jwt, id);

    const result = await fetch(api_url, options);
    const response = await result.json();
    console.log("response: " + response)
    return response;
  }
}