import { Component, OnInit} from '@angular/core';
import { AuthenticateService } from 'src/app/services/auth/authenticate.service';

@Component({
  selector: 'app-right-sidebar',
  templateUrl: './right-sidebar.component.html',
  styleUrls: ['./right-sidebar.component.scss']
})
export class RightSidebarComponent implements OnInit {
  authenticated:boolean = false
  authChecked:boolean = false
  constructor(private authenticateService:AuthenticateService){}
  ngOnInit() {
    this.authenticateService.authenticate().subscribe({
      next: (data) => {
        this.authChecked = true
        this.authenticated = true
        console.log(data)
      },
      error: (error) => {
        this.authChecked = true
        console.log(error)
      }
    })
  }
}
