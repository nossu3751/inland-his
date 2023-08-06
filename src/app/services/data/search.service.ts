import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { SmallGroupService } from './small-group.service';
import { BulletinService } from './bulletin.service';
import { VideoService } from './video.service';
import { forkJoin, map } from 'rxjs';
import { EventService } from './event.service';
@Injectable({
  providedIn: 'root'
})
export class SearchService {
  defaultResult = {bulletins: null, videos: null, members: null, events: null}
  public searchResults$ = new BehaviorSubject<{bulletins: any, videos: any, members: any, events: any}>({...this.defaultResult});
  public searchLength$ = new BehaviorSubject<number>(0)
  public searching:boolean = false
  constructor(
    private smallGroupService:SmallGroupService, 
    private bulletinService: BulletinService,
    private videoService: VideoService,
    private eventService: EventService
  ) { }

  getAllResultLength(data:any){
    let defaultNum:number = 0
    if (data.bulletins != undefined && data.bulletins.length > 0){
      defaultNum += data.bulletins.length
    }
    if (data.videos != undefined && data.videos.length > 0){
      defaultNum += data.videos.length
    }
    if (data.members != undefined && data.members.members != undefined && data.members.members.length > 0){
      defaultNum += data.members.members.length
    }
    if (data.events != undefined && data.events.length > 0){
      defaultNum += data.events.length
    }
    return defaultNum
  }

  search(search: string){
    this.searching = true
    forkJoin({
      bulletins: this.bulletinService.getBulletinssBySearchStr(search),
      members: this.smallGroupService.getMembersBySearchStr(search),
      events: this.eventService.getValidEvents(this.eventService.getEventsBySearchStr(search)),
      videos: this.videoService.getLiveStreamsBySearchStr(search)
    }).subscribe(res => {
      let combinedData = {
        bulletins: res.bulletins,
        members: res.members,
        events: res.events,
        videos: res.videos.data
      }
      const dataLength = this.getAllResultLength(combinedData)
      console.log(combinedData)
      console.log(dataLength)
      this.searchResults$.next(combinedData)
      this.searchLength$.next(dataLength)
    })
    this.searching = false;
  }
}
