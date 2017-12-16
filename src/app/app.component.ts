import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { TabsPage } from '../pages/tabs/tabs';
import { GenericProvider } from '../providers/generic/generic';
import { RemoteServiceProvider } from '../providers/remote-service/remote-service';
import { HttpResponse } from '@angular/common/http';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any = "LoginPage";

  constructor(platform: Platform, statusBar: StatusBar,
    splashScreen: SplashScreen,
    public remoteService: RemoteServiceProvider,
    public genericService: GenericProvider) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
      this.checkPaymentData();
    });
  }

  checkPaymentData() {
    this.genericService.showLoader("Checking Settings");
    this.remoteService.fetchPaymentStatus()
      .subscribe((response: HttpResponse<any>) => {
        console.log(response);
        let res = response.body;
        if (!res.error) {
          if (res.result.length) {
            this.rootPage = res.result[0].isPaid ? "LoginPage" : "PendingPaymentPage";
          }
        }
      }, error => {
        console.log(error);
        this.genericService.hideLoader();
      }, () => {
        this.genericService.hideLoader();
      })
  }
}
