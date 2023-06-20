// bulletin.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, catchError, of, switchMap, tap } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class BulletinService {

  private bulletinUrl = 'http://localhost:5000/api/v1/bulletins';
  private data = new BehaviorSubject<any>(null);

  constructor(private http: HttpClient) { }

  dataIsAlreadyFetched(): boolean {
    return this.data.getValue() !== null;
  }

  getFirstBulletin(): Observable<any> {
    return this.http.get(`${this.bulletinUrl}?index=0`).pipe(
      catchError(error => {
        console.error('There was an error!', error);
        return of(undefined);
      })
    )
  }

  getBulletinOfSunday(sunday:string): Observable<any> {
    return this.http.get(`${this.bulletinUrl}?sunday=${sunday}`).pipe(
      catchError(error => {
        console.error('There was an error!', error);
        return of(undefined);
      })
    )
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
    return this.http.post(`${this.bulletinUrl}/`, bulletin);
  }
}
