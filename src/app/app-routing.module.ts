import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Import your components here
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { SmallGroupComponent } from './components/core/small-group/small-group.component';
import { OfferingComponent } from './components/core/offering/offering.component';
import { MinistriesComponent } from './ministries/ministries.component';
import { BibleVersesComponent } from './components/core/bible-verses/bible-verses.component';
import { BulletinComponent } from './components/core/bulletin/bulletin.component';
import { NewComerComponent } from './components/core/new-comer/new-comer.component';
import { LoginComponent } from './components/core/login/login.component';
import { SigninComponent } from './components/core/signin/signin.component';
import { VideosComponent } from './components/core/videos/videos.component';
import { VideoComponent } from './components/core/video/video.component';
import { AdminHomeComponent } from './components/admin/admin-home/admin-home.component';
import { SmallGroupNotesAdminComponent } from './components/admin/small-group/small-group-notes-admin/small-group-notes-admin.component';
import { BulletinPaperAdminComponent } from './components/admin/bulletin/bulletin-paper/bulletin-paper-admin.component';
import { BulletinPaperComponent } from './components/core/bulletin-paper/bulletin-paper.component';
import { SearchPageComponent } from './components/core/search-page/search-page.component';
import { SignupSuccessComponent } from './components/shared/signup-success/signup-success.component';
// ...

const routes: Routes = [
  // { path: '', component: HomeComponent, data: {reuse: true, animation: 'Home'} },
  // { path: 'search', component: SearchPageComponent, data: {animation: 'Search'}},
  { path: '', component: HomeComponent },
  { path: 'search', component: SearchPageComponent, data: { animation: 'Search' }},
  { path: 'thanks', component: SignupSuccessComponent},
  { path: 'about', component: AboutComponent },
  { path: 'small-group', component: SmallGroupComponent },
  { path: 'offering', component: OfferingComponent },
  { path: 'ministries', component: MinistriesComponent },
  { path: 'verses', component: BibleVersesComponent },
  { path: 'bulletin', component: BulletinComponent, data: { animation: 'Bulletins' }},
  { path: 'bulletin/:sunday', component: BulletinPaperComponent, data: { animation: 'Bulletin' }},
  { path: 'new-comer', component: NewComerComponent},
  { path: 'login', component: LoginComponent},
  { path: 'signin', component: SigninComponent},
  { path: 'videos', component: VideosComponent, data: { animation: 'Videos' }},
  { path: 'videos/:id', component: VideoComponent, data: { animation: 'Video' }},
  { path: 'admin',
    component: AdminHomeComponent,
    children: [
      {path: 'small-group-note', component: SmallGroupNotesAdminComponent},
      {path: 'bulletin', component: BulletinPaperAdminComponent}
    ]
  }
  
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
