import { Component, OnInit} from '@angular/core';
import { SearchService } from 'src/app/services/data/search.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent implements OnInit {
  searchTerm = '';
  searchResults: any[] = [];

  constructor(
    private router:Router,
    private searchService:SearchService
  ){}
  
  onEnter() {
    this.search(this.searchTerm)
    const currUrl = this.router.url
    if(currUrl !== "/search"){
      this.router.navigate(['/search']);
    }
    
  }
  onInput() {
    const currUrl = this.router.url
    if(this.searchTerm.trim() !== ""){
      if(currUrl !== "/search"){
        this.router.navigate(['/search']);
      }
    }else{
      this.router.navigate(['']);
      this.searchService.searchResults$.next({...this.searchService.defaultResult})
    }
  }

  search(search:string) {
    this.searchService.search(search)
  }

  ngOnInit(): void {
    
  }
}
