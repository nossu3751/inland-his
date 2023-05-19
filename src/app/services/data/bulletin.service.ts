// bulletin.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { switchMap, tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BulletinService {

  private bulletinUrl = 'http://localhost:5000/api/v1/bulletins/';
  private data = new BehaviorSubject<any>(null);

  constructor(private http: HttpClient) { }

  dataIsAlreadyFetched(): boolean {
    return this.data.getValue() !== null;
  }


  getData(): Observable<any> {
    if (this.dataIsAlreadyFetched()) {
      return this.data.asObservable();
    } else {
      return this.http.get(this.bulletinUrl).pipe(
        tap((fetchedData) => {
          this.data.next(fetchedData);
        }),
        switchMap(() => this.data.asObservable())
      );
    }
  }

  updateData(id: number, data:any){
    return this.http.patch(`${this.bulletinUrl}/${id}`, data);
  }

  postBulletin(bulletin: any): Observable<any> {
    return this.http.post(this.bulletinUrl, bulletin);
  }
}
