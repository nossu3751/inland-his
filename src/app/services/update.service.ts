import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class UpdateService {

  constructor(private http:HttpClient) { }

  url = `${environment.apiUrl}/api/v1/app_patches`
  updateData$ = new BehaviorSubject<any>(null)
  updating$ = new BehaviorSubject<boolean>(false);
  getRecentPatch():Observable<any>{
    return this.http.get(`${this.url}/latest`)
  }
}
