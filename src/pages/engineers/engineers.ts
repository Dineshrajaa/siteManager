import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { GenericProvider } from '../../providers/generic/generic';
import { RemoteServiceProvider } from '../../providers/remote-service/remote-service';
import { HttpResponse } from '@angular/common/http';

import { CallNumber } from '@ionic-native/call-number';


/**
 * Generated class for the EngineersPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-engineers',
  templateUrl: 'engineers.html',
  providers: [CallNumber]
})
export class EngineersPage {
  // Route Variables
  public addEngineerPage: any = "AddEngineerPage";

  // Class variables
  public engineersList: any = [];
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public remoteService: RemoteServiceProvider,
    public genericService: GenericProvider,
    public call: CallNumber) {
  }

  ionViewWillEnter() {
    this.listEngineers();
    console.log('ionViewDidLoad EngineersPage');
  }

  listEngineers() {
    // Method to list engineers
    this.genericService.showLoader("Fetching Engineers");
    this.remoteService.fetchEngineers()
      .subscribe((response: HttpResponse<any>) => {
        console.log(response);
        let res = response.body;
        if (!res.error) {
          this.engineersList = res.result; // get the list of projects
        }
      }, error => {
        console.log(error);
        this.genericService.hideLoader();
      }, () => {
        this.genericService.hideLoader();
      })
  }

  callNumber(mobileNumber) {
    this.call.callNumber(mobileNumber, false)
      .then(() => console.log('Launched dialer!'))
      .catch(() => console.log('Error launching dialer'));
  }
}
