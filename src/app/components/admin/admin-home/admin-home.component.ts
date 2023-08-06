import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthenticateService } from 'src/app/services/auth/authenticate.service';
import { PersonService } from 'src/app/services/data/person.service';
import { RoutingService } from 'src/app/services/data/routing.service';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.scss']
})
export class AdminHomeComponent implements OnInit{
  sub = null
  userRoles:any
  constructor(
    public routingService:RoutingService,
    public personService:PersonService,
    private authenticateService:AuthenticateService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {

  }

  isAmongRoles(requiredRoles:any[]):boolean{
    for(let role of requiredRoles){
      if(this.userRoles.includes(role)){
        return true
      }
    }
    return false
  }

  ngOnInit(): void {
    this.authenticateService.authenticate().subscribe({
        "next":(data)=>{
          this.sub = data.data.sub
          this.userRoles = data.data.group_membership
          this.personService.getProfile().subscribe()
          // console.log(data.data)
        },
        "error":(error)=>{
          this.router.navigateByUrl("/admin/bulletins")
          this.snackBar.open("죄송합니다. 권한을 확인할 수 없습니다.", "Close", {
            duration: 3000,
            panelClass: ['custom-snackbar'],
            verticalPosition: 'bottom'
          })
        }
    })
  }
}
