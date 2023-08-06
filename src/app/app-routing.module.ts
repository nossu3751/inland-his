import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Import your components here
import { HomeComponent } from './home/home.component';
import { SmallGroupComponent } from './components/core/small-group/small-group.component';
import { OfferingComponent } from './components/core/offering/offering.component';
import { BibleVersesComponent } from './components/core/bible-verses/bible-verses.component';
import { BulletinComponent } from './components/core/bulletin/bulletin.component';
import { NewComerComponent } from './components/core/new-comer/new-comer.component';
import { LoginComponent } from './components/core/login/login.component';
import { VideosComponent } from './components/core/videos/videos.component';
import { VideoComponent } from './components/core/video/video.component';
import { AdminHomeComponent } from './components/admin/admin-home/admin-home.component';
import { SmallGroupNotesAdminComponent } from './components/admin/small-group/small-group-notes-admin/small-group-notes-admin.component';
import { BulletinPaperAdminComponent } from './components/admin/bulletin/bulletin-paper/bulletin-paper-admin.component';
import { BulletinPaperComponent } from './components/core/bulletin-paper/bulletin-paper.component';
import { BulletinsComponent } from './components/admin/bulletin/bulletins/bulletins.component';
import { SearchPageComponent } from './components/core/search-page/search-page.component';
import { SignupSuccessComponent } from './components/shared/signup-success/signup-success.component';
import { UserComponent } from './components/core/user/user.component';
import { SmallGroupMembersComponent } from './components/admin/small-group/small-group-members/small-group-members.component';
import { SmallGroupMembersSearchComponent } from './components/admin/small-group/small-group-members-search/small-group-members-search.component';
import { canActivateProtectedRoutesV2, canActivateNotLoggedIn, canActivateProtectedRoutes } from './services/auth/authenticate.service';
import { MonthlyCalendarComponent } from './components/core/monthly-calendar/monthly-calendar.component';
import { TodayCalendarComponent } from './components/core/today-calendar/today-calendar.component';
import { CalendarComponent } from './components/admin/calendar/calendar.component';
import { AdmitNewMemberComponent } from './components/admin/member/admit-new-member/admit-new-member.component';
import { AssignTeamMemberComponent } from './components/admin/member/assign-team-member/assign-team-member.component';
import { MemberContactsComponent } from './components/admin/small-group/member-contacts/member-contacts.component';
import { WidgetsComponent } from './components/core/widgets/widgets.component';
import { PollComponent } from './components/core/poll/poll.component';
// ...

const routes: Routes = [
  // { path: '', component: HomeComponent, data: {reuse: true, animation: 'Home'} },
  // { path: 'search', component: SearchPageComponent, data: {animation: 'Search'}},
  { path: '', component: HomeComponent },
  { path: 'search', component: SearchPageComponent, data: { animation: 'Search' }},
  { 
    path: 'thanks', component: SignupSuccessComponent,
    canActivate: [canActivateNotLoggedIn] },
  { path: 'small-group', component: SmallGroupComponent },
  { path: 'offering', component: OfferingComponent },
  { path: 'verses', component: BibleVersesComponent },
  { path: 'bulletin', component: BulletinComponent, data: { animation: 'Bulletins' }},
  { path: 'bulletin/:sunday', component: BulletinPaperComponent, data: { animation: 'Bulletin' }},
  { 
    path: 'new-comer', component: NewComerComponent,
    canActivate: [canActivateNotLoggedIn]},
  { path: 'login', component: LoginComponent, data: { animation: 'Login' }},
  { path: 'user', component: UserComponent, data: { animation: 'User' }},
  { path: 'videos', component: VideosComponent, data: { animation: 'Videos' }},
  { path: 'videos/:id', component: VideoComponent, data: { animation: 'Video' }},
  { path: 'calendar', component: MonthlyCalendarComponent, data: { animation: 'MonthlyCalendar' }},
  { path: 'calendar/:date', component: TodayCalendarComponent, data: { animation: 'TodayCalendar' }},
  { path: 'widgets', component: WidgetsComponent, data: { animation: 'Widgets'}},
  { path: 'widgets/poll', component: PollComponent, data: { animation: 'Poll'}},
  { path: 'admin',
    component: AdminHomeComponent,
    data: { roles: [
      '/media-team', 
      '/pastor', 
      '/inland-his-admin', 
      '/welcome-team', 
      '/praise-team',
      '/cell-leader',
      '/campus-team']},
    canActivate: [canActivateProtectedRoutesV2], 
    children: [
      // {
      //   path: 'small-group-note', component: SmallGroupNotesAdminComponent,
      //   data: { roles: ['/media-team', '/pastor', '/inland-his-admin']},
      //   canActivate: [canActivateProtectedRoutesV2], 
      // },
      {
        path: 'bulletin/:date', component: BulletinPaperAdminComponent,
        data: { roles: ['/media-team', '/pastor', '/inland-his-admin']},
        canActivate: [canActivateProtectedRoutesV2], 
      },
      {
        path: 'bulletins', component: BulletinsComponent,
        data: { roles: ['/media-team', '/pastor', '/inland-his-admin']},
        canActivate: [canActivateProtectedRoutesV2], 
      },
      {
        path: 'small-group', component: SmallGroupMembersComponent,
        data: { roles: ['/welcome-team', '/pastor', '/inland-his-admin']},
        canActivate: [canActivateProtectedRoutesV2], 
      },
      {
        path: 'small-group-search/:id', component: SmallGroupMembersSearchComponent,
        data: { roles: ['/welcome-team', '/pastor', '/inland-his-admin']},
        canActivate: [canActivateProtectedRoutesV2], 
      },
      {
        path: 'calendar', component: CalendarComponent,
        data: { roles: ['/welcome-team', '/pastor', '/inland-his-admin', '/praise-team', '/media-team', '/campus-team']},
        canActivate: [canActivateProtectedRoutesV2]
      },
      {
        path: 'admit-members', component: AdmitNewMemberComponent,
        data: { roles: ['/welcome-team', '/pastor', '/inland-his-admin']},
        canActivate: [canActivateProtectedRoutesV2]
      },
      {
        path: 'assign-team-member', component: AssignTeamMemberComponent,
        data: { roles: ['/welcome-team/leader', '/pastor', '/inland-his-admin', '/praise-team/leader', '/media-team/leader']},
        canActivate: [canActivateProtectedRoutesV2]
      },
      {
        path: 'member-contact', component: MemberContactsComponent,
        data: { roles: ['/welcome-team/leader', '/pastor', '/inland-his-admin', 'cell-leader']},
        canActivate: [canActivateProtectedRoutesV2]
      }
    ]
  },
  { path: '**', redirectTo: '/' },
  
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
