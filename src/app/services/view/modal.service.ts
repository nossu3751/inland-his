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
  isLoading = new BehaviorSubject<boolean>(false);

  openModal(component: Type<any>, title: string = ""): void {
    this.component.next(component);
    this.isModalOpen.next(true);
    this.title.next(title);
    this.isLoading.next(true);
    console.log("modal loading");
  }

  closeModal(): void {
    this.component.next(null);
    this.isModalOpen.next(false);
    this.title.next("");
    this.isLoading.next(false);
    console.log("modal closed!");
  }
}
