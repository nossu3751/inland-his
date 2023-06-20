import { Component, OnInit, HostBinding } from '@angular/core';
import { VideoService } from 'src/app/services/data/video.service';

@Component({
  selector: 'app-videos',
  templateUrl: './videos.component.html',
  styleUrls: ['./videos.component.scss']
})
export class VideosComponent implements OnInit{
  liveStreams:any[] = [];
  shorts:any[] = [];
  constructor(private videoService:VideoService){}

  ngOnInit() {
    this.videoService.getShorts().subscribe(data => {
      console.log('Data received:', data)
      this.shorts = data;
  })
    this.videoService.getLiveStreams().subscribe(data => {
      console.log('Data received:', data)
      this.liveStreams = data;

    })
  }
}
