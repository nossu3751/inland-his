import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HoverService {
  private hoverStatusSource = new BehaviorSubject<boolean>(false);
  hoverStatus$ = this.hoverStatusSource.asObservable();

  updateHoverStatus(status: boolean): void {
    this.hoverStatusSource.next(status);
  }
}
