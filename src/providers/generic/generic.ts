import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoadingController, ToastController } from 'ionic-angular';
import { NativeStorage } from '@ionic-native/native-storage';
import { JwtHelper } from 'angular2-jwt';
/*
  Generated class for the GenericProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class GenericProvider {
  public static loader: any;
  public static toast: any;
  constructor(public http: HttpClient,
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController,
    public nativeStorage: NativeStorage,
    public jwtHelper: JwtHelper) {
    console.log('Hello GenericProvider Provider');
  }

  showLoader(msg?) {
    // Show loader when needed
    GenericProvider.loader = this.loadingCtrl.create({
      content: msg ? msg : 'Please wait...',
      spinner: 'dots'
    });
    GenericProvider.loader.present();
  }

  hideLoader() {
    // Hide loader when not needed
    GenericProvider.loader.dismiss();
  }

  showToast(msg) {
    // Show toast msg
    GenericProvider.toast = this.toastCtrl.create({
      message: msg,
      duration: 3000
    });
    GenericProvider.toast.present();
  }

  saveItem(key, value) {
    return this.nativeStorage.setItem(key, value)
  }

  getSavedItem(key) {
    return this.nativeStorage.getItem(key)
  }

  getJWTToken() {
    return localStorage.getItem('accessToken')
  }

  getHttpHeader() {
    let headers = new HttpHeaders().set('Authorization', `Bearer ${this.getJWTToken()}`);
    console.warn('this.getJWTToken():', this.getJWTToken());
    return headers;
  }

  getUserID() {
    let parsedToken = this.jwtHelper.decodeToken(this.getJWTToken());
    return parsedToken.id;
  }

}
