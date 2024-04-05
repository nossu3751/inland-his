import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ScrollService {

  constructor() { }

  smoothScrollToTop(selector: string, duration: number = 500) {
    const element = document.querySelector(selector);
    if (!element) return;

    const start = element.scrollTop;
    const startTime = performance.now();

    const animateScroll = (currentTime:number) => {
      const timeElapsed = currentTime - startTime;
      const fraction = timeElapsed / duration;
      const easeOutFraction = 1 - Math.pow(1 - fraction, 4);

      element.scrollTop = start + (0 - start) * easeOutFraction;

      if (timeElapsed < duration) window.requestAnimationFrame(animateScroll);
    };

    window.requestAnimationFrame(animateScroll);
  }
}
