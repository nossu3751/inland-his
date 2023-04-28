import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { switchMap, tap, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SmallGroupNoteService {
  private uploadUrl = 'http://localhost:5000/api/v1/small-group-notes/upload'
  private smallGroupNotesUrl = 'http://localhost:5000/api/v1/small-group-notes'
  private data = new BehaviorSubject<any>(null);
  constructor(private http: HttpClient) { }

  dataIsAlreadyFetched(): boolean {
    return this.data.getValue() !== null;
  }

  getData(): Observable<any> {
    if (this.dataIsAlreadyFetched()) {
      return this.data.asObservable();
    } else {
      return this.http.get(this.smallGroupNotesUrl).pipe(
        tap((fetchedData) => {
          this.data.next(fetchedData);
        }),
        switchMap(() => this.data.asObservable())
      );
    }
  }


  uploadFile(file:File) {
    const formData = new FormData();
    formData.append('small_group_note_file', file)
    return this.http.post(this.uploadUrl, formData)
  }
}
