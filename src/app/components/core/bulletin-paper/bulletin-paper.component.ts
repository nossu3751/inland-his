import { Component, Input, OnInit } from '@angular/core';
import { BulletinService } from 'src/app/services/data/bulletin.service';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-bulletin-paper',
  templateUrl: './bulletin-paper.component.html',
  styleUrls: ['./bulletin-paper.component.scss']
})
export class BulletinPaperComponent implements OnInit {
  @Input() bulletin: any

  constructor(
    private bulletinService: BulletinService,
    private activatedRoute: ActivatedRoute
  ){}


  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      let sunday = params['sunday'];
      if(!sunday){
        this.bulletinService.getFirstBulletin().subscribe((data)=>{
          this.bulletin = data;
        })
      }else{
        this.bulletinService.getBulletinOfSunday(sunday).subscribe((data)=> {
          this.bulletin = data;
        })
      }
    })
  }
}
