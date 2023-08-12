import { Component, OnInit, Input } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BulletinService } from 'src/app/services/data/bulletin.service';
@Component({
  selector: 'app-bulletin',
  templateUrl: './bulletin.component.html',
  styleUrls: ['./bulletin.component.scss']
})
export class BulletinComponent implements OnInit {
  @Input() bulletins: any[] = []

  constructor(public bulletinService: BulletinService, private snackBar:MatSnackBar){}

  private pastorPhotoMap = new Map<string, string>([
    ["정산","assets/pastors/san.webp"],
    ["안환","assets/pastors/hwan.webp"],
    ["김현호","assets/pastors/kim.webp"],
    ["윤성찬","assets/pastors/yoon.webp"],
  ])

  getPastorPhoto(pastor:string) {
    pastor = this.getPastorName(pastor)
    console.log(pastor)
    if(this.pastorPhotoMap.has(pastor)){
      console.log("in")
      return this.pastorPhotoMap.get(pastor)
    }
    return "assets/church-icons/no-profile.png"
  }

  getPastorName(pastor:string) {
    if(pastor.endsWith("목사")) {pastor = pastor.slice(0,-2)}
    else if (pastor.endsWith("목사님")) {pastor = pastor.slice(0,-3)}
    pastor = pastor.trim();  
    pastor = pastor.replace(/\s/g, ''); 
    return pastor 
  }

  ngOnInit(): void {
    // this.bulletinService.getData().subscribe((data) => {
    //   this.bulletins = data
    //   console.log(this.bulletins)
    // })
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
