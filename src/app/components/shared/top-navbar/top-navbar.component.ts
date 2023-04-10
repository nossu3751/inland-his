import { Component, OnInit } from '@angular/core';
import { HoverService } from 'src/app/services/view/hover.service';
import { ScreenSizeService } from 'src/app/services/view/screen-size.service';

@Component({
  selector: 'app-top-navbar',
  templateUrl: './top-navbar.component.html',
  styleUrls: ['./top-navbar.component.scss']
})
export class TopNavbarComponent implements OnInit{

  constructor(
    private screenSizeService: ScreenSizeService,
    private hoverService: HoverService) {}

  screenSizeClass = '';

  webNavItems = [
    { route: '/', label:"HOME"},
    { route: '/small_group', label:"셀"},
    { route: '/ministries', label:"사역"},
    { route: '/offering', label:"온라인헌금" },
    { route: '/verses', label: "말씀"},
    { route: '/new-comer', label: "새신자등록"},
    { route: '/bulletin', label: "주보"}
  ]

  updateHoverStatus(status: boolean): void {
    this.hoverService.updateHoverStatus(status)
  }

  ngOnInit(): void {
    this.screenSizeService.screenSizeClass$.subscribe((screenSizeClass) => {
      this.screenSizeClass = screenSizeClass;
    });
  }
}
