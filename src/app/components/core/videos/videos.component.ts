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
  start:number = 0;
  loading:boolean = false;
  lastPage:boolean = true;
  constructor(private videoService:VideoService){}

  loadMore() {
    this.loading = true;
    this.videoService.getLiveStreamRange(10, this.start).subscribe({
      "next":(data)=>{
        console.log(data)
        this.lastPage = data.lastPage;
        this.liveStreams = this.liveStreams.concat(data.data);
        this.start += data.data.length;
        
      }
    })
    this.loading = false;
  }

  ngOnInit() {

    // this.videoService.getLiveStreams().subscribe(data => {
    //   console.log('Data received:', data)
    //   this.liveStreams = data;

    // })
    this.videoService.getLiveStreamRange(10, this.start).subscribe({
      "next":(data)=>{
        console.log('Data received:', data.data)
        this.liveStreams = data.data;
        this.start += data.data.length
        this.lastPage = data.lastPage
      },
      "error":()=>{

      }
    })
  }
}
