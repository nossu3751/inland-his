import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PersonService } from 'src/app/services/data/person.service';
import { RoutingService } from 'src/app/services/data/routing.service';

@Component({
  selector: 'app-admit-new-member',
  templateUrl: './admit-new-member.component.html',
  styleUrls: ['./admit-new-member.component.scss']
})
export class AdmitNewMemberComponent implements OnInit{
  notAdmitted:any = null;
  wait:boolean = false;
  constructor(
    private personService:PersonService,
    public routingService:RoutingService,
    private snackBar:MatSnackBar
  ){}
  admitNewMember(id:string, i: number){
    this.personService.admitPerson({id:id}).subscribe({
      "next":(data)=>{
        const removed = this.notAdmitted.splice(i,1)[0]
        this.snackBar.open("수락되었습니다.", "Close", {
          duration: 3000,
          panelClass: ['custom-snackbar'],
          verticalPosition: 'bottom'
        })
      },
      "error":(error)=>{
        console.log("failed to admit")
      }
    })
  }
  declineNewMember(id:string, i:number){
    this.snackBar.open("죄송합니다. 아직 준비 중인 기능입니다", "Close", {
      duration: 3000,
      panelClass: ['custom-snackbar'],
      verticalPosition: 'bottom'
    })
  }
  admitAllMembers(){
    this.wait = true
    let id_list = this.notAdmitted.map((user:any) => {
      return user.id
    })
    this.personService.admitAll({id_list:id_list}).subscribe({
      "next":(data)=>{
        this.notAdmitted = null;
        this.wait = false
        this.snackBar.open("수락되었습니다.", "Close", {
          duration: 3000,
          panelClass: ['custom-snackbar'],
          verticalPosition: 'bottom'
        })
      },
      "error":(error)=>{
        this.wait = false
        this.snackBar.open("죄송합니다. 서버에러입니다.", "Close", {
          duration: 3000,
          panelClass: ['custom-snackbar'],
          verticalPosition: 'bottom'
        })
      }
    })
    
  }
  ngOnInit(): void {
      this.personService.getNotAdmitted().subscribe({
        "next":(data)=>{
          this.notAdmitted = data.data
          console.log(this.notAdmitted)
        }
      })
  }
}
