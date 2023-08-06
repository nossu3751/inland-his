import { Component, OnInit } from '@angular/core';
import { ScreenSizeService } from '../services/view/screen-size.service'
import { ModalService } from '../services/view/modal.service';
import { SmallGroupNoteComponent } from '../components/core/small-group-note/small-group-note.component';
import { NewComerFormComponent } from '../components/core/new-comer-form/new-comer-form.component';
import { BulletinPaperComponent } from '../components/core/bulletin-paper/bulletin-paper.component';
import { VideoService } from '../services/data/video.service';
import { OfferingComponent } from '../components/core/offering/offering.component';
import { OfferingRedirectionComponent } from '../components/alerts/offering-redirection/offering-redirection.component';
import { AuthenticateService } from '../services/auth/authenticate.service';
import { SmallGroupInfoComponent } from '../components/core/small-group-info/small-group-info.component';
import { BibleRedirectionComponent } from '../components/alerts/bible-redirection/bible-redirection.component';
import { TodayCalendarComponent } from '../components/core/today-calendar/today-calendar.component';
import { EventService } from '../services/data/event.service';

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
  bibleRedirectionComponent = BibleRedirectionComponent
  smallGroupInfoComponent = SmallGroupInfoComponent
  todayCalendarComponent = TodayCalendarComponent
  
  constructor(
    private screenSizeService: ScreenSizeService,
    public modalService: ModalService,
    private videoService: VideoService,
    private authenticateService: AuthenticateService,
    public eventService:EventService
  ) {}
  screenSizeClass = '';
  video: any;
  authChecked = false;
  authenticated = false;
  ngOnInit() {

    this.screenSizeService.screenSizeClass$.subscribe((screenSizeClass) => {
      this.screenSizeClass = screenSizeClass;
    });
    this.videoService.getFirstLiveStream().subscribe(data => {
      console.log(data)
      this.video = data
    })
    this.authenticateService.authenticate().subscribe({
      next: (data) => {
        this.authChecked = true
        this.authenticated = true
  
      },
      error: (error) => {
        console.log(error.error)
        this.authChecked = true
      }
    })
    
    // this.videoService.getLiveStreams().subscribe(data => {
    //   if (data.length > 0) {
    //     this.video = data[0]
    //     console.log("homepage video", this.video)
    //   }
    // })
  }
}
