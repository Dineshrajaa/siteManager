import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

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
  public mobile: any;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  login() {
    if (this.mobile == '9942734970') {
      this.navCtrl.push(TabsPage)
    } else this.navCtrl.push("EngineerHomePage");
  }

}
