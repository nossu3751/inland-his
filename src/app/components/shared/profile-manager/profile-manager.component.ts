import { Component, ElementRef, OnInit, ViewChild, Renderer2, AfterViewInit, ChangeDetectorRef, NgZone} from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ImageCroppedEvent } from 'ngx-image-cropper'
import { switchMap, tap } from 'rxjs';
import { AuthenticateService } from 'src/app/services/auth/authenticate.service';
import { PersonService } from 'src/app/services/data/person.service';
import { ModalService } from 'src/app/services/view/modal.service';
import 'blueimp-canvas-to-blob';
import Cropper from 'cropperjs'

@Component({
  selector: 'app-profile-manager',
  templateUrl: './profile-manager.component.html',
  styleUrls: ['./profile-manager.component.scss']
})
export class ProfileManagerComponent implements OnInit, AfterViewInit{
  @ViewChild('image') imageElement!: ElementRef;
  imageSource: string | null = null
  cropper!: Cropper;

  fileName:string|null = null;
  croppedImage: any = null;
  croppedCanvas: any = null;

  constructor(
    private snackBar:MatSnackBar,
    private personService:PersonService,
    private authenticateService: AuthenticateService,
    private router:Router,
    private modalService:ModalService,
    private renderer: Renderer2,
    private cdr: ChangeDetectorRef,
    private ngZone: NgZone
  ){}

  resizeImage(file: File, maxWidth: number, callback: (resizeImage: Blob) => void): void {
    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target?.result as string;
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        let width = img.width;
        let height = img.height;

        if (width > maxWidth) {
          height = Math.round((maxWidth * height) / width);
          width = maxWidth;
        }

        canvas.width = width;
        canvas.height = height;

        ctx?.drawImage(img, 0, 0, width, height);

        canvas.toBlob((blob)=> {
          if (blob) { 
            callback(blob);
        } else {
            console.error('Failed to create blob from canvas');
        }
        }, file.type)
      }
    }
    reader.readAsDataURL(file);
  }

  onFileChanged(event: any): void {
    const file: File = event.target.files[0];
    if (file) {
        this.resizeImage(file, 300, (resizedImageBlob) => {
            const blobUrl = URL.createObjectURL(resizedImageBlob);
            this.imageSource = blobUrl;
            this.cdr.detectChanges();
            this.renderer.listen(this.imageElement.nativeElement, 'load', () => {
                this.initCropper();
            });
        });
    }
  }


  initCropper() {
    if (this.cropper) {
      this.cropper.destroy();
    }
    this.cropper = new Cropper(this.imageElement.nativeElement, {
      aspectRatio: 1,
      viewMode: 1,
      autoCropArea: 1,
      data : {
       width: 200,
       height: 200
      },
      crop: event => {
       this.croppedCanvas = this.cropper.getCroppedCanvas({
          width: 184,
          fillColor: '#fff',
          imageSmoothingEnabled: true,
          imageSmoothingQuality: 'high'
        });
      }
    })
  }

  isCropError(error:any):boolean {
    return error.error.error !== "ServerError"
  }

  uploadWithQuality(quality: number) {
    if(this.croppedCanvas) {
      this.croppedCanvas.toBlob((blob:Blob) => {
        let formData = new FormData();
        formData.append('image', blob, 'filename.jpg')
        this.personService.uploadProfile(formData).pipe(
          tap(() => {
            this.ngZone.run(()=> {
              this.modalService.closeModal();
              this.snackBar.open("프로필사진이 변경되었습니다. ", "Close", {
                duration: 3000,
                panelClass: ['custom-snackbar'],
                verticalPosition: 'bottom'
              });
            })
            
          }),
          switchMap(() => this.personService.getProfile()),
          tap((data) => this.personService.updateProfileImage(data.data))
        ).subscribe({
          next: () => {},
          error: (error) => {
            if (this.isCropError(error) && quality > 0.3) {
              this.uploadWithQuality(quality - 0.1)
            } else if (this.isCropError(error)) {
              this.snackBar.open("이미지 용량이 너무 큽니다. 선택 영역을 줄이거나 다른 이미지를 선택해주세요.", "Close", {
                duration: 3000,
                panelClass: ['custom-snackbar'],
                verticalPosition: 'bottom'
              });
            } else {
              this.snackBar.open("죄송합니다. 앱 에러가 발생했습니다 ", "Close", {
                duration: 3000,
                panelClass: ['custom-snackbar'],
                verticalPosition: 'bottom'
              });
            }
          }
        });
      }, 'image/jpeg', quality)
    }
  }

  uploadImage() {
    if (this.croppedCanvas == null) {
      this.snackBar.open("이미지를 선택해주세요", "Close", {
        duration: 3000,
        panelClass: ['custom-snackbar'],
        verticalPosition: 'bottom'
      })
    } else {
      this.uploadWithQuality(0.9)
    }
  }

  // uploadImage() {
  //   if(this.croppedImage == null) {
  //     this.snackBar.open("이미지를 선택해주세요", "Close", {
  //       duration: 3000,
  //       panelClass: ['custom-snackbar'],
  //       verticalPosition: 'bottom'
  //     })
  //   }else{
  //     let formData = new FormData();
  //     formData.append('image', this.croppedImage, 'filename.jpg')
  //     console.log(formData)
  //     this.personService.uploadProfile(formData).pipe(
  //       tap(() => {
  //         this.modalService.closeModal();
  //         this.snackBar.open("프로필사진이 변경되었습니다. ", "Close", {
  //           duration: 3000,
  //           panelClass: ['custom-snackbar'],
  //           verticalPosition: 'bottom'
  //         });
  //       }),
  //       switchMap(() => this.personService.getProfile()),
  //       tap((data) => this.personService.updateProfileImage(data.data))
  //     ).subscribe({
  //       next: () => {},
  //       error: () => {
  //         this.snackBar.open("죄송합니다. 앱 에러가 발생했습니다 ", "Close", {
  //           duration: 3000,
  //           panelClass: ['custom-snackbar'],
  //           verticalPosition: 'bottom'
  //         });
  //       }
  //     });
  //   }
    
  // }

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

  ngAfterViewInit(): void {
      
  }
}



