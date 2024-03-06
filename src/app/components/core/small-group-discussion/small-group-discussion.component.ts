import { Component, OnInit } from '@angular/core';
import { SmallGroupDiscussionService } from 'src/app/services/data/small-group-discussion.service';
@Component({
  selector: 'app-small-group-discussion',
  templateUrl: './small-group-discussion.component.html',
  styleUrls: ['./small-group-discussion.component.scss']
})
export class SmallGroupDiscussionComponent implements OnInit{
  lineBreaker = "<p><br></p>"
  discussion:string|null = null
  date:any = null
  constructor(private smallGroupDiscussionService: SmallGroupDiscussionService){}
  ngOnInit(): void {
      this.smallGroupDiscussionService.getLastetDiscussion().subscribe({
        "next":(data)=>{
          console.log(data)
          this.date = data.date
          this.discussion = data.html_template_data
          if (this.discussion != null && this.discussion.includes(this.lineBreaker)) {
            let splitted = this.discussion.split(this.lineBreaker)
            this.discussion = splitted.join("<div class='line-breaker'></div>")
          }
        },
        "error":()=>{
          console.log("no data")
        }
      })
  }
}
