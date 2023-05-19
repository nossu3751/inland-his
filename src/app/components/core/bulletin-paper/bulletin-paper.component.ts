import { Component, Input, OnInit } from '@angular/core';
import { BulletinService } from 'src/app/services/data/bulletin.service';
@Component({
  selector: 'app-bulletin-paper',
  templateUrl: './bulletin-paper.component.html',
  styleUrls: ['./bulletin-paper.component.scss']
})
export class BulletinPaperComponent {
  @Input() bulletin: any

  constructor(private bulletinService: BulletinService){}

  ngOnInit(): void {
    this.bulletinService.getData().subscribe((data) => {
      this.bulletin = data.length > 0 ? data[0] : null;
      console.log(this.bulletin)
    })
  }
}
