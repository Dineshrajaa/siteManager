import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RemoteServiceProvider } from '../../providers/remote-service/remote-service';
import { GenericProvider } from '../../providers/generic/generic';

/**
 * Generated class for the AddEngineerPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-add-engineer',
  templateUrl: 'add-engineer.html'
})

export class AddEngineerPage {
  // Variables
  public projectsList: any;
  public userTypeList: any = ["Admin", "Engineer"];
  public addengineerform: FormGroup;
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public formBuilder: FormBuilder,
    public remoteService: RemoteServiceProvider,
    public genericService: GenericProvider) {
    this.addengineerform = this.formBuilder.group({
      'name.first': ['', Validators.required],
      'name.last': '',
      'mobile': ['', Validators.compose([Validators.required, Validators.minLength(10), Validators.maxLength(10)])],
      'pin': ['', Validators.compose([Validators.required, Validators.minLength(4)])],
      'userType': ['', Validators.required],
      'project': ''
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddEngineerPage');
  }
  ionViewWillEnter() {
    this.listProjects();
    console.log('ionViewDidLoad EngineersPage');
  }
  listProjects() {
    // Method to list projects
    this.genericService.showLoader("Fetching Projects");
    this.remoteService.fetchProjects()
      .subscribe((response: HttpResponse<any>) => {
        console.log(response);
        let res = response.body;
        if (!res.error) {
          this.projectsList = res.result; // get the list of projects
        }
      }, error => {
        console.log(error);
        this.genericService.hideLoader();
      }, () => {
        this.genericService.hideLoader();
      })
  }

  addUser() {
    console.warn('Engineer form:', this.addengineerform.value);
    this.genericService.showLoader('Saving User');
    let engineerInfo = this.addengineerform.value;
    if (engineerInfo.project == '')
      delete engineerInfo['project'];
    this.remoteService.registerEngineer(engineerInfo)
      .subscribe((response: HttpResponse<any>) => {
        let res = response.body;
        if (!res.error) {
          this.genericService.showToast('Added Engineer');
          this.navCtrl.pop(); // go back to engineers list
        } else {
          this.genericService.showToast('Unable to add Engineer');
        }
        this.genericService.hideLoader();
      }, error => {
        this.genericService.showToast('Something has gone wrong');
        this.genericService.hideLoader();
      })
  }
}
