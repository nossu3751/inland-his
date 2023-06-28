import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PersonService } from 'src/app/services/data/person.service';
import { ModalService } from 'src/app/services/view/modal.service';
import { ExistingPersonComponent } from 'src/app/components/alerts/existing-person/existing-person.component';
import { Router } from '@angular/router';


@Component({
  selector: 'app-new-comer-form',
  templateUrl: './new-comer-form.component.html',
  styleUrls: ['./new-comer-form.component.scss']
})
export class NewComerFormComponent implements OnInit{
  form: FormGroup;
  persons:any;

  whyVisitOptions = ['계속 다닐 예정입니다', '교회를 잠시 방문 중입니다', '교회를 찾고 있습니다'];
  howVisitOptions = ['인터넷 검색', '지인의 소개', '유튜브 및 SNS'];
  howLongOptions = ['0 - 1년','1 - 3년','3년 이상'];
  isBaptizedOptions = ['아니오. 받지 않았습니다','예, 받았습니다']
  existingPersonComponent = ExistingPersonComponent
  constructor(
    private fb: FormBuilder, 
    private personService: PersonService, 
    public modalService:ModalService,
    private router:Router
  ) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]],
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

  testFormValidity(event: any) {
    event.preventDefault(); // this prevents the form submission
    // logging form controls errors instead of form errors
    Object.keys(this.form.controls).forEach(key => {
      console.log('key: ' + key + ' errors: ' + JSON.stringify(this.form.get(key)?.errors));
    });
  }

  ngOnInit(): void {
      this.personService.getPersons().subscribe((data)=>{
        this.persons = data;
        console.log(this.persons)
      })
  }

  onSubmit() {
    
    if (this.form.valid) {
 
      const formValue = {...this.form.value};
  
      formValue.howVisit = this.howVisitOptions[Number(formValue.howVisit)];
      formValue.howLong = this.howLongOptions[Number(formValue.howLong)];
      formValue.isSearching = this.whyVisitOptions[Number(formValue.isSearching)];
      formValue.isBaptized = this.isBaptizedOptions[Number(formValue.isBaptized)];

      this.personService.addPerson(formValue).subscribe({
        next:(data)=>{
          console.log(data)
          this.modalService.closeModal()
          this.router.navigateByUrl("/thanks")
        },
        error:(error)=>{
          this.modalService.openAlertModal(this.existingPersonComponent, "등록에 실패하였습니다.")
        }
      })
      console.log('Form submitted:', this.form.value);
      
    } else {
      console.log('Form is not valid');
    }
  }
}
