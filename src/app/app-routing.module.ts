import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Import your components here
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { SmallGroupComponent } from './small-group/small-group.component';
import { OfferingComponent} from './offering/offering.component';
import { MinistriesComponent } from './ministries/ministries.component';
import { VersesComponent } from './verses/verses.component';
import { BulletinComponent } from './components/core/bulletin/bulletin.component';
import { NewComerComponent } from './components/core/new-comer/new-comer.component';
import { LoginComponent } from './components/core/login/login.component';
import { SigninComponent } from './components/core/signin/signin.component';
import { OnlineServiceComponent } from './components/core/online-service/online-service.component';
import { AdminHomeComponent } from './components/admin/admin-home/admin-home.component';
import { SmallGroupNotesAdminComponent } from './components/admin/small-group/small-group-notes-admin/small-group-notes-admin.component';
import { BulletinPaperAdminComponent } from './components/admin/bulletin/bulletin-paper/bulletin-paper-admin.component';
// ...

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'small-group', component: SmallGroupComponent },
  { path: 'offering', component: OfferingComponent },
  { path: 'ministries', component: MinistriesComponent },
  { path: 'verses', component: VersesComponent },
  { path: 'bulletin', component: BulletinComponent},
  { path: 'new-comer', component: NewComerComponent},
  { path: 'login', component: LoginComponent},
  { path: 'signin', component: SigninComponent},
  { path: 'online-service', component: OnlineServiceComponent},
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
