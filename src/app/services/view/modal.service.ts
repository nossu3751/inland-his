import { Injectable, Type } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  constructor() {}

  isModalOpen = new BehaviorSubject<boolean>(false);
  component = new BehaviorSubject<Type<any> | null>(null);

  openModal(component: Type<any>): void {
    this.component.next(component);
    this.isModalOpen.next(true);
  }

  closeModal(): void {
    this.component.next(null);
    this.isModalOpen.next(false);
    console.log("modal closed!")
  }
}
