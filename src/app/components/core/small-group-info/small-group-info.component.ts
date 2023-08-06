import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { SmallGroupService } from 'src/app/services/data/small-group.service';

@Component({
  selector: 'app-small-group-info',
  templateUrl: './small-group-info.component.html',
  styleUrls: ['./small-group-info.component.scss']
})
export class SmallGroupInfoComponent implements OnInit{
  showAllSmallGroups:boolean = false
  mySmallGroup: any = null
  myLeaders: any = null
  smallGroupProfiles: any = null
  allSmallGroups: any = null
  allLeaders: any = null
  toggling:boolean = false

  toggleView(){
    if(!this.showAllSmallGroups){
      this.fetchAllData()
    }
    if (!this.toggling) {
      this.toggling = true
      this.showAllSmallGroups = !this.showAllSmallGroups
    }
    this.toggling = false
  }

  switchCurrGroup(smallGroupId:any){
    const smallGroupIdNum = Number(smallGroupId)
    let targetSmallGroup = this.allSmallGroups.filter((group:any)=>{
      console.log(typeof(group.id), typeof(smallGroupIdNum))
      return group.id === smallGroupIdNum
    })
    console.log("targetgroup",targetSmallGroup)
    if(targetSmallGroup.length > 0){
      this.mySmallGroup = targetSmallGroup[0];
      this.myLeaders = {}
      const leaders = this.mySmallGroup.members.filter((member:any)=>{
        return member.is_leader == true
      })
      for(let leader of leaders){
        this.myLeaders[leader.id] = this.allLeaders[leader.id]
      }
    }
    this.toggleView()

  }

  fetchAllData(){
    if (!this.allSmallGroups){
      this.smallGroupService.getSmallGroups().subscribe({
        "next":(data)=>{
          this.allSmallGroups = data.data
          this.smallGroupProfiles = data.profile_images
          this.allLeaders = data.leaders
          console.log(this.allSmallGroups)
        },
        "error":(error)=>{
  
        }
      })
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

  getMemberNameWithId(memberId:any){
    const memberIdNum = Number(memberId)
    const member = this.mySmallGroup.members.filter((m:any)=>{
      return m.id === memberIdNum
    })
    console.log("member", member)
    return member.length > 0? member[0].name : null;
  }

  constructor(public smallGroupService:SmallGroupService){}
  ngOnInit(): void {
      this.smallGroupService.getMySmallGroup().subscribe({
        "next":(data)=>{
          this.mySmallGroup = data.data
          this.smallGroupProfiles = data.profile_images
          this.myLeaders = data.leaders
          console.log(this.mySmallGroup)
          console.log(this.smallGroupProfiles)
          console.log(this.myLeaders)
        }
      })
  }

}
