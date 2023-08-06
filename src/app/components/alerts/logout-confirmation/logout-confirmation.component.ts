import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/auth/login.service';
import { ModalService } from 'src/app/services/view/modal.service';

@Component({
  selector: 'app-logout-confirmation',
  templateUrl: './logout-confirmation.component.html',
  styleUrls: ['./logout-confirmation.component.scss']
})
export class LogoutConfirmationComponent {
  constructor(
    public modalService:ModalService, 
    private loginService:LoginService,
    private router:Router,
    private snackBar:MatSnackBar){}

  logout() {
    this.loginService.logout().subscribe({
      next:(data)=>{
        this.modalService.closeAlertModal()
        this.router.navigateByUrl("/");

        this.snackBar.open("로그아웃 되었습니다. ", "Close", {
          duration: 3000,
          panelClass: ['custom-snackbar'],
          verticalPosition: 'bottom'
        })
      },
      error:(error)=>{

      }
    })
  }
}
