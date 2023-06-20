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

  isAlertModalOpen = new BehaviorSubject<boolean>(false);
  alertTitle = new BehaviorSubject<string>("")
  alertComponent = new BehaviorSubject<Type<any> | null>(null);
  
  openModal(component: Type<any>, title: string = ""): void {
    this.component.next(component);
    this.title.next(title);
    this.isModalOpen.next(true);
    console.log("modal loading");
  }

  closeModal(): void {
    this.component.next(null);
    this.title.next("");
    this.isModalOpen.next(false);
    console.log("modal closed!");
  }

  openAlertModal(component:Type<any>, title:string = ""): void {
    this.alertComponent.next(component)
    this.alertTitle.next(title)
    this.isAlertModalOpen.next(true)
    console.log("alert open")
  }

  closeAlertModal(): void {
    this.alertComponent.next(null);
    this.alertTitle.next("")
    this.isAlertModalOpen.next(false);
    console.log("alert closed");
  }
}
