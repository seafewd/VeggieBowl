import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

/**
 * Web request service
 */

export class WebRequestService {

  readonly ROOT_URL;

  constructor(private http: HttpClient) {
    this.ROOT_URL = 'http://localhost:3000';
  }

  /**
   * Get request
   * @param uri 
   * @returns 
   */
  get(uri: string) {
    return this.http.get(`${this.ROOT_URL}/${uri}`);
  }
  
  /**
   * POST request
   * @param uri 
   * @param payload 
   * @returns 
   */
  post(uri: string, payload: Object) {
    return this.http.post(`${this.ROOT_URL}/${uri}`, payload);
  }

  /**
   * PATCH request
   * @param uri 
   * @param payload 
   * @returns 
   */
  patch(uri: string, payload: Object) {
    return this.http.patch(`${this.ROOT_URL}/${uri}`, payload);
  }

  /**
   * DELETE request
   * @param uri 
   * @returns 
   */
  delete(uri: string) {
    return this.http.delete(`${this.ROOT_URL}/${uri}`).subscribe((res) => {
      console.log(res);
    })
  }


  /** authentication */

  login(email: string, password: string) {
    return this.http.post(`${this.ROOT_URL}/users/login`, {
      email,
      password
    }, {
      observe: 'response'
    });
  }

  signup(email: string, password: string) {
    return this.http.post(`${this.ROOT_URL}/users`, {
      email,
      password
    }, {
      observe: 'response'
    });
  }
 



}
