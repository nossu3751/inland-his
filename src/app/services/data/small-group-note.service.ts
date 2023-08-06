import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { switchMap, tap, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SmallGroupNoteService {
  private uploadUrl = `${environment.apiUrl}/api/v1/small-group-notes/upload`
  private smallGroupNotesUrl = `${environment.apiUrl}/api/v1/small-group-notes`
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

  updateData(id: number, data:any){
    return this.http.patch(`${this.smallGroupNotesUrl}/${id}`, data);
  }


  uploadFile(file:File) {
    const formData = new FormData();
    formData.append('small_group_note_file', file)
    return this.http.post(this.uploadUrl, formData)
  }


}
