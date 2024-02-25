import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BibleChallengeService {
  private bibleChallengeUrl = `${environment.apiUrl}/api/v1/bible_challenges`;
  constructor(private http:HttpClient) { }

  getBibleChallenges():Observable<any> {
    return this.http.get(`${this.bibleChallengeUrl}`)
  }

  getBibleVerses(bookName:string, chapter:number):Observable<any> {
    return this.http.get(`${this.bibleChallengeUrl}/${bookName}/${chapter}`)
  }

  getBibleVersesByChallengeDate(date:any):Observable<any> {
    return this.http.get(`${this.bibleChallengeUrl}/${date}`)
  }
}
