import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BulletinService } from 'src/app/services/data/bulletin.service';
import { RoutingService } from 'src/app/services/data/routing.service';

@Component({
  selector: 'app-bulletins',
  templateUrl: './bulletins.component.html',
  styleUrls: ['./bulletins.component.scss']
})
export class BulletinsComponent implements OnInit {
  loading: boolean|null = true;
  bulletins: any = null;
  constructor(
    public bulletinService:BulletinService, 
    private snackBar:MatSnackBar,
    public routingService:RoutingService
  ){}
  
  
  ngOnInit(): void {
      this.bulletinService.getBulletins().subscribe({
        "next":(data)=>{
          this.bulletins = data
        },
        "error":(error)=>{
          this.snackBar.open("주보를 불러올 수 없습니다", "Close", {
            duration: 3000,
            panelClass: ['custom-snackbar'],
            verticalPosition: 'bottom'
          })
        }
      })
  }
}
