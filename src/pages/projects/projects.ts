import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { GenericProvider } from '../../providers/generic/generic';
import { RemoteServiceProvider } from '../../providers/remote-service/remote-service';
import { HttpResponse } from '@angular/common/http';
/**
 * Generated class for the ProjectsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-projects',
  templateUrl: 'projects.html',
})
export class ProjectsPage {
  // Route Variables
  public addProjectPage: any = "AddProjectPage";
  public commentsPage: any = "CommentsPage";
  public projectsList: any;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public remoteService: RemoteServiceProvider,
    public genericService: GenericProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProjectsPage');
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

  editProject(projectToEdit) {
    // Method to edit project
    console.warn('projectToEdit:', projectToEdit);
    this.navCtrl.push("AddProjectPage", { 'projectInfo': projectToEdit });
  }

}
