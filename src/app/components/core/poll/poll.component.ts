import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthenticateService } from 'src/app/services/auth/authenticate.service';
import { EventService } from 'src/app/services/data/event.service';
import { PersonService } from 'src/app/services/data/person.service';
import { PollService } from 'src/app/services/data/poll.service';

@Component({
  selector: 'app-poll',
  templateUrl: './poll.component.html',
  styleUrls: ['./poll.component.scss']
})
export class PollComponent implements OnInit{
  allPolls:any = null;
  admin:boolean = false;
  title:string|null = null;
  end:Date|null = null;
  detail:string|null = null;
  form: FormGroup | null = null;
  showForm: boolean = false;
  mySub!:string
  
  constructor(
    private pollService:PollService,
    private personService:PersonService,
    private snackBar:MatSnackBar,
    private authenticateService:AuthenticateService,
    private eventService:EventService,
    private fb: FormBuilder,
    private router:Router
  ){
    this.form = this.fb.group({
      title: ['', Validators.required],
      start: [new Date(), [Validators.required, Validators.email]],
      end: [new Date(), [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]],
      detail: [''],
      options: this.fb.array([
        this.createOptionsFormGroup(),
        this.createOptionsFormGroup()
      ]),
      anonymous: [true, Validators.required],
      ended: [false, Validators.required],
      target_persons: [null]
    });
  }

  removeOption(index: number): void {
    const optionsArray = this.form?.get('options') as FormArray;
    optionsArray.removeAt(index);
  }

  get options(): FormArray {
    return this.form?.get('options') as FormArray;
  }

  addOption(): void {
    const optionsArray = this.form?.get('options') as FormArray;
    optionsArray.push(this.createOptionsFormGroup());
  }

  castToFormControl(control: AbstractControl | null): FormControl {
    return control as FormControl || new FormControl();
  }

  createOptionsFormGroup(): FormGroup {
    return this.fb.group({
      title: ['', Validators.required],
    });
  }

  submitForm() {
    let formCopy = {...this.form?.value}
      if(!formCopy.title){
        this.snackBar.open("제목을 입력해주세요", "Close", {
          duration: 3000,
          panelClass: ['custom-snackbar'],
          verticalPosition: 'bottom'
        })
      
      return
    }
    const start = this.eventService.localIsoString(formCopy.start)
    formCopy.start = start
    const end = this.eventService.localIsoString(formCopy.end)
    formCopy.end = end
    this.pollService.addPoll(formCopy).subscribe({
      "next":()=>{
        this.pollService.getPolls().subscribe({
          "next":(data)=>{
            this.allPolls = data.data
            this.snackBar.open("투표가 등록되었습니다", "Close", {
              duration: 3000,
              panelClass: ['custom-snackbar'],
              verticalPosition: 'bottom'
            })
            this.showForm = false;
          }
        })

      }
    })
  }

  refresh(): void {
    this.pollService.getPolls().subscribe({
      "next":(data)=>{
        this.allPolls = data.data
        for(let poll of this.allPolls){
          console.log(this.getPollSize(poll))
        }
      }
    })
  }

  optionKeyToNum(k:any){
    return Number(k)+1
  }

  optionValueToTitle(v:any){
    return String(v.title)
  }
  castVote(poll_id:number, k:any){
    const k_num = Number(k)
    this.pollService.castVote({
      "id":poll_id,
      "selected":k_num
    }).subscribe({
      "next":()=>{
        this.snackBar.open("투표되었습니다", "Close", {
          duration: 3000,
          panelClass: ['custom-snackbar'],
          verticalPosition: 'bottom'
        })
        this.refresh()
      },
      "error":()=>{
        this.snackBar.open("투표할 수 없습니다", "Close", {
          duration: 3000,
          panelClass: ['custom-snackbar'],
          verticalPosition: 'bottom'
        })
      }
    })
  }

  getPollSize(poll:any){
    const votedPerson = poll.voted_persons
    return Object.keys(votedPerson).length

  }

  getMyChoice(poll:any){
    const voted_persons = poll.voted_persons
    if (this.mySub in voted_persons){
      return voted_persons[this.mySub]
    }
    return -1
  }

  ngOnInit(): void {
    this.authenticateService.authenticate().subscribe({
      "next":(data)=>{
        console.log(data.data.group_membership)
        this.mySub = data.data.id
        if(data.data.group_membership.includes("/inland-his-admin")){
          this.admin = true;
        }
        this.pollService.getPolls().subscribe({
          "next":(data)=>{
            this.allPolls = data.data
            for(let poll of this.allPolls){
              console.log("pollsize",this.getPollSize(poll))
            }
            console.log(this.allPolls)
          }
        })
      },
      "error":()=>{
        this.snackBar.open("투표권한이 없습니다", "Close", {
          duration: 3000,
          panelClass: ['custom-snackbar'],
          verticalPosition: 'bottom'
        })
        this.router.navigateByUrl("/")
      }
    })
    
  }
}
