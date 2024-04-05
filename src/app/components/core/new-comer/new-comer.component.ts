import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NewComerService } from 'src/app/services/data/new-comer.service';

@Component({
  selector: 'app-new-comer',
  templateUrl: './new-comer.component.html',
  styleUrls: ['./new-comer.component.scss']
})
export class NewComerComponent {
  status:number = 0
  newcomerForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
    private newComerService:NewComerService
  ) { }
  updateStatus(){
    this.status = (this.status + 1) % 3;
    const container = document.querySelector(".content-area");
    if (container) {
      container.scrollTo({
        top: 0,
        behavior: 'smooth'
      });  
    }
  }

  onSubmit() {
    if (this.newcomerForm.valid) {
     
      const formData = { ...this.newcomerForm.value };
  
      formData.baptized = formData.baptized === 'true';
    
      formData.m_address = formData.m_address || null;
      
      console.log(formData)
      this.updateStatus()
      // this.newComerService.postNewComer(formData).subscribe({
      //   "next":(data)=>{
      //     console.log(data);
      //     this.updateStatus()
      //     this.snackBar.open("등록되었습니다. 환영합니다!", "Close", {
      //       duration: 3000,
      //       panelClass: ['custom-snackbar'],
      //       verticalPosition: 'bottom'
      //     })
      //   },
      //   "error":()=>{
      //     this.snackBar.open("죄송합니다. 잠시 후 시도해주세요.", "Close", {
      //       duration: 3000,
      //       panelClass: ['custom-snackbar'],
      //       verticalPosition: 'bottom'
      //     })
      //   }
      // })
      
      
    }
  }

  hasError(fieldName:string, errorName: string) {
    const control = this.newcomerForm.get(fieldName);
    return (control?.hasError(errorName) && (control.touched || control.dirty)) ?? false;
  }

  ngOnInit() {
    this.newcomerForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      birthday: ['', Validators.required],
      phone: ['', [Validators.required]], // Adjust regex based on expected phone format
      p_address: ['', [Validators.required]],
      m_address: [''], // Optional with max length
      email: ['', [Validators.required, Validators.email]],
      baptized: ['', Validators.required] // Assuming this is a boolean field, input should be a checkbox
    });
  }
}
