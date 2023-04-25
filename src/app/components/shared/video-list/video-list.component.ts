import { Component, Input, Output, EventEmitter, HostBinding } from '@angular/core';

@Component({
  selector: 'app-video-list',
  templateUrl: './video-list.component.html',
  styleUrls: ['./video-list.component.scss']
})
export class VideoListComponent{

  @Input()
  videos:any = [];

  @Input()
  selectedVideoIndex:any;

  @Output()
  videoSelected = new EventEmitter<number>();

  onVideoClick(videoIndex:number){
    console.log("videoIndex selected in videoList component is ", videoIndex)
    this.videoSelected.emit(videoIndex)
  }

} 
