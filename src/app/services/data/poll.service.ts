import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, of } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PollService {
  pollUrl = `${environment.apiUrl}/api/v1/polls`
  constructor(private http:HttpClient) { }

  getPolls(): Observable<any> {
    return this.http.get(this.pollUrl)
  }

  addPoll(poll_data:any): Observable<any> {
    return this.http.post(`${this.pollUrl}/add`, poll_data, {withCredentials:true})
  }

  castVote(vote_data:any): Observable<any> {
    return this.http.patch(`${this.pollUrl}/vote`, vote_data, {withCredentials:true})
  }

  endPoll(poll_id:number): Observable<any> {
    return this.http.patch(`${this.pollUrl}/end_poll?id=${poll_id}`, {withCredentials:true})
  }

}
