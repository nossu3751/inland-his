import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, of } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  eventUrl = `${environment.apiUrl}/api/v1/events`
  selectedDate!:string;
  constructor(private http:HttpClient) { 
    this.setSelectedDate(this.today())
  }

  setSelectedDate(dateStr:string){
    this.selectedDate = dateStr
  }

  resetSelectedDate(){
    this.setSelectedDate(this.today())
  }
  

  public today():string {
    const currDate = new Date()
    const year = currDate.getFullYear()
    const month = String(currDate.getMonth() + 1).padStart(2,'0')
    const day = currDate.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`
  }
  public localIsoString(date:Date):string {
    let isoString = date.getFullYear() +
    '-' + (date.getMonth() + 1).toString().padStart(2, '0') + // Months are 0-based
    '-' + date.getDate().toString().padStart(2, '0') +
    ' ' + date.getHours().toString().padStart(2, '0') +
    ':' + date.getMinutes().toString().padStart(2, '0') +
    ':' + date.getSeconds().toString().padStart(2, '0');
    return isoString
  }
  
  public getSimpleDateStr(dateStr:string){
    try{
      const date = new Date(dateStr)
      let year = date.getFullYear()
      let month = String(date.getMonth() + 1).padStart(2, '0');
      let day = date.getDate().toString().padStart(2, '0');
      return `${year}-${month}-${day}`
    }catch{
      return dateStr
    }  
  }
  public getSimpleTimeStr(dateStr:string){
    try{
      const date = new Date(dateStr)
      let hour = date.getHours()
      let minute = date.getMinutes().toString().padStart(2, '0');
      let ampm = hour > 12 ? "오후":"오전"
      let hourMeridian = hour === 0 ? 12: hour > 12 ? hour - 12 : hour
      return `${ampm} ${hourMeridian}:${minute}`
    }catch{
      return dateStr
    }  
  }

  getEventsByDate(dateStr:string): Observable<any>{
    return this.http.get(`${this.eventUrl}?date=${dateStr}`)
  }

  getEvents(): Observable<any> {
    return this.http.get(`${this.eventUrl}/`)
  }

  addEvent(event_data:any): Observable<any> {
    return this.http.post(`${this.eventUrl}/add`, event_data)
  }

  deleteEvent(event_id:any): Observable<any> {
    return this.http.delete(`${this.eventUrl}/${event_id}`)
  }
  
  getEventsBySearchStr(search:string):Observable<any> {
    return this.http.get(`${this.eventUrl}/?search=${search}`)
  }

  getEventsByYearMonth(year:number, month:number):Observable<any> {
    return this.http.get(`${this.eventUrl}/?year=${year}&month=${month}`)
  }

  public checkDateStrPastTime(dateStr:string){
    try{
      const date = new Date(dateStr)
      const now = new Date()
      if (now > date){
        return true
      }
      return false
    }catch{
      return true
    }  
  }

  getValidEvents(events:Observable<any>):Observable<any> {
    return events.pipe(
      map((data: any) => {
        // console.log("raw searched event data", data)
        // console.log(data)
        let seen:any = {};
  
        const filteredData = data.data.filter((item:any) => {
          if (seen[item.event_id]) return false;
          if (this.checkDateStrPastTime(item.end)) {
            return false
          } else {
            seen[item.event_id] = true;
            return true;
          };
        });
        console.log("from event service", filteredData)
        return filteredData;
      }),
      catchError(error => of({error: error, data: []}))
    )
  }

  getValidEventsBySearchStr(search:string):Observable<any> {
    return this.http.get(`${this.eventUrl}/?search=${search}`).pipe(
      map((data: any) => {
        console.log(data)
        let seen:any = {};
  
        const filteredData = data.data.filter((item:any) => {
          if (seen[item.event_id]) return false;
          seen[item.event_id] = true;
          if (this.checkDateStrPastTime(item.end)) return false;
          return true;
        });
        console.log("from event service", filteredData)
        return filteredData;
      }),
      catchError(error => of({error: error, data: []}))
    )
  
  }

  // deleteEvent(event_id:string): Observable<any> {
    
  // }
}
