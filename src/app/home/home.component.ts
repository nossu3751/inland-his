import { Component, OnInit } from '@angular/core';
import { ScreenSizeService } from '../services/view/screen-size.service'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit{
  constructor(private screenSizeService: ScreenSizeService) {}
  screenSizeClass = '';

  // //This is just for testing purpose
  // iframeModalOpen: boolean = false;
  // iframeUrl: string = '';

  // openIframeModal(url: string) {
  //   this.iframeUrl = url;
  //   this.iframeModalOpen = true;
  // }
  // //

  ngOnInit() {
    // this.checkScreenSize();
    this.screenSizeService.screenSizeClass$.subscribe((screenSizeClass) => {
      this.screenSizeClass = screenSizeClass;
    });
  }
}
