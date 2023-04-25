import { 
  Component, 
  HostListener, 
  OnInit, 
  ChangeDetectorRef, 
  HostBinding, 
  AfterViewInit, 
  AfterViewChecked,
  ElementRef,
  ViewChild
} from '@angular/core';
import { VideoService } from 'src/app/services/data/video.service';

@Component({
  selector: 'app-video-area',
  templateUrl: './video-area.component.html',
  styleUrls: ['./video-area.component.scss']
})
export class VideoAreaComponent implements OnInit, AfterViewInit, AfterViewChecked {

  @HostBinding('style.height')
  height:string = "auto";

  shorts: any[] = [];
  liveStreams: any[] = [];
  selectedVideoIndex: any;

  constructor(
    private videoService: VideoService,
    private changeDetectorRef: ChangeDetectorRef){
  }

  onVideoSelected(index: number){
    this.selectedVideoIndex = index;
    console.log("Video Area Component Received video index", this.selectedVideoIndex);
  }

  @HostListener('window:resize')
  @HostListener('window:orientationchange')
  onResize() {
  
  }

  ngAfterViewInit(): void {
    this.changeDetectorRef.detectChanges();
  }

  ngAfterViewChecked(): void {
    this.changeDetectorRef.detectChanges();
  }

  
  ngOnInit(): void {
    this.videoService.getShorts().subscribe(data => {
        console.log('Data received:', data)
        this.shorts = data;
    })
    this.videoService.getLiveStreams().subscribe(data => {
      console.log('Data received:', data)
      this.liveStreams = data;
      this.selectedVideoIndex = this.liveStreams.length > 0 ? 0 : null;
      if(this.selectedVideoIndex){
        console.log("firstVideo there!:" + this.liveStreams[this.selectedVideoIndex].video_id)
      }
    })
  }
}