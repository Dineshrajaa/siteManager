import { Component } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RemoteServiceProvider } from '../../providers/remote-service/remote-service';
import { GenericProvider } from '../../providers/generic/generic';


/**
 * Generated class for the AddProjectPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-add-project',
  templateUrl: 'add-project.html',
})
export class AddProjectPage {
  // Form element
  public addprojectform: FormGroup;

  // Variables
  public engineersList: any;
  public editProjectFlag: boolean = false;
  public projectInfoToBeEdited: any;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public formBuilder: FormBuilder,
    public remoteService: RemoteServiceProvider,
    public genericService: GenericProvider) {
    this.addprojectform = this.formBuilder.group({
      'name': ['', Validators.required],
      'location': ['', Validators.required],
      'engineerInCharge': ''
    });
    this.projectInfoToBeEdited = this.navParams.get('projectInfo');
    if (typeof this.projectInfoToBeEdited != 'undefined') {
      this.editProjectFlag = true;
      this.prefillProjectInfo();
    }
    console.warn(this.navParams.get('projectInfo'));
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddProjectPage');
  }

  ionViewWillEnter() {
    this.listEngineers();
    console.log('ionViewDidLoad EngineersPage');
  }

  prefillProjectInfo() {
    // Method to prefill project info
    let projectInfo = this.projectInfoToBeEdited;
    let engineersList = [];
    projectInfo.engineerInCharge.forEach(engineer => {
      engineersList.push(engineer._id);
    });
    this.addprojectform.patchValue({
      name: projectInfo.name,
      location: projectInfo.location,
      engineerInCharge: engineersList
    })
  }

  updateProject() {
    // Method to update
    let projectId = this.projectInfoToBeEdited._id;
    this.genericService.showLoader('Updating Project');
    let projectInfo = this.addprojectform.value;
    this.remoteService.updateProject(projectId, projectInfo)
      .subscribe((response: HttpResponse<any>) => {
        let res = response.body;
        if (!res.error) {
          this.genericService.showToast('Updated Project');
          this.navCtrl.pop(); // go back to engineers list
        } else {
          this.genericService.showToast('Unable to update Project');
        }
        this.genericService.hideLoader();
      }, error => {
        this.genericService.showToast('Something has gone wrong');
        this.genericService.hideLoader();
      })
  }
  listEngineers() {
    // Method to list projects
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

  addProject() {
    console.warn('Engineer form:', this.addprojectform.value);
    this.genericService.showLoader('Saving Project');
    let projectInfo = this.addprojectform.value;
    if (projectInfo.engineerInCharge == '')
      delete projectInfo['engineerInCharge'];
    this.remoteService.registerProject(projectInfo)
      .subscribe((response: HttpResponse<any>) => {
        let res = response.body;
        if (!res.error) {
          this.genericService.showToast('Added Project');
          this.navCtrl.pop(); // go back to engineers list
        } else {
          this.genericService.showToast('Unable to add Project');
        }
        this.genericService.hideLoader();
      }, error => {
        this.genericService.showToast('Something has gone wrong');
        this.genericService.hideLoader();
      })
  }
}
