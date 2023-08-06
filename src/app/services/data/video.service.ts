import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap, catchError, of} from 'rxjs'
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class VideoService {
  private shortsUrl = `${environment.apiUrl}/api/v1/videos/shorts`
  private liveStreamUrl = `${environment.apiUrl}/api/v1/videos/live_streams`
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

  getLiveStreamsBySearchStr(search:string):Observable<any> {
    return this.http.get(`${this.liveStreamUrl}?search=${search}`).pipe(
      catchError(error => of({error: error, data: []}))
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

  getLiveStreamRange(count:number, start:number): Observable<any> {
    return this.http.get(`${this.liveStreamUrl}range?start=${start}&count=${count}`)
  }

  getLiveStreamById(id:string): Observable<any> {
    return this.http.get(`${this.liveStreamUrl}?id=${id}`).pipe(
      catchError(error => {
        return of(undefined)
      })
    )
  }

}
