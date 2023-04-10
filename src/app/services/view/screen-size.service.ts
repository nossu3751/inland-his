import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ScreenSizeService {
  private screenSizeClassSource = new BehaviorSubject<string>('');
  screenSizeClass$ = this.screenSizeClassSource.asObservable();

  constructor() {
    this.checkScreenSize();
    window.addEventListener('resize', () => this.checkScreenSize());
  }

  private checkScreenSize() {
    const screenSizeClass = window.innerWidth >= 960 ? 'large-screen' : '';
    this.screenSizeClassSource.next(screenSizeClass);
  }
}
