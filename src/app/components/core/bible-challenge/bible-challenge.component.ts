import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BibleChallengeService } from 'src/app/services/data/bible-challenge.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-bible-challenge',
  templateUrl: './bible-challenge.component.html',
  styleUrls: ['./bible-challenge.component.scss']
})
export class BibleChallengeComponent implements OnInit{
  bibleChallenges:any = null
  startDate = new Date('02-19-2024')
  today = new Date()
  previousDates:any = null

  constructor(
    private bibleChallengeService:BibleChallengeService,
    private snackBar: MatSnackBar,
    private router: Router
  ){}

  splitPreviousDates(){
    let today = new Date()

    today = new Date(today.getFullYear(), today.getMonth(), today.getDate())
    // console.log("today",today)
    let i = 0
    if(this.bibleChallenges){
      while (i < this.bibleChallenges.length){
        let itemDate = new Date(this.bibleChallenges[i].date)
        itemDate = new Date(itemDate.getFullYear(), itemDate.getMonth(), itemDate.getDate()+1)
        // console.log("item date", itemDate)
        if (itemDate >= today) {
          break
        }
        i++
      }
      this.previousDates = this.bibleChallenges.slice(0, i)
      this.bibleChallenges = this.bibleChallenges.slice(i)
      
    }
  }

  padWithZero(value: number): string {
    return value.toString().padStart(2, '0');
  }

  goToBibleChallenge(dateStr:any, start?:number|undefined, end?:number|undefined ){
    if (start !== undefined && end !== undefined) {
      this.router.navigateByUrl(`bible-challenge/${dateStr}?verseStart=${start}&verseEnd=${end}`)
    }else{
      this.router.navigateByUrl(`bible-challenge/${dateStr}`)
    }
  }

  getStartEndVerse(title:string, startOrEnd:string = "start") {
    if (title.includes(":")) {
      let titleSplit = title.split(":")[1]
      if (titleSplit.includes("-")) {
        let verseSplit = titleSplit.split("-")
        let start=verseSplit[0]
        let end=verseSplit[1]
        if (startOrEnd == "start") {
          return Number(start)
        }else{
          return Number(end)
        }
      }else {
        return Number(titleSplit)
      }
    }else {
      return undefined;
    }
  }

  getDayNumber(dateStr: string): number {
    let date = new Date(dateStr)
    let diff = date.getTime() - this.startDate.getTime()
    diff = diff / (1000 * 3600 * 24);
    return diff + 1;

  }
  ngOnInit(): void {
    this.bibleChallengeService.getBibleChallenges().subscribe({
      "next":(data)=>{
        this.bibleChallenges = data
        // console.log(this.bibleChallenges)
        if (this.bibleChallenges != null) {
          for(let i = 0; i < this.bibleChallenges.length;i++){
            let challenge = this.bibleChallenges[i]
            challenge.dayCount = i+1
          }
        }
        this.splitPreviousDates()
        // console.log(this.bibleChallenges)
      },
      "error":()=>{
        this.snackBar.open("챌린지를 불러올 수 없습니다", "Close", {
          duration: 3000,
          panelClass: ['custom-snackbar'],
          verticalPosition: 'bottom'
        })
      }
    })
  }
}
