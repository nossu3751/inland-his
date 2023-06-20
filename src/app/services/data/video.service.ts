import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap, catchError, of} from 'rxjs'

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
    return this.http.get(this.liveStreamUrl).pipe(
      catchError(error => {
        return of(undefined)
      })
    )
  }

  getFirstLiveStream(): Observable<any> {
    return this.http.get(`${this.liveStreamUrl}?index=0`).pipe(
      catchError(error => {
        console.error('There was an error!', error);
        return of(undefined);
      })
    );
  }

  getLiveStreamById(id:string): Observable<any> {
    return this.http.get(`${this.liveStreamUrl}?id=${id}`).pipe(
      catchError(error => {
        return of(undefined)
      })
    )
  }

}
