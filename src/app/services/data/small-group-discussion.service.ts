import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SmallGroupDiscussionService {
  discussionUrl = `${environment.apiUrl}/api/v1/small_group_discussions`
  constructor(private http:HttpClient) { }

  getLastetDiscussion():Observable<any> {
    return this.http.get(`${this.discussionUrl}/latest`)
  }


}
