import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import  Fuse  from 'fuse.js'
@Injectable({
  providedIn: 'root'
})
export class SearchService {

  private bulletinFuse!: Fuse<any>;
  private videoFuse!: Fuse<any>;
  private smallGroupNoteFuse!: Fuse<any>;

  private searchTerm$ = new BehaviorSubject<string>('');
  private searchResults$ = new BehaviorSubject<{bulletin: any[], video: any[], smallGroupNote: any[]}>({bulletin: [], video: [], smallGroupNote: []});
  
  constructor() { }

  setSearchTerm(term: string) {
    this.searchTerm$.next(term);
  }

  getSearchTerm(): Observable<string> {
    return this.searchTerm$.asObservable();
  }

  setSearchResults(results: {bulletin: any[], video: any[], smallGroupNote: any[]}) {
    this.searchResults$.next(results);
  }

  getSearchResults(): Observable<{bulletin: any[], video: any[], smallGroupNote: any[]}> {
    return this.searchResults$.asObservable();
  }


  // createIndex(data: any[], options: Fuse.IFuseOptions<any>) {
  //   this.fuse = new Fuse(data, options);
  // }

  createIndex(type:string, data: any[], options: Fuse.IFuseOptions<any>) {
    switch (type) {
      case 'bulletin':
        this.bulletinFuse = new Fuse(data, options);
        break;
      case 'video':
        this.videoFuse = new Fuse(data, options);
        break;
      case 'smallGroupNote':
        this.smallGroupNoteFuse = new Fuse(data, options);
        break;
    }
  }

  search(type: string, query: string): any[] {
    let fuseInstance;
    switch (type) {
      case 'bulletin':
        fuseInstance = this.bulletinFuse;
        break;
      case 'video':
        fuseInstance = this.videoFuse;
        break;
      case 'smallGroupNote':
        fuseInstance = this.smallGroupNoteFuse;
        break;
    }

    if (!fuseInstance) {
      return [];
    }

    // return fuseInstance.search(query).map(result => result.item);
    return fuseInstance.search(query)
  }
}
