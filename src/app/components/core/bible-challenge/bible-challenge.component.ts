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
    let i = 0
    if(this.bibleChallenges){
      while (i < this.bibleChallenges.length){
        let itemDate = new Date(this.bibleChallenges[i].date)
        if (itemDate > today) {
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

  goToBibleChallenge(dateStr:any){
    
    this.router.navigateByUrl(`bible-challenge/${dateStr}`)
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
        if (this.bibleChallenges != null) {
          for(let i = 0; i < this.bibleChallenges.length;i++){
            let challenge = this.bibleChallenges[i]
            challenge.dayCount = i+1
          }
        }
        this.splitPreviousDates()
        console.log(this.bibleChallenges)
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
