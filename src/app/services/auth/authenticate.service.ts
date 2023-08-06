import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, catchError, map, of } from 'rxjs';
import { CanActivateFn, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { environment } from 'src/environments/environment';
import { PersonService } from '../data/person.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticateService {
  private _isAuthenticated = new BehaviorSubject(false);
  
  private personUrl = `${environment.apiUrl}/api/v1/persons`
  constructor(private http:HttpClient) { }
  
  get isAuthenticated() {
    return this._isAuthenticated.asObservable();
  }

  authenticateBoolean(): Observable<boolean> {
    const authenticateUrl = `${this.personUrl}/authenticate`;
    return this.http.get(authenticateUrl, {withCredentials:true}).pipe(
      map(() => true),
      catchError(() => of(false))
    )
  }

  authenticate(): Observable<any>{ 
    const authenticateUrl = `${this.personUrl}/authenticate`
    return this.http.get(authenticateUrl, {withCredentials:true})
  }
}

export const canActivateNotLoggedIn: CanActivateFn = (route, state) => {
  const authService = inject(AuthenticateService);
  const router = inject(Router)
  const snackBar = inject(MatSnackBar)
  return authService.authenticate().pipe(
    map(()=> {
      snackBar.open("이미 로그인 되어있습니다.", "Close", {
        duration: 3000,
        panelClass: ['custom-snackbar'],
        verticalPosition: 'bottom'
      });
      return router.createUrlTree(['/'])
    }),
    catchError(() => {
      return of(true)
    })
  )
}

export const canActivateProtectedRoutesV2: CanActivateFn = (route, state) => {
  const authService = inject(AuthenticateService);
  const router = inject(Router)
  const snackBar = inject(MatSnackBar)
  const expectedRoles = new Set(route.data && route.data['roles'] ? route.data['roles'] as string[] : []);

  return authService.authenticate().pipe(
    map((data)=> {
      const userInfo = data.data;
      const userRoles = userInfo.group_membership as string[];
      
      let authorized:boolean = userRoles.some(userRole => expectedRoles.has(userRole)) || expectedRoles.size == 0
      if (!authorized) {
        snackBar.open("권한이 없는 페이지입니다.", "Close", {
          duration: 3000,
          panelClass: ['custom-snackbar'],
          verticalPosition: 'bottom'
        });
        return router.createUrlTree(['/'])
      }else{
        return true
      }
    }),
    catchError(() => {
      snackBar.open("인증에 실패하였습니다. 로그인 페이지로 이동합니다.", "Close", {
        duration: 3000,
        panelClass: ['custom-snackbar'],
        verticalPosition: 'bottom'
      });
      return of(router.createUrlTree(['/login']))
    })
  )
}



export const canActivateProtectedRoutes: CanActivateFn = (route, state) => {
  const authService = inject(AuthenticateService);
  const router = inject(Router)
  const snackBar = inject(MatSnackBar)
  const expectedRoles = route.data["roles"] as string[];

  return authService.authenticateBoolean().pipe(map(isAuth => {
    if (!isAuth) {
      snackBar.open("로그인이 필요한 페이지입니다. ", "Close", {
        duration: 3000,
        panelClass: ['custom-snackbar'],
        verticalPosition: 'bottom'
      });
      return router.createUrlTree(['/login']);
    } else {
      return true;
    }
  }));
}