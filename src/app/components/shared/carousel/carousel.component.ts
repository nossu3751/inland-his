import { Component, Input, HostListener } from '@angular/core';
import { trigger, transition, style, animate, query } from '@angular/animations';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss'],
  animations: [
    trigger('slideAnimation', [
      transition(':increment', [
        query(':nth-child(2)', [style({opacity: 0, position: 'absolute', left: '-100%'})]),
        query(':nth-child(1)', [
          style({position: 'relative'}),
          animate('700ms ease-out', style({opacity: 0})),
          animate('700ms ease-out', style({left: '-100%'}))
        ], {optional: true}),
        query(':nth-child(2)', [
          style({position: 'relative', left: '100%', opacity: 1}),
          animate('700ms ease-out', style({left: '0%'}))
        ])
      ]),
      transition(':decrement', [
        query(':nth-child(1)', [style({opacity: 0, position: 'absolute', left: '100%'})]),
        query(':nth-child(2)', [
          style({position: 'relative'}),
          animate('700ms ease-out', style({opacity: 0})),
          animate('700ms ease-out', style({left: '100%'}))
        ], {optional: true}),
        query(':nth-child(1)', [
          style({position: 'relative', left: '-100%', opacity: 1}),
          animate('700ms ease-out', style({left: '0%'}))
        ])
      ])
    ])
    
  ]
  
})
export class CarouselComponent {
  @Input() images: string[] = [
    'https://picsum.photos/800/600?random=1',
    'https://picsum.photos/800/600?random=2',
    'https://picsum.photos/800/600?random=3'
  ];
  currentSlideIndex = 0;
  previousSlideIndex = this.images.length - 1;
  nextSlideIndex = (this.currentSlideIndex + 1) % this.images.length;

  autoplayInterval = 5000;
  autoplayIntervalId:any;

  private touchStartX: number = 0;
  private touchEndX: number = 0;

  constructor() {
    setInterval(() => {
      this.onNextSlide();
    }, this.autoplayInterval);
  }

  resetAutoplayInterval() {
    clearInterval(this.autoplayIntervalId);

    this.autoplayIntervalId = setInterval(() => {
      this.onNextSlide();
    }, this.autoplayInterval);
    
    // this.autoplayIntervalId = setInterval(() => {
    //   this.onNextSlide();
    // }, this.autoplayInterval);
  }

  @HostListener('touchstart', ['$event'])
  onTouchStart(event: TouchEvent) {
    this.touchStartX = event.touches[0].clientX;
  }

  @HostListener('touchmove', ['$event'])
  onTouchMove(event: TouchEvent) {
    this.touchEndX = event.touches[0].clientX;
  }

  @HostListener('touchend', ['$event'])
  onTouchEnd(event: TouchEvent) {
    const deltaX = this.touchEndX - this.touchStartX;
    const threshold = 100;

    if (deltaX > threshold) {
      this.onPrevSlide();
    } else if (deltaX < -threshold) {
      this.onNextSlide();
    }
  }

  onNextSlide() {
    this.previousSlideIndex = this.currentSlideIndex;
    this.currentSlideIndex = this.nextSlideIndex;
    this.nextSlideIndex = (this.currentSlideIndex + 1) % this.images.length;
    this.resetAutoplayInterval();
  }

  onPrevSlide() {
    this.nextSlideIndex = this.currentSlideIndex;
    this.currentSlideIndex = this.previousSlideIndex;
    this.previousSlideIndex = (this.previousSlideIndex - 1 + this.images.length) % this.images.length;
    this.resetAutoplayInterval();
  }
}

