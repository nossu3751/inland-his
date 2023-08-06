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
    { route: '/calendar', icon: 'calendar_month', tooltip: 'Small Group', label:"달력"},
    // { route: '/ministries', icon: 'favorite', tooltip: 'Ministries', label:"사역"},
    { route: '/bulletin', icon: 'map_outline', tooltip: 'Bulletin', label:"주보"},
    { route: '/videos', icon: 'live_tv', tooltip: 'Offering', label:"예배" },
    { route: '/widgets', icon: 'widgets', tooltip: 'Verses', label: "위젯"}
  ];

}
