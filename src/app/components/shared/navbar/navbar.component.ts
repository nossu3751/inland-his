import { Component, OnInit, HostListener } from '@angular/core';
import { Router, ActivatedRoute, IsActiveMatchOptions } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit{
  // constructor(private router: Router, private activatedRoute: ActivatedRoute){}
  navItems = [
    { route: '/', icon: 'home', tooltip: 'Home', label:"HOME"},
    // { route: '/about', icon: 'info', tooltip: 'About', label:"소개" },
    { route: '/small_group', icon: 'group', tooltip: 'Small Group', label:"셀"},
    { route: '/ministries', icon: 'favorite', tooltip: 'Ministries', label:"사역"},
    { route: '/offering', icon: 'volunteer_activism', tooltip: 'Offering', label:"온라인헌금" },
    { route: '/verses', icon: 'menu_book', tooltip: 'Verses', label: "말씀"}
  ];

  screenSizeClass = '';

  private checkScreenSize() {
    this.screenSizeClass = window.innerWidth >= 960 ? 'large-screen' : ''; // Set the breakpoint you need (e.g., 768px)
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
