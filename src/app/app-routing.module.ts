import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Import your components here
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { SmallGroupComponent } from './small-group/small-group.component';
import { OfferingComponent} from './offering/offering.component';
import { MinistriesComponent } from './ministries/ministries.component';
import { VersesComponent } from './verses/verses.component';
// ...

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'small_group', component: SmallGroupComponent },
  { path: 'offering', component: OfferingComponent },
  { path: 'ministries', component: MinistriesComponent },
  { path: 'verses', component: VersesComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
