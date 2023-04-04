import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-pull-to-refresh',
  templateUrl: './pull-to-refresh.component.html',
  styleUrls: ['./pull-to-refresh.component.scss']
})
export class PullToRefreshComponent {
  @Output() refresh = new EventEmitter<void>();
  indicatorActive = false;
  private startY: number | null = null;
  private threshold = 70;

  onPan(event: any): void {
    const { srcEvent, deltaY } = event;
    if (srcEvent instanceof TouchEvent) {
      const { target } = srcEvent;

      if (target instanceof HTMLElement) {
        const scrollTop = target.scrollTop;

        if (scrollTop === 0) {
          if (this.startY === null) {
            this.startY = srcEvent.touches[0].clientY;
          }

          const translateY = Math.max(0, deltaY - this.startY);

          if (translateY >= 0) {
            target.style.transform = `translateY(${translateY}px)`;
            this.indicatorActive = translateY > this.threshold;

            if (translateY > this.threshold && event.isFinal) {
              this.refresh.emit();
            }
          }
        } else {
          this.startY = null;
        }
      }
    }

    if (event.isFinal) {
      this.startY = null;
      this.indicatorActive = false;
      if (srcEvent.target instanceof HTMLElement) {
        srcEvent.target.style.transform = '';
      }
    }
  }
}
