import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController } from 'ionic-angular';

import { Camera, CameraOptions } from '@ionic-native/camera';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';
import { GenericProvider } from '../../providers/generic/generic';
import { RemoteServiceProvider } from '../../providers/remote-service/remote-service';
import { HttpResponse } from '@angular/common/http';
import * as moment from 'moment';

/**
 * Generated class for the CommentsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-comments',
  templateUrl: 'comments.html',
  providers: [Camera,
    FileTransfer,
    File]
})
export class CommentsPage {
  Cloudinary = {
    PRESET: 'h3h7rsmi',
    API_URL: 'https://api.cloudinary.com/v1_1/dv7mdii4w/image/upload'
  };
  fileTransfer: FileTransferObject = this.transfer.create();
  selectedProject: any;
  commentsList: any;

  @ViewChild('commentBox') commentBox;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public actionSheetCtrl: ActionSheetController,
    public camera: Camera,
    public transfer: FileTransfer,
    public file: File,
    public genericService: GenericProvider,
    public remoteService: RemoteServiceProvider) {
    this.selectedProject = this.navParams.data;
    console.warn('Nav param is:', this.navParams.data);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CommentsPage');
    this.listComments();
  }

  presentActionSheet() {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Upload Picture',
      buttons: [

        {
          text: 'Camera',
          handler: () => {
            console.log('Archive clicked');
            this.openCameraOrGallery(this.camera.PictureSourceType.CAMERA);
          }
        },
        {
          text: 'Gallery',
          handler: () => {
            console.log('Gallery clicked');
            this.openCameraOrGallery(this.camera.PictureSourceType.PHOTOLIBRARY);
          }
        },
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    actionSheet.present();
  }

  openCameraOrGallery(sourceType) {
    const options: CameraOptions = {
      quality: 100,
      sourceType: sourceType,
      destinationType: this.camera.DestinationType.NATIVE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    };

    this.camera.getPicture(options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64:
      let base64Image = 'data:image/jpeg;base64,' + imageData;
      this.uploadToCloudinary(imageData);
    }, (err) => {
      // Handle error
    });
  }

  uploadToCloudinary(imageToUpload) {
    let options: FileUploadOptions = {
      params: { 'upload_preset': this.Cloudinary.PRESET }
    };

    this.genericService.showLoader('Uploading Picture');
    this.fileTransfer.upload(imageToUpload, this.Cloudinary.API_URL, options)
      .then((data) => {
        // success
        let response = JSON.parse(decodeURIComponent(data.response));
        console.warn(response.secure_url);
        this.postPicture(response.secure_url);
      }, (err) => {
        // error
        console.warn('err:', err);
        this.genericService.hideLoader();
      })
  }

  postPicture(pictureURL) {
    // Method to post picture comment
    let commentData = {
      projectID: this.selectedProject._id,
      commentType: "Picture",
      commentPicture: pictureURL,
      commentedBy: this.genericService.getUserID()
    };
    this.saveComment(commentData);
  }

  postText(text) {
    // Method to post text comment
    let commentData = {
      projectID: this.selectedProject._id,
      commentType: "Text",
      commentText: text,
      commentedBy: this.genericService.getUserID()
    };
    this.saveComment(commentData);
  }

  saveComment(commentBody) {
    // Method to save comment in the server
    this.remoteService.registerComment(commentBody)
      .subscribe((response: HttpResponse<any>) => {
        let res = response.body;
        console.warn('Res:', res);
        this.commentBox.value = ''; // clear input field
        this.listComments();
      }, error => {
        console.log("Comment Error:", error);
        this.genericService.hideLoader();
      }, () => {
        this.genericService.hideLoader();
      })
  }

  listComments() {
    // Method to list comments for this project
    this.remoteService.fetchComments(this.selectedProject._id)
      .subscribe((response: HttpResponse<any>) => {
        let res = response.body;
        if (!res.error) {
          this.commentsList = res.result;
          this.commentsList.forEach((comment) => {
            let commentedDate = comment.commentedDate;
            comment.commentedDate = moment(commentedDate).fromNow();
          })
        }
      }, error => {
        console.log("Comment Error:", error);
        this.genericService.hideLoader();
      }, () => {
        this.genericService.hideLoader();
      })
  }
}
