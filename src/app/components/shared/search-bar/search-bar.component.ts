import { Component, OnInit, Input, HostBinding } from '@angular/core';
import { SearchService } from 'src/app/services/data/search.service';
import { forkJoin } from 'rxjs'
import { BulletinService } from 'src/app/services/data/bulletin.service';
import { SmallGroupNoteService } from 'src/app/services/data/small-group-note.service';
import { VideoService } from 'src/app/services/data/video.service';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent implements OnInit {
  searchTerm = '';
  searchResults: any[] = [];
  constructor(
    private searchService:SearchService,
    private bulletinService:BulletinService,
    private smallGroupNoteService:SmallGroupNoteService,
    private videoService:VideoService
  ){}

  onInput() {
    this.searchService.setSearchTerm(this.searchTerm)
    console.log("searchTerm", this.searchTerm)
    const bulletinResults = this.searchService.search('bulletin',this.searchTerm);
    const videoResults = this.searchService.search('video',this.searchTerm);
    const smallGroupNoteResults = this.searchService.search('smallGroupNote',this.searchTerm);
    console.log("bulletin", bulletinResults, "video", videoResults, "smallGroupNote", smallGroupNoteResults)
  }

  search() {
    // this.subscription = this.searchService.getSearchTerm().subscribe((term) => {
    //   this.searchResults = this.searchService.search(term);
    // });
  }
  ngOnInit(): void {
    console.log("hello")
    this.videoService.getLiveStreams().subscribe((data)=>{
      console.log("video", data)
      const videoOptions = {
        keys: ['title']
      };
      this.searchService.createIndex('video', data, videoOptions);
    })
    this.bulletinService.getData().subscribe((data)=>{
      console.log("bulletin", data)
      const bulletinOptions = {
        keys: [
          'sermon_title','sermon_subtitle','sermon_content','representative_prayer',
          'community_news','message','hymns.title','news.title','news.description','blessing','post_message_hymn'
        ]
      };
      this.searchService.createIndex('bulletin', data, bulletinOptions);
    })
    this.smallGroupNoteService.getData().subscribe((data)=>{
      console.log("smallgroup", data)
      const smallGroupNoteOptions = {
        keys: ['title', 'html_template_data.html_string']
      }
      this.searchService.createIndex('smallGroupNote', data, smallGroupNoteOptions);
    })
  }
}
