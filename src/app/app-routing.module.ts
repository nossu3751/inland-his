import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Import your components here
import { HomeComponent } from './home/home.component';
import { OfferingComponent } from './components/core/offering/offering.component';
import { BibleVersesComponent } from './components/core/bible-verses/bible-verses.component';
import { BulletinComponent } from './components/core/bulletin/bulletin.component';
import { VideosComponent } from './components/core/videos/videos.component';
import { VideoComponent } from './components/core/video/video.component';
import { BulletinPaperComponent } from './components/core/bulletin-paper/bulletin-paper.component';
import { SearchPageComponent } from './components/core/search-page/search-page.component';
import { MonthlyCalendarComponent } from './components/core/monthly-calendar/monthly-calendar.component';
import { TodayCalendarComponent } from './components/core/today-calendar/today-calendar.component';
import { WidgetsComponent } from './components/core/widgets/widgets.component';
import { BibleChallengeComponent } from './components/core/bible-challenge/bible-challenge.component';
import { BibleChallengeVerseComponent } from './components/core/bible-challenge-verse/bible-challenge-verse.component';
// ...

const routes: Routes = [
  // { path: '', component: HomeComponent, data: {reuse: true, animation: 'Home'} },
  // { path: 'search', component: SearchPageComponent, data: {animation: 'Search'}},
  { path: '', component: HomeComponent, data:{animation: 'Home'} },
  { path: 'search', component: SearchPageComponent, data: { animation: 'Search' }},
  { path: 'offering', component: OfferingComponent },
  { path: 'verses', component: BibleVersesComponent },
  { path: 'bulletin', component: BulletinComponent, data: { animation: 'Bulletins' }},
  { path: 'bulletin/:sunday', component: BulletinPaperComponent, data: { animation: 'Bulletin' }},
  { path: 'videos', component: VideosComponent, data: { animation: 'Videos' }},
  { path: 'videos/:id', component: VideoComponent, data: { animation: 'Video' }},
  { path: 'calendar', component: MonthlyCalendarComponent, data: { animation: 'MonthlyCalendar' }},
  { path: 'calendar/:date', component: TodayCalendarComponent, data: { animation: 'TodayCalendar' }},
  { path: 'widgets', component: WidgetsComponent, data: { animation: 'Widgets'}},
  { path: 'bible-challenge', component: BibleChallengeComponent, data: {animation: 'BibleChallenge'}},
  { path: 'bible-challenge/:date', component: BibleChallengeVerseComponent, data: {animation: 'BibleChallengeVerse'}},
  { path: '**', redirectTo: '/' },
  
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
