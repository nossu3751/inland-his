import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { EventService } from 'src/app/services/data/event.service';

@Component({
  selector: 'app-today-calendar',
  templateUrl: './today-calendar.component.html',
  styleUrls: ['./today-calendar.component.scss']
})
export class TodayCalendarComponent implements OnInit {
  date:string|null = null
  events:any = null
  openMode = "navigate"
  loading: boolean|null = null;
  constructor(
    private activatedRoute: ActivatedRoute, 
    private snackBar:MatSnackBar,
    public eventService: EventService){}
  

  ngOnInit(): void {
    this.loading = true;
    this.activatedRoute.params.subscribe(params => {
      this.date = params['date'];

      if(!this.date){
        this.date = this.eventService.today()
        this.openMode = "widget"
      }
      if(this.date){
        this.eventService.getEventsByDate(this.date).subscribe({
          "next":(data) => {
            console.log(data)
            const events = data.data
            this.events = events
            const startEnds = data.start_ends
            for(let event of this.events){
              let event_id = event.event_id
              if(event_id in startEnds){
                let currStartEnds = startEnds[event_id]
                event.eventStart = currStartEnds["start"]
                event.eventEnd = currStartEnds["end"]
              } else {
                event.eventStart = event.start
                event.eventEnd = event.end
              }
            }
            console.log(this.events)
            if (events.length < 1 && this.openMode !== "navigate") {
              this.snackBar.open("오늘은 이벤트가 없습니다", "Close", {
                duration: 3000,
                panelClass: ['custom-snackbar'],
                verticalPosition: 'bottom'
              })
            }
          },
          "error":()=>{
            this.snackBar.open("이벤트를 불러올 수 없습니다", "Close", {
              duration: 3000,
              panelClass: ['custom-snackbar'],
              verticalPosition: 'bottom'
            })
          }
        })
      }
      
    })
    this.loading = false;
  }
  
}
