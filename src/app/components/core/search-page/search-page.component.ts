import { Component, OnInit, Input } from '@angular/core';
import { BulletinService } from 'src/app/services/data/bulletin.service';
import { EventService } from 'src/app/services/data/event.service';
import { SearchService } from 'src/app/services/data/search.service';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.scss']
})
export class SearchPageComponent implements OnInit{

  constructor(
    public searchService: SearchService,
    public eventService: EventService,
    public bulletinService: BulletinService
  ) { }

  pastorPhotoMap = new Map<string, string>([
    ["정산","assets/pastors/san.webp"],
    ["안환","assets/pastors/hwan.webp"],
    ["김현호","assets/pastors/kim.webp"],
    ["윤성찬","assets/pastors/yoon.webp"],
    ["션킴","assets/pastors/sean.webp"],
    ["김성신","assets/pastors/sean.webp"]
  ])

  selectedSearchOption:any = 0;
  searchOptions = [
    {"name":"주보", "route":"bulletin"},
    {"name":"예배", "route":"videos"},
    {"name":"이벤트", "route":"calendar"}
  ]
  dropDownOpen:boolean = false
  searchString:string = ""

  toggleDropdown(){
    this.dropDownOpen = !this.dropDownOpen
  }

  changeSearchOption(i:number){
    this.selectedSearchOption = i;
    this.toggleDropdown()
  }

  getPastorImageLink(pastor:string) {
    let correctedName = this.getPastorName(pastor)
    if (this.pastorPhotoMap.has(correctedName)) {
      return this.pastorPhotoMap.get(correctedName)
    }else {
      return "assets/church-icons/no-profile.png"
    }
  }

  getPastorName(pastor:string) {
    if(pastor.endsWith("목사")) {pastor = pastor.slice(0,-2)}
    else if (pastor.endsWith("목사님")) {pastor = pastor.slice(0,-3)}
    pastor = pastor.trim();  
    pastor = pastor.replace(/\s/g, ''); 
    return pastor 
  }

  search(i:number, s:string) {
    if(i==0){
      this.searchService.searchBulletin(s)
    }else if(i==1){
      this.searchService.searchVideo(s)
    }else if(i==2){
      this.searchService.searchEvent(s)
    }
  }

  ngOnInit(): void {
      this.selectedSearchOption = this.searchService.prevRoute
  }
}
