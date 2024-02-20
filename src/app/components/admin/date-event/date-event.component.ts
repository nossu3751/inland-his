import { Component, OnInit } from '@angular/core';
import { EventService } from 'src/app/services/data/event.service';
import { ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-date-event',
  templateUrl: './date-event.component.html',
  styleUrls: ['./date-event.component.scss']
})
export class DateEventComponent implements OnInit{
  events = null

  constructor(private eventService:EventService,
    private activatedRoute: ActivatedRoute,
    private snackBar: MatSnackBar){}
  deleteEvent(eventId: string) {
    this.eventService.deleteEvent(eventId).subscribe({
      "next":(data)=>{
        this.snackBar.open("이벤트가 삭제되었습니다", "Close", {
          duration: 3000,
          panelClass: ['custom-snackbar'],
          verticalPosition: 'bottom'
        })
        this.events = data
      },
      "error":()=>{
        this.snackBar.open("이벤트를 삭제할 수 없습니다.", "Close", {
          duration: 3000,
          panelClass: ['custom-snackbar'],
          verticalPosition: 'bottom'
        })
      }
    })
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      let date = params['date'];
      this.eventService.getEventsByDate(date).subscribe({
        "next":(data) => {
          this.events = data.data
          console.log(this.events)
        },
        "error":(e) => {
          console.error(e)
        }
      })
    })
    
  }
  
}
