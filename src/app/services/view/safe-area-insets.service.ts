import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SafeAreaInsetsService {
  constructor() {
    this.updateSafeAreaInsets();
    window.addEventListener('resize', this.updateSafeAreaInsets.bind(this));
    window.addEventListener('orientationchange', this.updateSafeAreaInsets.bind(this));
  }

  updateSafeAreaInsets(): void {
    const safeAreaInsetBottom = Math.max(window.innerHeight - document.documentElement.clientHeight, 0);
    document.documentElement.style.setProperty('--safe-area-inset-bottom', safeAreaInsetBottom + 'px');
  }
}
