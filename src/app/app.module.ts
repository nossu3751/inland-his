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
import { SmallGroupComponent } from './components/core/small-group/small-group.component';
import { OfferingComponent } from './components/core/offering/offering.component';
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
import { NGX_MAT_DATE_FORMATS, NgxMatDateFormats, NgxMatDatetimePickerModule, NgxMatTimepickerModule } from '@angular-material-components/datetime-picker';
import { NgxMatNativeDateModule } from '@angular-material-components/datetime-picker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import { RouteModalComponent } from './components/shared/route-modal/route-modal.component';
import { MatDialogModule} from '@angular/material/dialog';
import { RouteModalOpenLogicDirective } from './directives/route-modal-open-logic.directive';
import { CloseButtonComponent } from './components/shared/close-button/close-button.component';
import { VideoAreaComponent } from './components/core/video-area/video-area.component'
import { HttpClientModule } from '@angular/common/http';
import { YouTubePlayerModule } from '@angular/youtube-player';
import { VideoPlayerComponent } from './components/shared/video-player/video-player.component';
import { VideoListComponent } from './components/shared/video-list/video-list.component';
import { NavigateBackDirective } from './directives/navigate-back.directive';
import { VideosComponent } from './components/core/videos/videos.component';
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
import { SearchBarComponent } from './components/shared/search-bar/search-bar.component';
import { AlertModalComponent } from './components/shared/alert-modal/alert-modal.component';
import { OfferingRedirectionComponent } from './components/alerts/offering-redirection/offering-redirection.component';
import { VideoComponent } from './components/core/video/video.component';
import { ClipboardModule } from '@angular/cdk/clipboard'
import { MatSnackBarModule } from '@angular/material/snack-bar'
import { MatSidenavModule} from '@angular/material/sidenav';
import { SidebarComponent } from './components/shared/sidebar/sidebar.component';
import { PageNotFoundComponent } from './components/shared/page-not-found/page-not-found.component';
import { SearchPageComponent } from './components/core/search-page/search-page.component'
import { ExistingPersonComponent } from './components/alerts/existing-person/existing-person.component';
import { SignupSuccessComponent } from './components/shared/signup-success/signup-success.component';
import { RightSidebarComponent } from './components/shared/right-sidebar/right-sidebar.component';
import { CodeInputComponent } from './components/shared/code-input/code-input.component';
import { UserComponent } from './components/core/user/user.component';
import { SmallGroupInfoComponent } from './components/core/small-group-info/small-group-info.component';
import { LogoutConfirmationComponent } from './components/alerts/logout-confirmation/logout-confirmation.component';
import { ProfileManagerComponent } from './components/shared/profile-manager/profile-manager.component';
import { ImageCropperModule } from 'ngx-image-cropper';
import { SmallGroupMembersComponent } from './components/admin/small-group/small-group-members/small-group-members.component';
import { AdminContentAreaComponent } from './components/admin/shared/admin-content-area/admin-content-area.component';
import { SmallGroupMembersSearchComponent } from './components/admin/small-group/small-group-members-search/small-group-members-search.component';
import { FullCalendarModule } from '@fullcalendar/angular';
import { MonthlyCalendarComponent } from './components/core/monthly-calendar/monthly-calendar.component';
import { TodayCalendarComponent } from './components/core/today-calendar/today-calendar.component';
import { CalendarComponent } from './components/admin/calendar/calendar.component';
import { BibleRedirectionComponent } from './components/alerts/bible-redirection/bible-redirection.component';
import { AdmitNewMemberComponent } from './components/admin/member/admit-new-member/admit-new-member.component';
import { AssignTeamMemberComponent } from './components/admin/member/assign-team-member/assign-team-member.component';
import { BulletinsComponent } from './components/admin/bulletin/bulletins/bulletins.component';
import { AdminTopNavbarComponent } from './components/admin/shared/admin-top-navbar/admin-top-navbar.component';
import { MemberContactsComponent } from './components/admin/small-group/member-contacts/member-contacts.component';
import { WidgetsComponent } from './components/core/widgets/widgets.component';
import { PollComponent } from './components/core/poll/poll.component';
import { QtRedirectionComponent } from './components/alerts/qt-redirection/qt-redirection.component';
import { UpdateNoteComponent } from './components/alerts/update-note/update-note.component';
import { UpdatesComponent } from './components/shared/updates/updates.component'
// import { Mat}

const INTL_DATE_INPUT_FORMAT = {
  year: 'numeric',
  month: 'numeric',
  day: 'numeric',
  hourCycle: 'h23',
  hour: '2-digit',
  minute: '2-digit',
};

const MAT_DATE_FORMATS: NgxMatDateFormats = {
  parse: {
    dateInput: INTL_DATE_INPUT_FORMAT,
  },
  display: {
    dateInput: INTL_DATE_INPUT_FORMAT,
    monthYearLabel: { year: 'numeric', month: 'short' },
    dateA11yLabel: { year: 'numeric', month: 'long', day: 'numeric' },
    monthYearA11yLabel: { year: 'numeric', month: 'long' },
  },
};

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    SmallGroupComponent,
    OfferingComponent,
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
    VideosComponent,
    SmallGroupNotesAdminComponent,
    AdminHomeComponent,
    SmallGroupNoteComponent,
    CustomModalComponent,
    ContentViewComponent,
    SmallGroupJsonParseComponent,
    BulletinPaperAdminComponent,
    LoadingScreenComponent,
    BulletinPaperComponent,
    SearchBarComponent,
    AlertModalComponent,
    OfferingRedirectionComponent,
    VideoComponent,
    SidebarComponent,
    PageNotFoundComponent,
    SearchPageComponent,
    ExistingPersonComponent,
    SignupSuccessComponent,
    RightSidebarComponent,
    CodeInputComponent,
    UserComponent,
    SmallGroupInfoComponent,
    LogoutConfirmationComponent,
    ProfileManagerComponent,
    SmallGroupMembersComponent,
    AdminContentAreaComponent,
    SmallGroupMembersSearchComponent,
    MonthlyCalendarComponent,
    TodayCalendarComponent,
    CalendarComponent,
    BibleRedirectionComponent,
    AdmitNewMemberComponent,
    AssignTeamMemberComponent,
    BulletinsComponent,
    AdminTopNavbarComponent,
    MemberContactsComponent,
    WidgetsComponent,
    PollComponent,
    QtRedirectionComponent,
    UpdateNoteComponent,
    UpdatesComponent,
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
    MatNativeDateModule,
    MatFormFieldModule,
    MatInputModule,
    MatNativeDateModule,
    MatDialogModule,
    HttpClientModule,
    YouTubePlayerModule,
    CKEditorModule,
    NgxSummernoteModule,
    ClipboardModule,
    MatSnackBarModule,
    MatSidenavModule,
    ImageCropperModule,
    FullCalendarModule,
    NgxMatDatetimePickerModule,
    NgxMatTimepickerModule,
    NgxMatNativeDateModule
  ],
  providers: [
    { provide: NGX_MAT_DATE_FORMATS, useValue: MAT_DATE_FORMATS }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

