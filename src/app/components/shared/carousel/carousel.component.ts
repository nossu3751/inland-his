import { Component, Input, HostListener, ElementRef, OnInit, AfterViewInit, ChangeDetectorRef} from '@angular/core';
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

export class CarouselComponent implements OnInit, AfterViewInit{

  private heightProvided:boolean = false;

  @Input() images: string[] = [
    'assets/test-images/image1.png',
    'assets/test-images/image2.jpg',
  ];
  @Input() height: string | null = null;
  @Input() marginBottom: string = "1em";
  @Input() marginTop: string = "1em";
  @Input() marginLeft: string = "1em";
  @Input() marginRight: string = "1em";
  @Input() indicatorSize: string = "8px"
  @Input() autoPlay: boolean = true;
  @Input() width:string = "calc(" + this.height + " / 9 * 16)"
  
  currentSlideIndex = 0;
  previousSlideIndex = this.images.length - 1;
  nextSlideIndex = (this.currentSlideIndex + 1) % this.images.length;

  autoplayInterval = 5000;
  autoplayIntervalId:any;

  private touchStartX: number = 0;
  private touchEndX: number = 0;

  constructor(
    private el:ElementRef, 
    private changeDetectorRef: ChangeDetectorRef) {
    if(this.autoPlay){
      setInterval(() => {
        this.onNextSlide();
      }, this.autoplayInterval);
    }
  }

  resetAutoplayInterval() {
    clearInterval(this.autoplayIntervalId);
    this.autoplayIntervalId = setInterval(() => {
      this.onNextSlide();
    }, this.autoplayInterval);
    
  }

  getWidthInPixels(): number {
    const el = this.el.nativeElement as HTMLElement;
    const tempEl = document.createElement('div');
    tempEl.style.width = this.width;
    el.appendChild(tempEl);

    // Get the computed width in pixels
    const computedWidth = parseFloat(getComputedStyle(tempEl).width);

    // Remove the temporary element
    el.removeChild(tempEl);

    return computedWidth;
  }

  updateSize() {
    if (!this.heightProvided) {
      const widthInPixels = this.getWidthInPixels();
      const heightValue = widthInPixels * (9 / 16);
      this.height = heightValue + 'px';
    }
  }

  @HostListener('window:resize')
  @HostListener('window:orientationchange')
  onResize() {
    this.updateSize();
  }

  ngOnInit(): void {
      this.heightProvided = this.height != null;
  }

  ngAfterViewInit(): void {   
    this.updateSize()
    this.changeDetectorRef.detectChanges();
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
    if(this.autoPlay){
      this.resetAutoplayInterval();
    }
  }

  onPrevSlide() {
    this.nextSlideIndex = this.currentSlideIndex;
    this.currentSlideIndex = this.previousSlideIndex;
    this.previousSlideIndex = (this.previousSlideIndex - 1 + this.images.length) % this.images.length;
    if(this.autoPlay){
      this.resetAutoplayInterval();
    }
  }
}

