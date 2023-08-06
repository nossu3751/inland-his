import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { PersonService } from 'src/app/services/data/person.service';
import { SmallGroupService } from 'src/app/services/data/small-group.service';

import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BehaviorSubject } from 'rxjs';
import {v4 as uuidv4} from 'uuid';
import * as hangul from 'hangul-js';
import { RoutingService } from 'src/app/services/data/routing.service';

@Component({
  selector: 'app-small-group-members-search',
  templateUrl: './small-group-members-search.component.html',
  styleUrls: ['./small-group-members-search.component.scss']
})
export class SmallGroupMembersSearchComponent implements OnInit {


  smallGroupId:number|null = null
  users: any = null;
  usersProfiles: any = null
  searchedUsers: any = []
  searchKey: string = ""
  currentSmallGroup: any = null
  currentSmallGroupName: BehaviorSubject<string> = new BehaviorSubject<string>("")
  tmpCreatedMembers: any = []
  smallGroupIdNameMap:BehaviorSubject<any> = new BehaviorSubject<any>({})
  tmpMemberName:string|null = null

  constructor(
    private personService:PersonService, 
    public smallGroupService:SmallGroupService,
    private activatedRoute: ActivatedRoute,
    private snackBar: MatSnackBar,
    private router:Router,
    public routingService:RoutingService){
  }

  startTmpMemberForm(){
    this.tmpMemberName = ""
  }

  addTmpMember(){
    this.tmpCreatedMembers.push(
      {
        id: uuidv4(),
        name:this.tmpMemberName,
        sub:null,
        is_leader:false,
        small_group_id:this.smallGroupId
      }
    )
    this.tmpMemberName = null
  }

  toggleLeader(member:any){
    member.is_leader = !member.is_leader
  }

  removeTmpMember(member:any){
    this.tmpCreatedMembers = this.tmpCreatedMembers.filter((user:any)=>{
      return user.id !== member.id
    })
  }

  addToSmallGroup(member:any){
    member.small_group_id = this.smallGroupId
    this.currentSmallGroup.members.push(member)
    this.users = this.users.filter((user:any)=>{return user.id !== member.id})
    this.performSearch()
    console.log(this.currentSmallGroup)
  }

  removeFromSmallGroup(member:any){
    member.small_group_id = null
    member.is_leader = false
    this.users.push(member)
    this.currentSmallGroup.members = this.currentSmallGroup.members.filter((user:any)=>{
      return user.id !== member.id
    })
    this.performSearch()
    console.log(this.currentSmallGroup)
  }

  performSearch() {
    if(this.searchKey === ""){
      this.searchedUsers = [...this.users]
    }else{
      const disassembled = hangul.d(this.searchKey).join("")
      console.log("searched user",disassembled)
      this.searchedUsers = this.users.filter((user:any) => {
        console.log(user)
        if ("hangul_name" in user) {
          return user["hangul_name"].includes(disassembled)
        }
        return false
      })
    }
  }

  
  getUserName(user:any){
      try {
        return user.name
      } catch {
        return null
      }
    }

  getUserProfile(user:any){
    try {
      const id = user.id
      const imgUrl = this.usersProfiles[id]
      if (imgUrl === null) {
        return "assets/church-icons/no-profile.png"
      }
      return this.usersProfiles[id]
    } catch {
      return "assets/church-icons/no-profile.png"
    }
  }

  submitSmallGroupUpdate(){
    for(let member of this.tmpCreatedMembers){
      delete member.id
    }
    this.currentSmallGroup.members = this.currentSmallGroup.members.concat(this.tmpCreatedMembers)
    this.tmpCreatedMembers = []
    console.log("submitted",this.currentSmallGroup.members)
    this.smallGroupService.updateSmallGroupMembers(this.currentSmallGroup).subscribe({
      "next":(data)=>{
        this.snackBar.open("업데이트 되었습니다.", "Close", {
          duration: 3000,
          panelClass: ['custom-snackbar'],
          verticalPosition: 'bottom'
        })
        this.router.navigateByUrl('/admin/small-group')
      },
      "error":(error)=>{
        const errorMsg = error.error.error
        console.log(errorMsg)
        if (errorMsg === "NoLeader"){
          this.snackBar.open("최소 한명의 리더를 등록해주세요.", "Close", {
            duration: 3000,
            panelClass: ['custom-snackbar'],
            verticalPosition: 'bottom'
          })
        }else{
          this.snackBar.open("지금은 등록할 수 없습니다.", "Close", {
            duration: 3000,
            panelClass: ['custom-snackbar'],
            verticalPosition: 'bottom'
          })
        }
      }
    })
  }

  compositionUpdate(event: any) {
    console.log(event.data)
    this.performSearch()
  }

  ngOnInit(): void {
      this.activatedRoute.params.subscribe(params => {
        this.smallGroupId = +params['id'];
        
        
        console.log(this.smallGroupId)
        if(this.smallGroupId !== null){
          this.smallGroupService.getSmallGroupById(this.smallGroupId).subscribe({
            "next":(data)=>{
              this.currentSmallGroup = data.data
              this.currentSmallGroupName.next(this.currentSmallGroup.name)
              this.smallGroupService.getMembers().subscribe({
                "next":(data)=>{
                  this.users = data.members.filter((member:any)=>{
                    return member.small_group_id !== this.smallGroupId
                  })
                  const searchedUsers = [...this.users]
                  this.searchedUsers = searchedUsers
                  this.usersProfiles = data.profile_images
                  console.log(this.users)
                  console.log(this.usersProfiles)
                  console.log(this.searchedUsers)
                },
                "error":()=>{
                  this.users = []
                  this.usersProfiles = {}
                }
              })
            },
            "error":()=>{
              this.snackBar.open("셀 데이터를 불러올 수 없습니다", "Close", {
                duration: 3000,
                panelClass: ['custom-snackbar'],
                verticalPosition: 'bottom'
              })
            }
          })
        }
        
        this.smallGroupService.getSmallGroupIdName().subscribe({
          "next":(data)=>{
            this.smallGroupIdNameMap.next(data)
          },
          "error":()=>{
            console.log(this.smallGroupIdNameMap)
          }
        })
      })
  }
}
