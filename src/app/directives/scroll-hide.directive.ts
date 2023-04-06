import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appScrollHide]'
})
export class ScrollHideDirective {
  private lastScrollTop = 0;
  private timeoutId: any;

  constructor(private el: ElementRef, private renderer: Renderer2) {
    this.renderer.addClass(this.el.nativeElement, 'hide-on-scroll');
  }

  @HostListener('window:scroll', ['$event'])
  onScroll() {
    const currentScrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const isMobile = window.innerWidth <= 959; // Set the breakpoint value for mobile devices
    const scrollingDown = currentScrollTop > this.lastScrollTop;

    if (isMobile) {
      const translateY = scrollingDown ? -currentScrollTop : 0;
      this.renderer.setStyle(this.el.nativeElement, 'transform', `translateY(${translateY}px)`);
    } else {
      if (scrollingDown) {
        if (this.timeoutId) {
          clearTimeout(this.timeoutId);
        }

        this.renderer.removeClass(this.el.nativeElement, 'fade-out');
        this.renderer.addClass(this.el.nativeElement, 'fade-in');

        this.timeoutId = setTimeout(() => {
          this.renderer.removeClass(this.el.nativeElement, 'fade-in');
          this.renderer.addClass(this.el.nativeElement, 'fade-out');
        }, 2000); // Adjust the time in milliseconds as per your requirement
      }
    }

    this.lastScrollTop = currentScrollTop;
  }
}
