import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { HoverService } from 'src/app/services/view/hover.service';
import { ScreenSizeService } from 'src/app/services/view/screen-size.service';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { MatSidenav } from '@angular/material/sidenav';
import { ModalService } from 'src/app/services/view/modal.service';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { RightSidebarComponent } from '../right-sidebar/right-sidebar.component';
import { Location } from '@angular/common';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { BehaviorSubject } from 'rxjs';
@Component({
  selector: 'app-top-navbar',
  templateUrl: './top-navbar.component.html',
  styleUrls: ['./top-navbar.component.scss'],
  animations: [
    trigger('fadeInOut', [
      state('void', style({
        opacity: 0
      })),
      transition('void <=> *', animate(300)),
    ])
  ]
})
export class TopNavbarComponent implements OnInit{

  constructor(
    private screenSizeService: ScreenSizeService,
    private hoverService: HoverService,
    private router:Router,
    private activatedRoute:ActivatedRoute,
    public modalService:ModalService,
    private location:Location
  ) {
    this.updateCurrentRouteName();
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.updateCurrentRouteName();
      }
    });
  }
  
  @Output() menuClick = new EventEmitter();
  screenSizeClass = '';
  currentRouteName = '';
  hasBackPage:boolean = false;
  date:BehaviorSubject<string> = new BehaviorSubject("");
  sidebarComponent = SidebarComponent;
  rightSidebarComponent = RightSidebarComponent

  webNavItems = [
    // { route: '/', label:"HOME"},
    { route: '/small-group', label:"셀"},
    { route: '/ministries', label:"사역"},
    { route: '/offering', label:"헌금" },
    { route: '/verses', label: "말씀"},
    { route: '/new-comer', label: "새신자등록"},
    { route: '/bulletin', label: "주보"},
    { route: '/videos', label: "예배"},
    { route: '/login', label: "Login"}
    
  ]

  navItemMap = new Map<string, string>([
    ["/","HOME"],
    ["/small-group","셀"],
    ["/ministries","사역"],
    ["/offering","헌금"],
    ["/verses","말씀"],
    ["/bulletin","주보"],
    ["/new-comer","새신자등록"],
    ["/videos", "예배"],
    ["/login", "로그인"],
    ["/user", "유저"],
    ["/calendar", "캘린더"],
    ["/widgets", "위젯"],
    ["/widgets/poll", "투표"]
  ])

  private updateCurrentRouteName() {
    const currentRoute = this.activatedRoute.snapshot.firstChild;
    if (currentRoute && currentRoute.routeConfig) {
      this.currentRouteName = currentRoute.routeConfig.path || '';
    } else {
      this.currentRouteName = '';
    }
    console.log(this.currentRouteName)
    if(this.currentRouteName.includes(":") || this.currentRouteName == "login" || this.currentRouteName == "user"){
      this.hasBackPage = true;
    }else{
      this.hasBackPage = false;
    }
    if(this.currentRouteName === "calendar/:date"){
      if (currentRoute && currentRoute.params && "date" in currentRoute.params) {
        this.date.next(currentRoute.params["date"])
      }
      
      // currentRoute?.params.subscribe((params) => {
      //   console.log(params)
      //       this.date.next(String(params['date']));
      //   }
      // )
      this.activatedRoute.params.subscribe((param)=>{
        
            
      })
    }
    console.log("Current route name", this.currentRouteName)
  }

  updateHoverStatus(status: boolean): void {
    this.hoverService.updateHoverStatus(status)
  }

  onMenuClick() {
    this.menuClick.emit();
  }

  goHome() {
    this.router.navigateByUrl("/")
  }

  goBack() {
    // if(this.hasBackPage){
    //   let urlSegments = this.router.url.split('/');
    //   urlSegments.pop();
    //   let url = urlSegments.join('/');
    //   this.router.navigateByUrl(url)
    // }
    if (this.currentRouteName == "login"){
      this.router.navigateByUrl("/")
    }else{
      this.location.back()
    }
    
    
  }





  ngOnInit(): void {
    
    this.screenSizeService.screenSizeClass$.subscribe((screenSizeClass) => {
      this.screenSizeClass = screenSizeClass;
    });
  }
}
