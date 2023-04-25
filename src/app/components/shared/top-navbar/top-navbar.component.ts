import { Component, OnInit } from '@angular/core';
import { HoverService } from 'src/app/services/view/hover.service';
import { ScreenSizeService } from 'src/app/services/view/screen-size.service';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-top-navbar',
  templateUrl: './top-navbar.component.html',
  styleUrls: ['./top-navbar.component.scss']
})
export class TopNavbarComponent implements OnInit{

  constructor(
    private screenSizeService: ScreenSizeService,
    private hoverService: HoverService,
    private router:Router,
    private activatedRoute:ActivatedRoute 
  ) {
    this.updateCurrentRouteName();
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.updateCurrentRouteName();
      }
    });
  }

  screenSizeClass = '';
  currentRouteName = '';

  webNavItems = [
    // { route: '/', label:"HOME"},
    { route: '/small-group', label:"셀"},
    { route: '/ministries', label:"사역"},
    { route: '/offering', label:"헌금" },
    { route: '/verses', label: "말씀"},
    { route: '/new-comer', label: "새신자등록"},
    { route: '/bulletin', label: "주보"},
    { route: '/online-service', label: "예배"},
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
    ["/online-service", "예배"]
  ])

  private updateCurrentRouteName() {
    const currentRoute = this.activatedRoute.snapshot.firstChild;
    if (currentRoute && currentRoute.routeConfig) {
      this.currentRouteName = currentRoute.routeConfig.path || '';
    } else {
      this.currentRouteName = '';
    }
  }

  updateHoverStatus(status: boolean): void {
    this.hoverService.updateHoverStatus(status)
  }

  ngOnInit(): void {
    this.screenSizeService.screenSizeClass$.subscribe((screenSizeClass) => {
      this.screenSizeClass = screenSizeClass;
    });
  }
}
