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

  search(search:string) {
    this.searchService.search(search)
  }

  ngOnInit(): void {
    
  }
}
