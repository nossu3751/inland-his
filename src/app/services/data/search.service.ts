import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { BulletinService } from './bulletin.service';
import { VideoService } from './video.service';
import { forkJoin, map } from 'rxjs';
import { EventService } from './event.service';
@Injectable({
  providedIn: 'root'
})
export class SearchService {
  public prevRoute:any = 0
  public currRoute:any = 0
  defaultResult = {bulletins: null, videos: null, events: null}
  public searchResults$ = new BehaviorSubject<{bulletins: any, videos: any, events: any}>({...this.defaultResult});
  
  public searchLength$ = new BehaviorSubject<number>(0)

  defaultSearchResult = {data: null}
  public bulletinSearchResults$ = new BehaviorSubject<{data: any}>(this.defaultSearchResult);
  public videoSearchResults$ = new BehaviorSubject<{data: any}>(this.defaultSearchResult);
  public eventSearchResults$ = new BehaviorSubject<{data: any}>(this.defaultSearchResult);

  public searching$ = new BehaviorSubject<boolean>(false)

  constructor(
    private bulletinService: BulletinService,
    private videoService: VideoService,
    private eventService: EventService
  ) { }

  getResultLength(data:any) {
    if (data != undefined){
      return data.length;
    }
    return 0;
  }

  getAllResultLength(data:any){
    let defaultNum:number = 0
    if (data.bulletins != undefined && data.bulletins.length > 0){
      defaultNum += data.bulletins.length
    }
    if (data.videos != undefined && data.videos.length > 0){
      defaultNum += data.videos.length
    }
    if (data.events != undefined && data.events.length > 0){
      defaultNum += data.events.length
    }
    return defaultNum
  }

  resetSearch(){
    this.searchLength$.next(0);
    this.bulletinSearchResults$.next(this.defaultSearchResult);
    this.eventSearchResults$.next(this.defaultSearchResult);
    this.videoSearchResults$.next(this.defaultSearchResult);
  }

  searchBulletin(search:string) {
    this.resetSearch()
    this.searching$.next(true)
    this.bulletinService.getBulletinssBySearchStr(search).subscribe({
      "next":(data)=>{
        const dataLength = this.getResultLength(data)
        console.log("bulletin", dataLength, data)
        this.bulletinSearchResults$.next({data:data})
        this.searchLength$.next(dataLength)
      },
      "error":()=>{
        this.bulletinSearchResults$.next({data:[]})
        this.searchLength$.next(0)
      },
      "complete":()=>{
        setTimeout(()=>{
          this.searching$.next(false)
        },1000)
      }
    })
  }

  searchEvent(search:string) {
    this.resetSearch()
    this.searching$.next(true)
    this.eventService.getEventsBySearchStr(search).subscribe({
      "next":(data)=>{
        const dataLength = this.getResultLength(data.data)
        console.log("events", dataLength, data)
        this.eventSearchResults$.next({data:data.data})
        this.searchLength$.next(dataLength)
      },
      "error":()=>{
        this.eventSearchResults$.next({data:[]})
        this.searchLength$.next(0)
      },
      "complete":()=>{
        setTimeout(()=>{
          this.searching$.next(false)
        },1000)
      }
    })
  }

  searchVideo(search:string) {
    this.resetSearch()
    this.searching$.next(true)
    this.videoService.getLiveStreamsBySearchStr(search).subscribe({
      "next":(data)=>{
        const dataLength = this.getResultLength(data.data)
        console.log("video", dataLength, data)
        this.videoSearchResults$.next({data:data.data})
        this.searchLength$.next(dataLength)
      },
      "error":()=>{
        this.videoSearchResults$.next({data:[]})
        this.searchLength$.next(0)
      },
      "complete":()=>{
        setTimeout(()=>{
          this.searching$.next(false)
        },1000)
      }
    })
  }



  search(search: string){
    this.searching$.next(true)
    console.log("searching...")
    forkJoin({
      bulletins: this.bulletinService.getBulletinssBySearchStr(search),
      events: this.eventService.getValidEvents(this.eventService.getEventsBySearchStr(search)),
      videos: this.videoService.getLiveStreamsBySearchStr(search)
    }).subscribe(res => {
      let combinedData = {
        bulletins: res.bulletins,
        events: res.events,
        videos: res.videos.data
      }
      const dataLength = this.getAllResultLength(combinedData)
      this.searchResults$.next(combinedData)
      this.searchLength$.next(dataLength)
      this.searching$.next(false)
      console.log("search finished.")
    })
    
  }
}
