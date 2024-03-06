import { Component, OnInit } from '@angular/core';
import { ScreenSizeService } from '../services/view/screen-size.service'
import { ModalService } from '../services/view/modal.service';
import { NewComerFormComponent } from '../components/core/new-comer-form/new-comer-form.component';
import { BulletinPaperComponent } from '../components/core/bulletin-paper/bulletin-paper.component';
import { VideoService } from '../services/data/video.service';
import { OfferingComponent } from '../components/core/offering/offering.component';
import { OfferingRedirectionComponent } from '../components/alerts/offering-redirection/offering-redirection.component';
import { AuthenticateService } from '../services/auth/authenticate.service';
import { BibleRedirectionComponent } from '../components/alerts/bible-redirection/bible-redirection.component';
import { TodayCalendarComponent } from '../components/core/today-calendar/today-calendar.component';
import { SmallGroupDiscussionComponent } from '../components/core/small-group-discussion/small-group-discussion.component';
import { EventService } from '../services/data/event.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit{

  smallGroupDiscussionComponent = SmallGroupDiscussionComponent
  newComerFormComponent = NewComerFormComponent
  bulletinPaperComponent = BulletinPaperComponent
  offeringComponent = OfferingComponent
  offeringRedirectionComponent = OfferingRedirectionComponent
  bibleRedirectionComponent = BibleRedirectionComponent
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
  ngOnInit() {

    this.screenSizeService.screenSizeClass$.subscribe((screenSizeClass) => {
      this.screenSizeClass = screenSizeClass;
    });
    this.videoService.getFirstLiveStream().subscribe(data => {
      console.log(data)
      this.video = data
    })
  }
}
