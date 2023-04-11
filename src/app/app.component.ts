import { Component, OnInit, HostListener, Renderer2, ElementRef } from '@angular/core';
import { ScreenSizeService } from './services/view/screen-size.service'
import { HoverService } from './services/view/hover.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  constructor(
    private screenSizeService: ScreenSizeService,
    private hoverService: HoverService) {
      this.hoverService.hoverStatus$.subscribe((status) => {
        this.isHovered = status;
      })
    }

  name = 'User';
  title = '인랜드히즈'
  isLoading = false;
  ptrIndicator = '<div class="indicator"></div>';
  screenSizeClass = '';
  isHovered = false;

  ngOnInit() {
    // this.checkScreenSize();
    this.screenSizeService.screenSizeClass$.subscribe((screenSizeClass) => {
      this.screenSizeClass = screenSizeClass;
    });
  }

  onRefresh() {
    // Your refresh logic goes here
    // Call refresh() when the refresh is complete
    setTimeout(() => {
      
    }, 2000);
  }
}
