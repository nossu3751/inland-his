import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap} from 'rxjs'
@Injectable({
  providedIn: 'root'
})
export class VideoService {
  private shortsUrl = 'http://localhost:5000/api/v1/videos/shorts'
  private liveStreamUrl = 'http://localhost:5000/api/v1/videos/live_streams'
  constructor(private http:HttpClient) { 

  }

  getShorts(): Observable<any> {
    return this.http.get(this.shortsUrl).pipe(
      tap(data => console.log('VideoService data:', data))
    )
  }

  getLiveStreams(): Observable<any> {
    return this.http.get(this.liveStreamUrl)
  }

}
