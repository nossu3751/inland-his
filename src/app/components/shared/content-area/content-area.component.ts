import { Component, OnInit } from '@angular/core';
import { ScreenSizeService } from 'src/app/services/view/screen-size.service';
import { HoverService } from 'src/app/services/view/hover.service';

@Component({
  selector: 'app-content-area',
  templateUrl: './content-area.component.html',
  styleUrls: ['./content-area.component.scss']
})
export class ContentAreaComponent implements OnInit{
  constructor(
    private screenSizeService: ScreenSizeService,
    private hoverService: HoverService) {
      this.hoverService.hoverStatus$.subscribe((status) => {
        this.isHovered = status;
      })
  }

  screenSizeClass = '';
  isHovered = false;

  ngOnInit() {
    // this.checkScreenSize();
    this.screenSizeService.screenSizeClass$.subscribe((screenSizeClass) => {
      this.screenSizeClass = screenSizeClass;
    });
  }
}
