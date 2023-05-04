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
    { route: '/bulletin', icon: 'format_list_bulleted', tooltip: 'Bulletin', label:"주보"},
    { route: '/offering', icon: 'volunteer_activism', tooltip: 'Offering', label:"헌금" },
    { route: '/verses', icon: 'menu_book', tooltip: 'Verses', label: "말씀"}
  ];

}
