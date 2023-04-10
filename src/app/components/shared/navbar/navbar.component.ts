import { Component, OnInit, HostListener } from '@angular/core';
import { Router, ActivatedRoute, IsActiveMatchOptions, NavigationEnd } from '@angular/router';
import { HoverService } from 'src/app/services/view/hover.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})

export class NavbarComponent implements OnInit{

  constructor(private router: Router, private activatedRoute: ActivatedRoute, private hoverService: HoverService){
    this.updateCurrentRouteName();
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.updateCurrentRouteName();
      }
    });

  }

  // routeNameMap = new Map<string, string>([
  //   ["/","HOME"],
  //   ["/small_group","셀"],
  //   ["/ministries","사역"],
  //   ["/offering","온라인헌금"],
  //   ["/verses","말씀"],
  //   ["/bulletin","주보"]
  // ])

  webNavItems = [
    { route: '/', label:"HOME"},
    // { route: '/about', icon: 'info', tooltip: 'About', label:"소개" },
    { route: '/small_group', label:"셀"},
    { route: '/ministries', label:"사역"},
    { route: '/offering', label:"온라인헌금" },
    { route: '/verses', label: "말씀"},
    { route: '/new-comer', label: "새신자등록"},
    { route: '/bulletin', label: "주보"}
  ]

  mobileNavItems = [
    { route: '/', icon: 'home', tooltip: 'Home', label:"HOME"},
    // { route: '/about', icon: 'info', tooltip: 'About', label:"소개" },
    { route: '/small_group', icon: 'group', tooltip: 'Small Group', label:"셀"},
    { route: '/ministries', icon: 'favorite', tooltip: 'Ministries', label:"사역"},
    { route: '/offering', icon: 'volunteer_activism', tooltip: 'Offering', label:"온라인헌금" },
    { route: '/verses', icon: 'menu_book', tooltip: 'Verses', label: "말씀"}
  ];

  currentRouteName = '';
  screenSizeClass = '';

  private checkScreenSize() {
    this.screenSizeClass = window.innerWidth >= 960 ? 'large-screen' : ''; // Set the breakpoint you need (e.g., 768px)
  }

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

  @HostListener('window:resize')
  onResize() {
    this.checkScreenSize();
  }

  ngOnInit() {
    this.checkScreenSize();
  }
  // isLinkActive(route: string): boolean {
  //   return this.router.isActive(route,true)
  // }
}


// import { Component } from '@angular/core';
// import { Router, ActivatedRoute } from '@angular/router';

// @Component({
//   selector: 'app-navbar',
//   templateUrl: './navbar.component.html',
//   styleUrls: ['./navbar.component.scss']
// })
// export class NavbarComponent {
//   // ...

//   constructor(private router: Router, private activatedRoute: ActivatedRoute) {}

//   isLinkActive(route: string): boolean {
//     const currentRoute = this.router.url.split('?')[0];
//     return currentRoute === route;
//   }
// }
