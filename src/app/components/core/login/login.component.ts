import { animate, style, transition, trigger } from '@angular/animations';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from 'src/app/services/auth/login.service';
import { interval, Subscription, map } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthenticateService } from 'src/app/services/auth/authenticate.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  animations:[
    trigger('fadeInOut', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('{{time}}', style({ opacity: 1 })),
      ]),
      transition(':leave', [
        animate('{{time}}', style({ opacity: 0 })),
      ]),
    ]),
  ]
})

export class LoginComponent implements OnDestroy, OnInit {
  authChecked:boolean = false;
  authenticated:boolean = false;
  form: FormGroup;
  showPhoneAndNameField = true;
  showVerificationField = false;
  fieldSwitching = false;
  private countdownSubscription!:Subscription;
  code:string = "";
  countdown!:string|null;
  requestSent: boolean = false;
  
  constructor(
    private fb: FormBuilder, 
    private loginService:LoginService,
    private snackBar:MatSnackBar,
    private authenticateService: AuthenticateService,
    private router:Router){
    this.form = this.fb.group({
      name: ['', Validators.required],
      phone: ['', [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]],
    });
    this.form.get("phone")?.valueChanges.subscribe(value => {
      // remove all non-digit characters
      let numbers = value.replace(/\D/g, '');
      numbers = numbers.slice(0, 10);
      // only update the value if it has changed
      if (numbers !== value) {
        this.form.get("phone")?.setValue(numbers, { emitEvent: false });
      }
    });
    this.form.get("name")?.valueChanges.subscribe(value => {
      // remove all non-digit characters
      let chars = value.replace(/\s/g, '');
      
      // only update the value if it has changed
      if (chars !== value) {
        this.form.get("name")?.setValue(chars, { emitEvent: false });
      }
    });
  }



  requestVerification(first:boolean) {
    if (first === false) {
      this.countdownSubscription.unsubscribe();
      this.countdown = null;
    }
    this.requestSent = true;
    const formValue = {...this.form.value};
    const body = {
      phoneNumber: formValue.phone,
      name: formValue.name
    }

    this.loginService.request_verification(body).subscribe({
      next: (data)=> {
        console.log(data)
        this.startCountdown()
        if (first === true) {
          this.toggleVisibleFields()
        } else {
          this.snackBar.open("인증번호가 재요청 되었습니다.", "Close", {
            duration: 3000,
            panelClass: ['custom-snackbar'],
            verticalPosition: 'bottom'
          })
        }
        this.requestSent = false;
        
      },
      error: (error)=> {
        let errorMessage = error.error.error
        if (errorMessage === "PhoneNumberNotFound") {
          this.snackBar.open("등록되지 않은 전화번호입니다.", "Close", {
            duration: 3000,
            panelClass: ['custom-snackbar'],
            verticalPosition: 'bottom'
          })
        }else if (errorMessage === "NameMatchNotFound") {
          this.snackBar.open("이름과 전화번호 정보가 일치하지 않습니다.", "Close", {
            duration: 3000,
            panelClass: ['custom-snackbar'],
            verticalPosition: 'bottom'
          })
        }else if (errorMessage === "PersonNotAdmittedYet") {
          this.snackBar.open("등록을 기다리고 있습니다. 웰컴팀 팀장에게 문의해주세요.", "Close", {
            duration: 3000,
            panelClass: ['custom-snackbar'],
            verticalPosition: 'bottom'
          })
        }else {
          this.snackBar.open("죄송합니다. 앱 오류입니다. 다시 시도해주세요.", "Close", {
            duration: 3000,
            panelClass: ['custom-snackbar'],
            verticalPosition: 'bottom'
          })
        }
        this.requestSent = false
      }
    })
  }

  sendVerification() {
    this.requestSent = true;
    const formValue = {...this.form.value};
    const body = {
      phoneNumber: formValue.phone,
      verificationNumber: this.code
    }
    this.loginService.send_verification(body).subscribe({
      next: (data) => {
        console.log(data);
        this.countdownSubscription.unsubscribe(); 
        this.requestSent = false;
        this.router.navigateByUrl("/");
        this.snackBar.open("로그인 되었습니다. ", "Close", {
          duration: 3000,
          panelClass: ['custom-snackbar'],
          verticalPosition: 'bottom'
        })
      },
      error: (error) => {
        console.log(error)
        let errorMessage = error.error.error
        console.log(errorMessage)
        if (errorMessage === "WrongVerificationNumber") {
          this.snackBar.open("인증번호가 틀렸습니다.", "Close", {
            duration: 3000,
            panelClass: ['custom-snackbar'],
            verticalPosition: 'bottom'
          })
        }else if (errorMessage === "VerificationExpired") {
          this.snackBar.open("만료된 인증번호입니다. 재발급 후 인증해주세요. ", "Close", {
            duration: 3000,
            panelClass: ['custom-snackbar'],
            verticalPosition: 'bottom'
          })
        }else {
          this.snackBar.open("죄송합니다. 앱 오류입니다. 다시 시도해주세요.", "Close", {
            duration: 3000,
            panelClass: ['custom-snackbar'],
            verticalPosition: 'bottom'
          })
        }
        this.requestSent = false;
      }
    })
  }
      // this called every time when user changed the code
  onCodeChanged(code: string) {
    this.code = code
    console.log(this.code)
  }

  // this called only if user entered full code
  onCodeCompleted(code: string) {

  }

  toggleVisibleFields() {
    if (this.fieldSwitching) return;
    this.fieldSwitching= true;
    if (this.showPhoneAndNameField) {
      this.showPhoneAndNameField = false;
      setTimeout(()=>{
        this.showVerificationField = true;
      }, 300)
    } else {
      this.showVerificationField = false;
      setTimeout(()=>{
        this.showPhoneAndNameField = true;
      }, 300)
    }
    this.fieldSwitching= false;
  }

  startCountdown() {
    const countdownDuration = 297;
    this.countdownSubscription = interval(1000)
      .pipe(map(tick => countdownDuration - tick))
      .subscribe(remainingSeconds => {
        if (remainingSeconds <= 0) {
          
          this.countdownSubscription.unsubscribe();
          this.toggleVisibleFields()
          this.countdown = null;
          this.snackBar.open("인증번호가 만료되었습니다. 다시 요청해주세요. ", "Close", {
            duration: 3000,
            panelClass: ['custom-snackbar'],
            verticalPosition: 'bottom'
          })
        } else {
          const minutes = Math.floor(remainingSeconds / 60);
          const seconds = remainingSeconds % 60;

          this.countdown = `${minutes}분 ${seconds}초 남았습니다.`
          console.log(this.countdown);
        }
      })

  }

  ngOnDestroy(): void {
    if (this.countdownSubscription) { // Using the renamed variable here
      this.countdownSubscription.unsubscribe(); // Using the renamed variable here
    }
  }

  ngOnInit(): void {
    this.authenticateService.authenticate().subscribe({
      next: (data) => {
        this.authChecked = true
        this.authenticated = true
        if(this.authenticated) {
          this.router.navigateByUrl("/")
          this.snackBar.open("이미 로그인 된 기기입니다. ", "Close", {
            duration: 3000,
            panelClass: ['custom-snackbar'],
            verticalPosition: 'bottom'
          })
        }
      },
      error: (error) => {
        this.authChecked = true
        console.log(error)
      }
    })
  }
}
