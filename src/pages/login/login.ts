import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RemoteServiceProvider } from '../../providers/remote-service/remote-service';
import { TabsPage } from '../tabs/tabs';
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
    mobile: '',
    pin: ''
  };
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public remoteService: RemoteServiceProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  login() {
    /* Method to login with SM */
    this.remoteService.signIntoSM(this.loginData)
      .subscribe(loginSuccess => {
        console.warn('Login Success:', loginSuccess.body);
        let response = loginSuccess.body;
        // if(response.er)

      })
  }

}
