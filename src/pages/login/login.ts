import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RemoteServiceProvider } from '../../providers/remote-service/remote-service';
import { TabsPage } from '../tabs/tabs';
import { HttpResponse } from '@angular/common/http';
import { GenericProvider } from '../../providers/generic/generic';
/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  // Routing variables
  public tabsPage: any = TabsPage;
  public engineerHome: any = "EngineerHomePage";

  // Class variables
  public loginData: any = {
    mobile: '9942734970',
    pin: '9375'
  };
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public remoteService: RemoteServiceProvider,
    public genericService: GenericProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  login() {
    /* Method to login with SM */
    this.genericService.showLoader('Signing In');
    this.remoteService.signIntoSM(this.loginData)
      .subscribe((response: HttpResponse<any>) => {
        let res = response.body;
        console.log("POST data:", res.error);
        if (!res.error) {
          // Login successful
          this.genericService.saveItem('accessToken', res.token)
            .then((savedToken) => {
              this.genericService.showToast(res.message);
            },
            error => console.error('Error storing item', error))
        } else {
          this.genericService.showToast(res.message);
        }
      }, error => {
        console.log("Login Error:", error);
      }, () => {
        this.genericService.hideLoader();
      })
  }

}
