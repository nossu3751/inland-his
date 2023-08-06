import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { catchError, switchMap, tap } from 'rxjs';
import { PersonService } from 'src/app/services/data/person.service';
import { RoutingService } from 'src/app/services/data/routing.service';
import { SmallGroupService } from 'src/app/services/data/small-group.service';

@Component({
  selector: 'app-small-group-members',
  templateUrl: './small-group-members.component.html',
  styleUrls: ['./small-group-members.component.scss']
})
export class SmallGroupMembersComponent implements OnInit{
  smallGroups:any = [];
  form:any = null;
  profileImages = {}
  constructor(
    private personService:PersonService,
    public smallGroupService:SmallGroupService,
    private snackBar:MatSnackBar,
    private router:Router,
    public routingService:RoutingService){
  }
  goToSmallGroupSearchPage(id:number){
    this.router.navigateByUrl(`/admin/small-group-search/${id}`)
  }
  createForm() {
    if (this.form !== null){
      this.snackBar.open("편집중인 셀을 먼저 등록해주세요", "Close", {
        duration: 3000,
        panelClass: ['custom-snackbar'],
        verticalPosition: 'bottom'
      })
    } else {
      this.form = {
        smallGroupName: null,
        smallGroupRoom: null
      }
    }
  }
  submitForm() {
    const submitting_form = {...this.form}
    if (submitting_form.smallGroupName === null){
      this.snackBar.open("셀 이름을 입력해주세요. ", "Close", {
        duration: 3000,
        panelClass: ['custom-snackbar'],
        verticalPosition: 'bottom'
      })
    }else{
      this.smallGroupService.createSmallGroup({
        "name":submitting_form.smallGroupName,
        "room":submitting_form.smallGroupRoom
      }).subscribe({
        "next":(data)=>{
          this.smallGroups.push(data.data)
          this.form = null
        },
        "error":(error)=>{
          const errorMsg = error.error.error
          if(errorMsg === "DuplicateMembers") {
            this.snackBar.open("이미 셀에 등록된 멤버입니다. ", "Close", {
              duration: 3000,
              panelClass: ['custom-snackbar'],
              verticalPosition: 'bottom'
            })
          } else if (errorMsg === "NoLeader") {
            this.snackBar.open("셀에 리더가 없습니다. ", "Close", {
              duration: 3000,
              panelClass: ['custom-snackbar'],
              verticalPosition: 'bottom'
            })
          } else {
            this.snackBar.open("죄송합니다 서버에러입니다. ", "Close", {
              duration: 3000,
              panelClass: ['custom-snackbar'],
              verticalPosition: 'bottom'
            })
          }
        }
      })
    }
  }
  ngOnInit(): void {
      this.smallGroupService.getSmallGroups().subscribe({
        "next":(data)=>{
          this.smallGroups = data.data.map((smallGroup:any)=>{
            const leaders = smallGroup.members.filter((member:any)=>{
              return member.is_leader === true;
            })
            return {
              ...smallGroup,
              leaders: leaders
            }
          })
          this.profileImages = data.profile_images
          console.log(data.profile_images)
          console.log(this.smallGroups)
        }
      })
  }
}
