import { Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticateService } from 'src/app/services/auth/authenticate.service';
import { LoginService } from 'src/app/services/auth/login.service';
import { ModalService } from 'src/app/services/view/modal.service';
import { LogoutConfirmationComponent } from '../../alerts/logout-confirmation/logout-confirmation.component';
import { PersonService } from 'src/app/services/data/person.service';
import { ProfileManagerComponent } from '../../shared/profile-manager/profile-manager.component';
import { RoutingService } from 'src/app/services/data/routing.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit{
  authenticated:boolean = false;
  authChecked:boolean = false;
  user_attributes:any;
  user_roles: any;
  profileLink:string|null = null
  user_name:any;
  profileManagerComponent = ProfileManagerComponent

  data:any;
  logoutConfirmationComponent = LogoutConfirmationComponent;
  constructor(
    private authenticateService:AuthenticateService, 
    public modalService:ModalService,
    private router:Router,
    public personService:PersonService,
    public routingService:RoutingService){}

  goToLogin() {
    this.router.navigateByUrl("/login")
  }
  

  ngOnInit() {
    this.authenticateService.authenticate().subscribe({
      next: (d1) => {
        this.authChecked = true
        this.authenticated = true
        const userinfo = d1.data
        const sub = userinfo["sub"]
        const roles = userinfo["group_membership"]
        this.user_roles = roles
        this.personService.getProfile().subscribe({
          "next":(data)=>{
            const imageUrl = data.data
            if(imageUrl !== this.personService.profileImage.value){
              this.personService.updateProfileImage(imageUrl)
            }
          },
          "error":(error)=>{
            this.personService.profileImage.next("assets/church-icons/no-profile.png")
          }
        })
        this.personService.getPerson(sub).subscribe({
          "next":(d2) => {
            this.user_attributes = d2.data.attributes
            this.user_name = this.user_attributes?.name
            console.log(d2)
          }
        })
      },
      error: (error) => {
        this.authChecked = true
        console.log(error)
      }
    })
  }
}
