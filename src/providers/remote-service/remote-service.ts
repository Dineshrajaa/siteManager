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

}
