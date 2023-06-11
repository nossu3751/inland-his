import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import  Fuse  from 'fuse.js'
@Injectable({
  providedIn: 'root'
})
export class SearchService {
  private fuse!: Fuse<any>;

  private bulletinFuse!: Fuse<any>;
  private videoFuse!: Fuse<any>;
  private smallGroupNoteFuse!: Fuse<any>;

  private searchTerm$ = new BehaviorSubject<string>('');

  constructor() { }

  setSearchTerm(term: string) {
    this.searchTerm$.next(term);
  }

  getSearchTerm(): Observable<string> {
    return this.searchTerm$.asObservable();
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
