import { Injectable } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { EventService } from './event.service';
import { PersonService } from './person.service';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RoutingService {
  constructor(
    private router:Router, 
    private eventService:EventService,
    private personService:PersonService){
    if(this.isAdminRoute()){
      
    }
    this.resetDefaultDateWhenNotCalendar()
  }

  showLoadingScreen:BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  loadingScreenTime:BehaviorSubject<number> = new BehaviorSubject<number>(0);

  showLoadingScreenForTime(seconds:number){
    this.loadingScreenTime.next(seconds)
    this.showLoadingScreen.next(true)
    setTimeout(()=>{
      this.loadingScreenTime.next(0)
      this.showLoadingScreen.next(false);
    }, seconds * 1000)
   
  }

  isAdminRoute():boolean {
    return this.router.url.startsWith("/admin")
  }

  isRootAdminRoute():boolean {
    return this.router.url === "/admin";
  }


  resetDefaultDateWhenNotCalendar(){
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        if (!this.router.url.startsWith('/calendar')) {
          this.eventService.resetSelectedDate()
        }
      }
    })
  }
}
