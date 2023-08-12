import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ImageCroppedEvent } from 'ngx-image-cropper'
import { switchMap, tap } from 'rxjs';
import { AuthenticateService } from 'src/app/services/auth/authenticate.service';
import { PersonService } from 'src/app/services/data/person.service';
import { ModalService } from 'src/app/services/view/modal.service';
import 'blueimp-canvas-to-blob';


@Component({
  selector: 'app-profile-manager',
  templateUrl: './profile-manager.component.html',
  styleUrls: ['./profile-manager.component.scss']
})
export class ProfileManagerComponent implements OnInit{
  fileName:string|null = null;
  imageChangedEvent: any = '';
  croppedImage: any = null;
  imageLoadedFlag : boolean = false;

  constructor(
    private snackBar:MatSnackBar,
    private personService:PersonService,
    private authenticateService: AuthenticateService,
    private router:Router,
    private modalService:ModalService
  ){}

  private getFileName(event:any): string|null{
    const file:File = event.target.files[0]
    if(file) {
      return file.name
    }
    return null
  }

  onFileChanged(event: any): void {
    this.imageChangedEvent = event;
    this.fileName = this.getFileName(event);
  }

  onImageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.blob
  }

  onImageLoaded() {
    this.imageLoadedFlag = true;
  }

  onCropperReady() {
    // cropper is ready
  }

  onLoadImageFailed() {
    this.snackBar.open("잘못된 이미지 파일입니다", "Close", {
      duration: 3000,
      panelClass: ['custom-snackbar'],
      verticalPosition: 'bottom'
    })
  }

  uploadImage() {
    if (!this.imageLoadedFlag) {
      this.snackBar.open("이미지가 아직 로드되지 않았습니다. 잠시 기다려주세요.", "Close", {
        duration: 3000,
        panelClass: ['custom-snackbar'],
        verticalPosition: 'bottom'
      });
      return;
    }
    if(this.croppedImage == null) {
      this.snackBar.open("이미지를 선택해주세요", "Close", {
        duration: 3000,
        panelClass: ['custom-snackbar'],
        verticalPosition: 'bottom'
      })
    }else{
      let formData = new FormData();
      formData.append('image', this.croppedImage, 'filename.jpg')
      console.log(formData)
      this.personService.uploadProfile(formData).pipe(
        tap(() => {
          this.modalService.closeModal();
          this.snackBar.open("프로필사진이 변경되었습니다. ", "Close", {
            duration: 3000,
            panelClass: ['custom-snackbar'],
            verticalPosition: 'bottom'
          });
        }),
        switchMap(() => this.personService.getProfile()),
        tap((data) => this.personService.updateProfileImage(data.data))
      ).subscribe({
        next: () => {},
        error: () => {
          this.snackBar.open("죄송합니다. 앱 에러가 발생했습니다 ", "Close", {
            duration: 3000,
            panelClass: ['custom-snackbar'],
            verticalPosition: 'bottom'
          });
        }
      });
    }
    
  }

  ngOnInit(): void {
    this.authenticateService.authenticate().subscribe({
      error: (error) => {
        console.log(error)
        this.router.navigateByUrl("/login")
          this.snackBar.open("로그인이 필요한 기능입니다. ", "Close", {
            duration: 3000,
            panelClass: ['custom-snackbar'],
            verticalPosition: 'bottom'
          })
      }
    })
  }
}



