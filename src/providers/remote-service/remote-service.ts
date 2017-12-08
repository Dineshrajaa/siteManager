import { HttpClient } from '@angular/common/http';
import { Injectable, Inject } from '@angular/core';
import { APP_CONFIG } from '../../app/app.config';
import 'rxjs/add/operator/map';
/*
  Generated class for the RemoteServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class RemoteServiceProvider {
  BASE_URL = "http://192.168.1.108:3000/api/v1/";
  constructor(public http: HttpClient) {
    console.log('Hello RemoteServiceProvider Provider');
  }

  signIntoSM(signupData) {
    /* Service to login with SM */
    return this.http.post(this.BASE_URL + 'login', signupData, { observe: 'response' })
    // .map((res: Response) => res.json())
  }

  registerEngineer(engineerData) {
    /* Service to register an engineer */
    return this.http.post(this.BASE_URL + 'adduser', engineerData, { observe: 'response' })
  }

  registerProject(projectData) {
    /* Service to register a project */
    return this.http.post(this.BASE_URL + 'addProject', projectData, { observe: 'response' })
  }

  registerComment(commentData) {
    /* Service to register an engineer */
    return this.http.post(this.BASE_URL + 'addComment', commentData, { observe: 'response' })
  }

  fetchEngineers() {
    /* Service to get the list of engineers */
    return this.http.get(this.BASE_URL + 'listAllEngineers', { observe: 'response' })
  }

  fetchProjects() {
    /* Service to get the list of projects */
    return this.http.get(this.BASE_URL + 'listAllProjects', { observe: 'response' })
  }

  fetchComments(projectID) {
    /* Service to get the list of comments */
    return this.http.get(this.BASE_URL + 'getComments/' + projectID, { observe: 'response' })
  }
}
