import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { AuthenticateService } from 'src/app/services/auth/authenticate.service';
import { PersonService } from 'src/app/services/data/person.service';
import { RoutingService } from 'src/app/services/data/routing.service';
import * as hangul from 'hangul-js';

@Component({
  selector: 'app-assign-team-member',
  templateUrl: './assign-team-member.component.html',
  styleUrls: ['./assign-team-member.component.scss']
})
export class AssignTeamMemberComponent {
  authenticated:boolean = false;
  authChecked:boolean = false;
  userAttributes:any;
  userRoles: any;
  profileLink:string|null = null
  profileImages:any;
  userName:any;
  leaderRole:string|null = null;
  groupPath:string|null = null;
  currentTeam: any = null
  currentTeamName: BehaviorSubject<string> = new BehaviorSubject<string>("")
  allUsers: any = null
  searchedUsers: any = []
  searchKey: string = ""

  data:any;

  constructor(
    private authenticateService:AuthenticateService, 
    private router:Router,
    public personService:PersonService,
    private snackBar:MatSnackBar,
    public routingService:RoutingService
  ){}

  refreshList() {
    if(this.groupPath !== null){
      this.personService.getGroupByPath(this.groupPath).subscribe({
        "next":(teamMembers)=>{
          this.currentTeam = teamMembers.data
          this.personService.getPersons().subscribe({
            "next":(persons)=>{
              this.profileImages = persons.profile_images
              this.allUsers = persons.persons
              this.allUsers = this.allUsers.filter((user:any) => !this.currentTeam.some((teamMember:any) => teamMember.id === user.id));
              console.log(this.allUsers)
              this.performSearch()
            }
          })
        }
      })
    }
  }

  goToLogin() {
    this.router.navigateByUrl("/login")
  }
  
  checkRole(userRoles:any[]){
    for (let user_role of userRoles){
      if(user_role === "/media-team/leader"){
        this.leaderRole = "mediaTeamLeader"
        this.groupPath = "/media-team"
        this.currentTeamName.next("미디어팀")
        break
      }
      if(user_role === "/praise-team/leader"){
        this.leaderRole = "praiseTeamLeader"
        this.groupPath = "/praise-team"
        this.currentTeamName.next("찬양팀")
        break
      }
      if(user_role === "/welcome-team/leader"){
        this.leaderRole = "welcomeTeamLeader"
        this.groupPath = "/welcome-team"
        this.currentTeamName.next("웰컴팀")
        break
      }
      if(user_role === "/campus-team/leader"){
        this.leaderRole = "campusTeamLeader"
        this.groupPath = "/campus-team"
        this.currentTeamName.next("캠퍼스팀")
        break
      }
    }
  }

  addToTeam(person:any){
    if(person.id && this.groupPath){
      this.personService.addToTeam(person.id, this.groupPath).subscribe({
        "next":()=>{
          this.refreshList()
          this.snackBar.open("추가하였습니다", "Close", {
            duration: 3000,
            panelClass: ['custom-snackbar'],
            verticalPosition: 'bottom'
          })
        },
        "error":()=>{
          this.snackBar.open("죄송합니다. 지금은 추가할 수 없습니다", "Close", {
            duration: 3000,
            panelClass: ['custom-snackbar'],
            verticalPosition: 'bottom'
          })
        }
      })
    } 
  }

  removeFromTeam(person:any){
    if(person.id && this.groupPath) {
      this.personService.removeFromTeam(person.id, this.groupPath).subscribe({
        "next":()=>{
          this.refreshList()
          this.snackBar.open("삭제되었습니다", "Close", {
            duration: 3000,
            panelClass: ['custom-snackbar'],
            verticalPosition: 'bottom'
          })
        },
        "error":()=>{
          this.snackBar.open("죄송합니다. 지금은 삭제할 수 없습니다", "Close", {
            duration: 3000,
            panelClass: ['custom-snackbar'],
            verticalPosition: 'bottom'
          })
        }
      })
    }
  }

  performSearch() {
    if(this.searchKey === ""){
      this.searchedUsers = [...this.allUsers]
    }else{
      const disassembled = hangul.d(this.searchKey).join("")
      console.log("searched user",disassembled)
      this.searchedUsers = this.allUsers.filter((user:any) => {
        console.log(user)
        if (user.attributes && "hangul_name" in user.attributes) {
          return user.attributes["hangul_name"][0].includes(disassembled)
        }
        return false
      })
    }
  }
  


  ngOnInit() {
    this.authenticateService.authenticate().subscribe({
      next: (d1) => {
        this.authChecked = true
        this.authenticated = true
        const userinfo = d1.data
        const sub = userinfo["sub"]
        const roles = userinfo["group_membership"]
        this.userRoles = roles
        this.checkRole(roles)

        if(this.leaderRole === null){
          this.router.navigateByUrl("/")
          this.snackBar.open("권한이 없는 페이지입니다", "Close", {
            duration: 3000,
            panelClass: ['custom-snackbar'],
            verticalPosition: 'bottom'
          })
        }
        if (this.groupPath === null){
          this.router.navigateByUrl("/")
          this.snackBar.open("죄송합니다. 지금은 이용할 수 없습니다.", "Close", {
            duration: 3000,
            panelClass: ['custom-snackbar'],
            verticalPosition: 'bottom'
          })
        }
        this.refreshList()

        
        
        this.personService.getPerson(sub).subscribe({
          "next":(d2) => {
            this.userAttributes = d2.data.attributes
            this.userName = this.userAttributes?.name
            console.log(d2)
          }
        })
        
      },
      error: (error) => {
        this.router.navigateByUrl("/")
          this.snackBar.open("권한이 없는 페이지입니다", "Close", {
            duration: 3000,
            panelClass: ['custom-snackbar'],
            verticalPosition: 'bottom'
          })
      }
    })
  }
}
