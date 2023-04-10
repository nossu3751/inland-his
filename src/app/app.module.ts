import { BrowserModule, HammerModule } from '@angular/platform-browser';
import { NgModule, isDevMode} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ServiceWorkerModule } from '@angular/service-worker';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule} from '@angular/material/toolbar';
import { MatIconModule} from '@angular/material/icon';
import { NavbarComponent } from './components/shared/navbar/navbar.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { SmallGroupComponent } from './small-group/small-group.component';
import { OfferingComponent } from './offering/offering.component';
import { MinistriesComponent } from './ministries/ministries.component';
import { VersesComponent } from './verses/verses.component';
import { PullToRefreshComponent } from './pull-to-refresh/pull-to-refresh.component';
import { NgxPullToRefreshModule } from 'ngx-pull-to-refresh';
import { ScrollHideDirective } from './directives/scroll-hide.directive';
import { BibleVersesComponent } from './components/core/bible-verses/bible-verses.component';
import { BulletinComponent } from './components/core/bulletin/bulletin.component';
import { NewComerComponent } from './components/core/new-comer/new-comer.component';
import { BackgroundComponent } from './components/shared/background/background.component';
import { BlockComponent } from './components/shared/block/block.component';
import { NavPaddedBlockComponent } from './components/shared/nav-padded-block/nav-padded-block.component';
import { BottomNavbarComponent } from './components/shared/bottom-navbar/bottom-navbar.component';
import { TopNavbarComponent } from './components/shared/top-navbar/top-navbar.component';
import { ContentAreaComponent } from './components/shared/content-area/content-area.component';
import { HorizontalItemBoxComponent } from './components/shared/horizontal-item-box/horizontal-item-box.component';
import { CarouselComponent } from './components/shared/carousel/carousel.component';
import { LogoSvgComponent } from './components/shared/logo-svg/logo-svg.component';


// import { Mat}


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    AboutComponent,
    SmallGroupComponent,
    OfferingComponent,
    MinistriesComponent,
    VersesComponent,
    PullToRefreshComponent,
    ScrollHideDirective,
    BibleVersesComponent,
    BulletinComponent,
    NewComerComponent,
    BackgroundComponent,
    BlockComponent,
    NavPaddedBlockComponent,
    BottomNavbarComponent,
    TopNavbarComponent,
    ContentAreaComponent,
    HorizontalItemBoxComponent,
    CarouselComponent,
    LogoSvgComponent,
  
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    NgbModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: !isDevMode(),
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    }),
    BrowserAnimationsModule,
    MatIconModule,
    MatToolbarModule,
    MatTooltipModule,
    FlexLayoutModule,
    HammerModule,
    NgxPullToRefreshModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

