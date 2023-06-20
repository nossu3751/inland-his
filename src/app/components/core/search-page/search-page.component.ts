import { Component, OnInit, Input } from '@angular/core';
import { SearchService } from 'src/app/services/data/search.service';
@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.scss']
})
export class SearchPageComponent implements OnInit{
  @Input() searchResults: {bulletin: any[], video: any[], smallGroupNote: any[]} = {bulletin:[], video:[], smallGroupNote:[]}

  constructor(private searchService: SearchService) { }

  pastorPhotoMap = new Map<string, string>([
    ["정산","assets/pastors/san.webp"],
    ["안환","assets/pastors/hwan.webp"],
    ["김현호","assets/pastors/kim.webp"],
    ["윤성찬","assets/pastors/yoon.webp"],
  ])

  getPastorName(pastor:string) {
    if(pastor.endsWith("목사")) {pastor = pastor.slice(0,-2)}
    else if (pastor.endsWith("목사님")) {pastor = pastor.slice(0,-3)}
    pastor = pastor.trim();  
    pastor = pastor.replace(/\s/g, ''); 
    return pastor 
  }
  
  ngOnInit(): void {
    this.searchService.getSearchResults().subscribe(results => {
      this.searchResults = results;
      console.log("search result", this.searchResults);
    });
  }
}
