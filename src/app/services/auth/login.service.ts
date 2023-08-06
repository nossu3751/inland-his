import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private personUrl = `${environment.apiUrl}/api/v1/persons`
  constructor(private http:HttpClient) { }

  request_verification(phoneAndName:any): Observable<any>{ 
    const sendVerificationUrl = `${this.personUrl}/send_verification`
    return this.http.post(sendVerificationUrl, phoneAndName)
  }

  send_verification(phoneAndVerification:any): Observable<any> {
    const verifyUrl = `${this.personUrl}/verify`
    return this.http.post(verifyUrl, phoneAndVerification, { withCredentials: true })
  }

  logout(): Observable<any> {
    const logoutUrl = `${this.personUrl}/logout`
    return this.http.get(logoutUrl, { withCredentials: true })
  }
}
