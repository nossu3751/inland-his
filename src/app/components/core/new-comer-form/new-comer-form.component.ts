import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-new-comer-form',
  templateUrl: './new-comer-form.component.html',
  styleUrls: ['./new-comer-form.component.scss']
})
export class NewComerFormComponent {
  form: FormGroup;

  whyVisitOptions = ['계속 다닐 예정입니다', '교회를 잠시 방문 중입니다', '교회를 찾고 있습니다'];
  howVisitOptions = ['인터넷 검색', '지인의 소개', '유튜브 및 SNS'];
  howLongOptions = ['0 - 1년','1 - 3년','3년 이상'];
  isBaptized = ['아니오. 받지 않았습니다','예, 받았습니다']

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]],
      message: ['', Validators.required],
      birthday: ['', Validators.required],
      dateOfVisit: ['', Validators.required],
      isSearching: [0, Validators.required],
      howVisit: [0, Validators.required],
      whoIntroduced: [''],
      howLong: [0, Validators.required],
      isBaptized: [0, Validators.required],
      cellLeader: [''],
      memo: ['']
    });
    this.form.get("phone")?.valueChanges.subscribe(value => {
      // remove all non-digit characters
      let numbers = value.replace(/\D/g, '');
      
      // add dashes between numbers
      // numbers = numbers.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3');
      
      // only update the value if it has changed
      if (numbers !== value) {
        this.form.get("phone")?.setValue(numbers, { emitEvent: false });
      }
    });
  }

  onSubmit() {
    if (this.form.valid) {
      console.log('Form submitted:', this.form.value);
    } else {
      console.log('Form is not valid');
    }
  }
}
