import { Component, OnInit } from '@angular/core';
import { EventService } from 'src/app/services/data/event.service';
import dayGridPlugin from '@fullcalendar/daygrid';
import { EventInput,CalendarOptions } from '@fullcalendar/core';
import interactionPlugin from '@fullcalendar/interaction'
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PersonService } from 'src/app/services/data/person.service';
import { SmallGroupService } from 'src/app/services/data/small-group.service';
import { RoutingService } from 'src/app/services/data/routing.service';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit{
  showCalendar: boolean = false;
  events: any = null;
  calendarEvents: EventInput[]|null = null;
  form:any = null;
  allDay:boolean = false;
  allDayDate:Date|null = null;
  selectMembers: boolean = false;
  selectedMembersSrc:any = {
    smallGroups:[],
    roles:[],
    leaders:[]
  };
  selectedMembers: any = {...this.selectedMembersSrc}
  groups:any = null;
  groupsCopy:any = null;
  groupNameMap:any = null;
  smallGroups:any = null;
  smallGroupsCopy:any = null;
  leadersAdded: boolean = false;
  repeat: boolean = false;
  repeatMethods: any[] = [
    "매 주 반복 (지정 종료일 까지)",
    "매 일 반복 (지정 종료일 까지)"
  ]
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
 
    height: "calc((var(--html-height) / 2)",
    
  };
  constructor(
    private eventService:EventService, 
    private snackBar:MatSnackBar,
    private personService:PersonService,
    private smallGroupService:SmallGroupService,
    public routingService:RoutingService
  ){

  }
 
  createForm() {
    if (this.form !== null){
      this.snackBar.open("편집중인 이벤트를 먼저 등록해주세요", "Close", {
        duration: 3000,
        panelClass: ['custom-snackbar'],
        verticalPosition: 'bottom'
      })
    } else {
      this.form = {

        title: null,
        start: null,
        end: null,
        detail: null,
        persons: null,
        important: false,
        repeatOption: 0,
        repeatEndDate: null
      }
    }
  }

  showRepeatEndDate(){
    if(this.form !== null){
      return this.form.repeatOption && Number(this.form.repeatOption) === 2
    }
    return false
  }
  

  formDateStrToDateObj(date:any){
    
    console.log(typeof(date))
    const dateAndTime = date.split(', ')
    const dateParts = dateAndTime[0].split('/')
    const month = Number(dateParts[0]) - 1;  // Months are 0-indexed in JavaScript
    const day = Number(dateParts[1]);
    const year = Number(dateParts[2]);
    const timeParts = dateAndTime[1].split(':');
    const hours = Number(timeParts[0]);
    const minutes = Number(timeParts[1]);
    return new Date(year, month, day, hours, minutes)
  }

  localIsoString(date:Date):string {
    let isoString = date.getFullYear() +
    '-' + (date.getMonth() + 1).toString().padStart(2, '0') + // Months are 0-based
    '-' + date.getDate().toString().padStart(2, '0') +
    ' ' + date.getHours().toString().padStart(2, '0') +
    ':' + date.getMinutes().toString().padStart(2, '0') +
    ':' + date.getSeconds().toString().padStart(2, '0');
    return isoString
  }
  isAllDayDateValid():boolean{
    if(this.form === null || this.allDayDate === null){
      return false
    }
    return true
  }

  isRepeatEndDateValid():boolean {
    if(this.form === null || this.form.repeatEndDate === null){
      return false
    }
    if (!this.isStartDateValid()){
      return false;
    }
    const startDate = this.form.start.getDate()
    const repeatEndDate = this.form.repeatEndDate.getDate()
    if (repeatEndDate <= startDate){
      return false;
    }
    return true;
  }

  isStartDateValid():boolean{
    if(this.form === null || this.form.start === null){
      return false
    }
    return true
  }

  isEndDateValid():boolean{
    if(this.form === null || this.form.end === null){
      return false
    }
    // const startTime = this.formDateStrToDateObj(this.form.start)
    // const endTime = this.formDateStrToDateObj(this.form.end)
    const startTime = this.form.start
    console.log(startTime.toString())
    const endTime = this.form.end
    console.log(endTime.toString())
    console.log(endTime < startTime)
    if (endTime < startTime) {
      return false
    }
    return true
  }

  isWithinDay():boolean{
    if(this.form === null){
      return false
    }
    if(this.allDay){
      return this.allDayDate !== null;
    }
    if(this.form.start === null || this.form.end === null){
      return false
    }
    if(this.form.start.getDate() !== this.form.end.getDate()){
      return false
    }
    let diffInMilliseconds = this.form.end.getTime() - this.form.start.getTime()
    let diffInHours = diffInMilliseconds / (1000 * 60 * 60)
    return 0 < diffInHours && diffInHours < 24
  }

  submitForm() {
    if(!this.allDay && !this.isStartDateValid()){
      this.snackBar.open("잘못된 시작 시간입니다.", "Close", {
        duration: 3000,
        panelClass: ['custom-snackbar'],
        verticalPosition: 'bottom'
      })
      return
    }
    if(!this.allDay && !this.isEndDateValid()){
      this.snackBar.open("잘못된 종료 시간입니다.", "Close", {
        duration: 3000,
        panelClass: ['custom-snackbar'],
        verticalPosition: 'bottom'
      })
      return
    }
    if(this.allDay && !this.isAllDayDateValid()){
      this.snackBar.open("잘못된 날짜입니다.", "Close", {
        duration: 3000,
        panelClass: ['custom-snackbar'],
        verticalPosition: 'bottom'
      })
      return
    }
    if(this.repeat && !this.isRepeatEndDateValid()){
      this.snackBar.open("반복 종료일을 다시 설정해주세요.", "Close", {
        duration: 3000,
        panelClass: ['custom-snackbar'],
        verticalPosition: 'bottom'
      })
      return
    }
    if(!this.form.title){
      this.snackBar.open("이벤트 제목을 입력해주세요.", "Close", {
        duration: 3000,
        panelClass: ['custom-snackbar'],
        verticalPosition: 'bottom'
      })
      return
    }
    
    let formCopy = {...this.form}
    if(this.allDay && this.allDayDate){
      const year = this.allDayDate.getFullYear()
      const month = this.allDayDate.getMonth()
      const date = this.allDayDate.getDate()

      formCopy.start = new Date(year, month, date, 0, 0)
      formCopy.end = new Date(year, month, date, 23, 59)
    }
    if(this.repeat){
      const year = formCopy.repeatEndDate.getFullYear()
      const month = formCopy.repeatEndDate.getMonth()
      const date = formCopy.repeatEndDate.getDate()
      formCopy.repeatEndDate = new Date(year, month, date, 23, 59)
      formCopy.repeatEndDate = this.localIsoString(formCopy.repeatEndDate)
    }else{
      formCopy.repeatEndDate = null;
      formCopy.repeatOption = null;
    }
    
    formCopy.start = this.localIsoString(formCopy.start)
    formCopy.end = this.localIsoString(formCopy.end)
    console.log(formCopy)

    if(this.selectMembers) {
      let selectedMembersCopy = {...this.selectedMembers}
      selectedMembersCopy.roles = selectedMembersCopy.roles.concat(selectedMembersCopy.leaders)
      const selectedMemberLength = selectedMembersCopy.smallGroups.length + selectedMembersCopy.roles.length
      if(selectedMemberLength < 1){
        this.snackBar.open("지정된 멤버가 없습니다", "Close", {
          duration: 3000,
          panelClass: ['custom-snackbar'],
          verticalPosition: 'bottom'
        })
        return
      }else{
        console.log(selectedMembersCopy)
        formCopy.persons = selectedMembersCopy
      }
    }

    this.eventService.addEvent(formCopy).subscribe({
      "next":(data)=>{
        const events = data.data
        this.calendarEvents?.concat(events)
        this.form = null
        this.allDay = false;
        this.allDayDate = null;
        this.selectMembers = false;
        this.selectedMembers = {...this.selectedMembersSrc}
        this.groupsCopy = {...this.groups}
        this.smallGroupsCopy = {...this.smallGroups}
        this.leadersAdded = false;
        console.log(events)
      },
      "error":(error)=>{
        const errorMsg = error.error.error
        this.snackBar.open("이벤트 등록에 실패했습니다.", "Close", {
          duration: 3000,
          panelClass: ['custom-snackbar'],
          verticalPosition: 'bottom'
        })
      }
    })
  }

  toggleSelectMembers() {
    this.selectMembers = !this.selectMembers
  }

  toggleAllDay() {
    this.allDay = !this.allDay
  }

  toggleCalendar() {
    this.showCalendar = !this.showCalendar
  }
  addRoles(i:number){
    if (i > -1) {
      let removed = this.groupsCopy.splice(i,1)[0]
      this.selectedMembers.roles.push(removed)
    }
  }
  addMinistryLeader(){
    for (let group of this.groupsCopy){
      if ("subGroups" in group && group["subGroups"].length > 0) {
        let leaderGroup = group["subGroups"].filter((subGroup:any)=>{
          return subGroup.name === "leader"
        })
        console.log(leaderGroup)
        if (leaderGroup.length > 0) {
          this.selectedMembers.leaders.push(leaderGroup[0])
        }
      }
    }
    for (let group of this.selectedMembers.roles){
      if ("subGroups" in group && group["subGroups"].length > 0) {
        let leaderGroup = group["subGroups"].filter((subGroup:any)=>{
          return subGroup.name === "leader"
        })
        if (leaderGroup.length > 0) {
          this.selectedMembers.leaders.push(leaderGroup[0])
        }
      }
    }
    this.leadersAdded = true;
    console.log(this.selectedMembers)
  }
  removeMinistryLeader(){
    this.selectedMembers.leaders = []
    this.leadersAdded = false
    console.log(this.selectedMembers)
  }
  removeRoles(i:number){
    if (i > -1) {
      let removed = this.selectedMembers.roles.splice(i,1)[0]
      this.groupsCopy.push(removed)
    }
  }
  addSmallGroups(i:number){
    if (i > -1) {
      let removed = this.smallGroupsCopy.splice(i,1)[0]
      this.selectedMembers.smallGroups.push(removed)
    }
  }
  removeSmallGroups(i:number){
    if (i > -1) {
      let removed = this.selectedMembers.smallGroups.splice(i,1)[0]
      this.smallGroupsCopy.push(removed)
    }
  }
  getRoleSubs(id:any){
    this.personService.getGroup(id).subscribe({
      "next":(data)=>{
        console.log(data.data)
      }
    })
  }
  getSmallGroupSubs(id:any){
    const idNum = Number(id)
    this.smallGroupService.getSmallGroupById(idNum).subscribe({
      "next":(data)=>{
        console.log(data.data.members)
      }
    })
  }
  ngOnInit(): void {
      this.eventService.getEvents().subscribe({
        "next":(data)=>{
          let events = data.data
          this.calendarEvents = events
          console.log(this.calendarEvents)
          this.personService.getGroups().subscribe({
            "next":(data)=>{
              this.groups = data.data;
              this.groupsCopy = [...this.groups]
              this.groupNameMap = this.personService.groupMap
              console.log(this.groupsCopy)
            }
          })
          this.smallGroupService.getSmallGroupsNoMembers().subscribe({
            "next":(data)=>{
              this.smallGroups = data.data;
              this.smallGroupsCopy = [...this.smallGroups]
            }
          })
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
}




