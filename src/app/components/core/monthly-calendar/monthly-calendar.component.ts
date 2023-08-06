import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import { EventInput,CalendarOptions } from '@fullcalendar/core';
import interactionPlugin from '@fullcalendar/interaction'
import { Router } from '@angular/router';
import { EventService } from 'src/app/services/data/event.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FullCalendarComponent } from '@fullcalendar/angular';
@Component({
  selector: 'app-monthly-calendar',
  templateUrl: './monthly-calendar.component.html',
  styleUrls: ['./monthly-calendar.component.scss']
})
export class MonthlyCalendarComponent implements OnInit, AfterViewInit{
  @ViewChild('calendar') calendarComponent!:FullCalendarComponent

  calendarEvents: EventInput[] = [];
  currDate:Date
  collectedEvents:any = {}
  constructor(
    private router:Router, 
    private eventService:EventService,
    private snackBar:MatSnackBar){
      this.currDate = new Date(this.eventService.selectedDate)
  }
  title:string = ""
  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    
    plugins: [dayGridPlugin, interactionPlugin],
    locale: 'en',
    buttonText: {
      today:    '오늘',
      month:    '달',
      week:     '주',
      day:      '일',
      list:     '목록'
    },
    customButtons: {
      prev: {
        click: ()=>{
          this.currDate.setMonth(this.currDate.getMonth() - 1);
          const year = this.currDate.getFullYear();
          const month = this.currDate.getMonth() + 1;
          this.get3MonthEvents(year, month);
          const calendarApi = this.calendarComponent.getApi();
          calendarApi.prev();
        }
      },
      next: {
        click:()=>{
          this.currDate.setMonth(this.currDate.getMonth() + 1);
          const year = this.currDate.getFullYear();
          const month = this.currDate.getMonth() + 1;
          this.get3MonthEvents(year, month);
          const calendarApi = this.calendarComponent.getApi();
          calendarApi.next();
        }
      },
      today: {
        text: "오늘",
        click:()=>{
          this.currDate = new Date();
          const year = this.currDate.getFullYear();
          const month = this.currDate.getMonth() + 1;
          this.get3MonthEvents(year, month);
          const calendarApi = this.calendarComponent.getApi();
          calendarApi.today();
        }
      }
    },
    // eventColor: '#9482af',
    eventContent: (arg) => {
      let html;
      if(arg.event.title) { // Check if the event has a title
        html = `<div style="font-size:9pt" class="fc-event-title">${arg.event.title}</div>`; // custom HTML with just the title
      }
      return { html }; // return the custom HTML
    },
    dayHeaderContent: (arg)=> {
      const dayNames  = ['월', '화', '수', '목', '금', '토', '주']
      return dayNames[arg.date.getDay()];
    },
 
    height: "calc((var(--html-height) - var(--nav-height) * 2))",
    eventClick: (info)=>{
      let m = String(info.event.start?.getMonth()! + 1).padStart(2,'0')
      let d = String(info.event.start?.getDate()).padStart(2,'0')
      let y = String(info.event.start?.getFullYear())
     
      const dateStr = `${y}-${m}-${d}`
      this.eventService.setSelectedDate(dateStr)
      this.goToDatePage(dateStr)
    },
    dateClick:(info)=>{
      this.eventService.setSelectedDate(info.dateStr)
      this.goToDatePage(info.dateStr)
    }
  };

  goToDatePage(dateStr:string){
    this.router.navigateByUrl(`/calendar/${dateStr}`)
  }

  get3MonthEvents(year:number, month:number){
    this.eventService.getEventsByYearMonth(year, month).subscribe({
      "next":(data)=>{
        let events = data.data
        for(let [date, event] of Object.entries(events)){
          if(!this.collectedEvents[date]){
            this.calendarEvents = this.calendarEvents.concat(event as EventInput[])
          }
          this.collectedEvents[date] = event
        }
      },
      "error": (error)=>{
        const errorMsg = error.error.error
        
        this.snackBar.open("죄송합니다. 이벤트를 불러올 수 없습니다.", "Close", {
          duration: 3000,
          panelClass: ['custom-snackbar'],
          verticalPosition: 'bottom'
        })
      }
    })
  }

  ngOnInit(): void {
    const year = this.currDate.getFullYear()
    const month = this.currDate.getMonth() + 1
    this.get3MonthEvents(year, month)
  }

  ngAfterViewInit(): void {
      this.calendarComponent.getApi().gotoDate(this.eventService.selectedDate)
  }
}


