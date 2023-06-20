import { Component, ElementRef, ViewChild, Input, Output, OnInit, OnChanges, HostListener, AfterViewInit, ChangeDetectorRef, SimpleChanges, EventEmitter} from '@angular/core';

@Component({
  selector: 'app-video-player',
  templateUrl: './video-player.component.html',
  styleUrls: ['./video-player.component.scss']
})
export class VideoPlayerComponent implements OnInit, OnChanges, AfterViewInit{

  constructor(private changeDetectorRef: ChangeDetectorRef){}

  apiLoaded = false;

  @Input()
  borderColor:string|null = "#eee"

  @Input()
  borderWidth:string|null = "1px"
  
  @Input()
  videoId:string|null = null
  
  @ViewChild('videoPlaceholderRef', {static: false}) 
  videoPlaceholderRef!: ElementRef;

  placeholderHeight:string = "auto";
  videoWidth:number = 0;
  videoHeight:number = 0;
  ready = false;

  @HostListener('window:resize')
  @HostListener('window:orientationchange')
  onResize() {
    this.updateScreenWidth();
    this.updateVideoWidth();
  }

  updateScreenWidth(){
    const videoWidth = this.videoPlaceholderRef.nativeElement.offsetWidth;
    this.placeholderHeight = videoWidth / 16 * 9 + "px";
    console.log(this.placeholderHeight)
  }

  updateVideoWidth(){
    const videoWidth = this.videoPlaceholderRef.nativeElement.offsetWidth;
    this.videoWidth = videoWidth;
    this.videoHeight = videoWidth / 16 * 9 
    console.log(this.videoHeight)
  }

  ngOnInit() {
    
    if (!this.apiLoaded) {
      let tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      document.body.appendChild(tag);
      this.apiLoaded = true;
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['videoId'] && !this.apiLoaded) {
      let tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      document.body.appendChild(tag);
      this.apiLoaded = true;
    }

  }

  ngAfterViewInit() {
    this.updateScreenWidth();
    this.updateVideoWidth();
    this.ready = true;
    this.changeDetectorRef.detectChanges();
  }
}
