import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PersonService } from 'src/app/services/data/person.service';
import { RoutingService } from 'src/app/services/data/routing.service';
import { SmallGroupService } from 'src/app/services/data/small-group.service';

@Component({
  selector: 'app-member-contacts',
  templateUrl: './member-contacts.component.html',
  styleUrls: ['./member-contacts.component.scss']
})
export class MemberContactsComponent implements OnInit {
  smallGroups: any = null;
  smallGroupProfiles: any = null
  memberContacts: any = null

  constructor(
    public smallGroupService:SmallGroupService, 
    public personService:PersonService,
    public routingService:RoutingService,
    private snackBar:MatSnackBar
  ){}
  getMemberContact(member:any) {
    if (this.memberContacts){
      const id = member.id
      if (id && id in this.memberContacts) {
        return this.memberContacts[id]
      }
      return "-"
    } else {
      return "-"
    }
  }

  getProfilePhoto(memberId:any){
    const noProfile = "assets/church-icons/no-profile.png"
    try {
      if (memberId !== null && memberId in this.smallGroupProfiles && this.smallGroupProfiles[memberId] !== null){
        const profile = this.smallGroupProfiles[memberId]
        console.log(profile)
        return profile
      } else {
        return noProfile
      }
    } catch {
      return noProfile
    }
  }

  ngOnInit(): void {
    this.smallGroupService.getSmallGroups().subscribe({
      "next":(data)=>{
        this.smallGroups = data.data
        this.smallGroupProfiles = data.profile_images
        this.smallGroupService.getMemberContacts().subscribe({
          "next":(data)=>{
            this.memberContacts = data.data
            console.log(data)
          }
        })
      },
      "error":(error)=>{
        this.snackBar.open("셀 정보를 불러올 수 없습니다", "Close", {
          duration: 3000,
          panelClass: ['custom-snackbar'],
          verticalPosition: 'bottom'
        })
      }
    })
  }
}
