import { Component } from '@angular/core';

@Component({
  selector: 'app-bottom-navbar',
  templateUrl: './bottom-navbar.component.html',
  styleUrls: ['./bottom-navbar.component.scss']
})
export class BottomNavbarComponent {

  constructor() {}

  mobileNavItems = [
    // { route: '/', icon: 'home', tooltip: 'Home', label:"HOME"},
    // { route: '/about', icon: 'info', tooltip: 'About', label:"소개" },
    { route: '/small-group', icon: 'group', tooltip: 'Small Group', label:"셀"},
    // { route: '/ministries', icon: 'favorite', tooltip: 'Ministries', label:"사역"},
    { route: '/bulletin', icon: 'map_outline', tooltip: 'Bulletin', label:"주보"},
    { route: '/online-service', icon: 'live_tv', tooltip: 'Offering', label:"예배" },
    { route: '/verses', icon: 'menu_book', tooltip: 'Verses', label: "말씀"}
  ];

}
