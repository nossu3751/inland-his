import { Injectable, Type } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  constructor() {}

  isModalOpen = new BehaviorSubject<boolean>(false);
  component = new BehaviorSubject<Type<any> | null>(null);
  title = new BehaviorSubject<string>("")

  openModal(component: Type<any>, title: string = ""): void {
    this.component.next(component);
    this.isModalOpen.next(true);
    this.title.next(title);
    console.log("modal loading");
  }
  

  closeModal(): void {
    this.component.next(null);
    this.title.next("");
    this.isModalOpen.next(false);
    console.log("modal closed!");
  }
}
