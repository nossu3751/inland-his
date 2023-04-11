import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appPreventContextMenu]'
})
export class PreventContextMenuDirective {
  private touchDuration: number;
  private touchTimer: any;

  constructor(private el: ElementRef) {
    this.touchDuration = 300; // Time in milliseconds to trigger a long press
  }

  @HostListener('contextmenu', ['$event'])
  onContextMenu(event: MouseEvent) {
    event.preventDefault();
  }

  @HostListener('touchstart', ['$event'])
  onTouchStart(event: TouchEvent) {
    this.touchTimer = setTimeout(() => {
      event.preventDefault();
    }, this.touchDuration);
  }

  @HostListener('touchend', ['$event'])
  onTouchEnd(event: TouchEvent) {
    clearTimeout(this.touchTimer);
  }

  @HostListener('touchmove', ['$event'])
  onTouchMove(event: TouchEvent) {
    event.preventDefault();
  }
}
