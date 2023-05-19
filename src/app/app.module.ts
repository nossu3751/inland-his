import { BrowserModule, HammerModule } from '@angular/platform-browser';
import { NgModule, isDevMode} from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
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
import { FlexContainerComponent } from './components/shared/flex-container/flex-container.component';
import { FlexItemComponent } from './components/shared/flex-item/flex-item.component';
import { CardComponent } from './components/shared/card/card.component';
import { SafeUrlPipe } from './pipes/safe-url.pipe';
import { PreventContextMenuDirective } from './directives/prevent-context-menu.directive';
import { BibleSvgComponent } from './components/shared/svg/bible-svg/bible-svg.component';
import { NoteSvgComponent } from './components/shared/svg/note-svg/note-svg.component';
import { LeafletSvgComponent } from './components/shared/svg/leaflet-svg/leaflet-svg.component';
import { PrayerSvgComponent } from './components/shared/svg/prayer-svg/prayer-svg.component';
import { LoginComponent } from './components/core/login/login.component';
import { SigninComponent } from './components/core/signin/signin.component';
import { NewComerFormComponent } from './components/core/new-comer-form/new-comer-form.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import { RouteModalComponent } from './components/shared/route-modal/route-modal.component';
import { MatDialogModule} from '@angular/material/dialog';
import { RouteModalOpenLogicDirective } from './directives/route-modal-open-logic.directive';
import { CloseButtonComponent } from './components/shared/close-button/close-button.component';
import { VideoAreaComponent } from './components/core/video-area/video-area.component'
import { HttpClientModule } from '@angular/common/http';
import { YouTubePlayer, YouTubePlayerModule } from '@angular/youtube-player';
import { VideoPlayerComponent } from './components/shared/video-player/video-player.component';
import { VideoListComponent } from './components/shared/video-list/video-list.component';
import { NavigateBackDirective } from './directives/navigate-back.directive';
import { OnlineServiceComponent } from './components/core/online-service/online-service.component';
import { SmallGroupNotesAdminComponent } from './components/admin/small-group/small-group-notes-admin/small-group-notes-admin.component';
import { AdminHomeComponent } from './components/admin/admin-home/admin-home.component';
import { SmallGroupNoteComponent } from './components/core/small-group-note/small-group-note.component';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { NgxSummernoteModule } from 'ngx-summernote';
import { CustomModalComponent } from './components/shared/custom-modal/custom-modal.component';
import { ContentViewComponent } from './components/shared/content-view/content-view.component';
import { SmallGroupJsonParseComponent } from './components/core/small-group-json-parse/small-group-json-parse.component';
import { BulletinPaperAdminComponent } from './components/admin/bulletin/bulletin-paper/bulletin-paper-admin.component';
import { LoadingScreenComponent } from './components/shared/loading-screen/loading-screen.component';
import { BulletinPaperComponent } from './components/core/bulletin-paper/bulletin-paper.component';
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
    FlexContainerComponent,
    FlexItemComponent,
    CardComponent,
    SafeUrlPipe,
    PreventContextMenuDirective,
    BibleSvgComponent,
    NoteSvgComponent,
    LeafletSvgComponent,
    PrayerSvgComponent,
    LoginComponent,
    SigninComponent,
    NewComerFormComponent,
    RouteModalComponent,
    RouteModalOpenLogicDirective,
    CloseButtonComponent,
    VideoAreaComponent,
    VideoPlayerComponent,
    VideoListComponent,
    NavigateBackDirective,
    OnlineServiceComponent,
    SmallGroupNotesAdminComponent,
    AdminHomeComponent,
    SmallGroupNoteComponent,
    CustomModalComponent,
    ContentViewComponent,
    SmallGroupJsonParseComponent,
    BulletinPaperAdminComponent,
    LoadingScreenComponent,
    BulletinPaperComponent,
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
    NgbModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    MatNativeDateModule,
    MatDialogModule,
    HttpClientModule,
    YouTubePlayerModule,
    CKEditorModule,
    NgxSummernoteModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

