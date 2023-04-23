import { Component, OnInit } from '@angular/core';
import { ScreenSizeService } from '../services/view/screen-size.service'


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit{
  
  constructor(
    private screenSizeService: ScreenSizeService,
    
  ) {}
  screenSizeClass = '';

  ngOnInit() {
    this.screenSizeService.screenSizeClass$.subscribe((screenSizeClass) => {
      this.screenSizeClass = screenSizeClass;
    });
    
  }
}
