// bulletin.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, catchError, of, switchMap, tap } from 'rxjs';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class BulletinService {

  private bulletinUrl = `${environment.apiUrl}/api/v1/bulletins`;
  private data = new BehaviorSubject<any>(null);

  constructor(private http: HttpClient) { }

  dataIsAlreadyFetched(): boolean {
    return this.data.getValue() !== null;
  }

  pruneTitle(title:string):string {
    if (title.length > 11) {
      title = `${title.substring(0,12)}...`
    }
    return title
  }

  getFirstBulletin(): Observable<any> {
    return this.http.get(`${this.bulletinUrl}/?index=0`).pipe(
      catchError(error => {
        console.error('There was an error!', error);
        return of(undefined);
      })
    )
  }

  getBulletinOfSunday(sunday:string): Observable<any> {
    return this.http.get(`${this.bulletinUrl}/?date=${sunday}`)
  }

  getBulletinssBySearchStr(search:string):Observable<any> {
    return this.http.get(`${this.bulletinUrl}/?search=${search}`).pipe(
      catchError(error => of({error: error, data: []}))
    )
  }

  getBulletins(): Observable<any> {
    return this.http.get(`${this.bulletinUrl}/`)
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
    return this.http.put(`${this.bulletinUrl}/${id}`, data);
  }

  postBulletin(bulletin: any): Observable<any> {
    return this.http.post(`${this.bulletinUrl}/`, bulletin);
  }

  deleteBulletin(id:number){
    return this.http.delete(`${this.bulletinUrl}/${id}`)
  }
}
