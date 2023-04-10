import { Component, OnInit } from '@angular/core';
import { ScreenSizeService } from '../../../services/view/screen-size.service'

@Component({
  selector: 'app-nav-padded-block',
  templateUrl: './nav-padded-block.component.html',
  styleUrls: ['./nav-padded-block.component.scss']
})
export class NavPaddedBlockComponent implements OnInit{
  constructor(private screenSizeService: ScreenSizeService) {}
  screenSizeClass = '';

  ngOnInit() {
    // this.checkScreenSize();
    this.screenSizeService.screenSizeClass$.subscribe((screenSizeClass) => {
      this.screenSizeClass = screenSizeClass;
    });
  }
}
