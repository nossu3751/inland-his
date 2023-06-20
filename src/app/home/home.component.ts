import { Component, OnInit } from '@angular/core';
import { ScreenSizeService } from '../services/view/screen-size.service'
import { ModalService } from '../services/view/modal.service';
import { SmallGroupNoteComponent } from '../components/core/small-group-note/small-group-note.component';
import { NewComerFormComponent } from '../components/core/new-comer-form/new-comer-form.component';
import { BulletinPaperComponent } from '../components/core/bulletin-paper/bulletin-paper.component';
import { VideoService } from '../services/data/video.service';
import { OfferingComponent } from '../components/core/offering/offering.component';
import { OfferingRedirectionComponent } from '../components/alerts/offering-redirection/offering-redirection.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit{

  smallGroupNoteComponent = SmallGroupNoteComponent
  newComerFormComponent = NewComerFormComponent
  bulletinPaperComponent = BulletinPaperComponent
  offeringComponent = OfferingComponent
  offeringRedirectionComponent = OfferingRedirectionComponent

  constructor(
    private screenSizeService: ScreenSizeService,
    public modalService: ModalService,
    private videoService: VideoService
  ) {}
  screenSizeClass = '';
  video: any;

  ngOnInit() {
    this.screenSizeService.screenSizeClass$.subscribe((screenSizeClass) => {
      this.screenSizeClass = screenSizeClass;
    });
    this.videoService.getFirstLiveStream().subscribe(data => {
      console.log(data)
      this.video = data
    })
    // this.videoService.getLiveStreams().subscribe(data => {
    //   if (data.length > 0) {
    //     this.video = data[0]
    //     console.log("homepage video", this.video)
    //   }
    // })
  }
}
