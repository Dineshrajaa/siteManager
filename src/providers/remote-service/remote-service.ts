import { HttpClient } from '@angular/common/http';
import { Injectable, Inject } from '@angular/core';
import { APP_CONFIG } from '../../app/app.config';
import { GenericProvider } from '../generic/generic';
import 'rxjs/add/operator/map';
/*
  Generated class for the RemoteServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class RemoteServiceProvider {
  // BASE_URL = "http://192.168.1.112:3000/api/v1/";
  BASE_URL = "https://secure-plateau-42725.herokuapp.com/api/v1/";
  constructor(public http: HttpClient,
    public genericService: GenericProvider) {
    console.log('Hello RemoteServiceProvider Provider');
  }

  signIntoSM(signupData) {
    /* Service to login with SM */
    return this.http.post(this.BASE_URL + 'login', signupData, { observe: 'response' })
    // .map((res: Response) => res.json())
  }

  registerEngineer(engineerData) {
    /* Service to register an engineer */
    let headers = this.genericService.getHttpHeader();
    return this.http.post(this.BASE_URL + 'adduser', engineerData, { observe: 'response', headers: headers })
  }

  registerProject(projectData) {
    /* Service to register a project */
    let headers = this.genericService.getHttpHeader();
    return this.http.post(this.BASE_URL + 'addProject', projectData, { observe: 'response', headers: headers })
  }

  updateProject(projectId, projectData) {
    /* Service to update a project */
    let headers = this.genericService.getHttpHeader();
    return this.http.put(this.BASE_URL + 'updateProject/' + projectId, projectData, { observe: 'response', headers: headers })
  }

  registerComment(commentData) {
    /* Service to register an engineer */
    return this.http.post(this.BASE_URL + 'addComment', commentData, { observe: 'response' })
  }

  fetchEngineers() {
    /* Service to get the list of engineers */
    let headers = this.genericService.getHttpHeader();
    return this.http.get(this.BASE_URL + 'listAllEngineers', { observe: 'response', headers: headers })
  }

  fetchProjects() {
    /* Service to get the list of projects */
    let headers = this.genericService.getHttpHeader();
    console.warn('headers:', headers);
    return this.http.get(this.BASE_URL + 'listAllProjects', { observe: 'response', headers: headers })
  }

  fetchComments(projectID) {
    /* Service to get the list of comments */
    return this.http.get(this.BASE_URL + 'getComments/' + projectID, { observe: 'response' })
  }

  fetchMyProjects(engineerID) {
    /* Service to get the list of projects of a specific user */
    return this.http.get(this.BASE_URL + 'listMyProjects/' + engineerID, { observe: 'response' })
  }

  fetchPaymentStatus() {
    /* Service to get the payment status */
    return this.http.get(this.BASE_URL + 'getpaymentstatus/', { observe: 'response' })
  }
}
