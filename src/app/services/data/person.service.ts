import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PersonService {
  private personUrl = 'http://localhost:5000/api/v1/persons'
  constructor(private http:HttpClient) { 

  }

  getPersons():Observable<any>{
    return this.http.get(`${this.personUrl}/`).pipe(
      catchError(error => {
        console.log(error)
        return of(undefined)
      })
    )
  }

  addPerson(formData:any): Observable<any>{
    console.log("form data", formData)
    const addPersonUrl = `${this.personUrl}/add`
    console.log(addPersonUrl);
    return this.http.post(addPersonUrl, formData)
  }
}
