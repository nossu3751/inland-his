import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import { VideoService } from 'src/app/services/data/video.service';
import {Clipboard } from '@angular/cdk/clipboard'
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.scss']
})
export class VideoComponent implements OnInit{
  video: any = undefined; 
  videoLink: string = ""
  constructor(
    private activatedRoute:ActivatedRoute,
    private videoService:VideoService,
    private clipboard:Clipboard,
    private snackBar:MatSnackBar
  ){}

  copyToClipboard() {
    if(this.video){
      this.clipboard.copy(this.videoLink)
      this.snackBar.open("링크가 복사되었습니다", "Close", {
        duration: 3000,
        panelClass: ['custom-snackbar']
      })
    }
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      let videoId = params['id'];
      this.videoService.getLiveStreamById(videoId).subscribe((data) => {
        this.video = data;
        this.videoLink = `https://www.youtube.com/video/${this.video.video_id}`
      })
    })
  }
}
