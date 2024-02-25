import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BibleChallengeService } from 'src/app/services/data/bible-challenge.service';

@Component({
  selector: 'app-bible-challenge-verse',
  templateUrl: './bible-challenge-verse.component.html',
  styleUrls: ['./bible-challenge-verse.component.scss']
})
export class BibleChallengeVerseComponent implements OnInit{
  verses:any = null
  book:any = null
  chapter: any = null
  constructor(
    private activatedRoute:ActivatedRoute,
    private bibleChallengeService:BibleChallengeService
  ){

  }
  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      let date = params['date']
      this.bibleChallengeService.getBibleVersesByChallengeDate(date).subscribe({
        "next":(data)=>{
          this.verses = data.verses
          this.book = data.book
          this.chapter = data.chapter
        },
        "error":()=>{
          console.error("can't find the data")
        }
      })
    })
  }
      
}
