import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { ModalService } from 'src/app/services/view/modal.service';
import { trigger, transition, useAnimation } from '@angular/animations';

import { slideInLeft, slideOutLeft, slideInDown, slideOutDown, slideInRight, slideOutRight } from 'ng-animate'

@Component({
  selector: 'app-custom-modal',
  templateUrl: './custom-modal.component.html',
  styleUrls: ['./custom-modal.component.scss'],
  animations: [
    trigger('sideMenuSlideInOutLeft', [
      transition(':enter', useAnimation(slideInLeft, { params: { timing: 0.3, delay: 0, easing: 'cubic-bezier(0,0,0,.98)'  } })),
      transition(':leave', useAnimation(slideOutLeft, { params: { timing: 0.3, delay: 0, easing: 'cubic-bezier(0,0,0,.98)'  } }))
    ]),
    trigger('itemSlideInOut', [
      transition(':enter', useAnimation(slideInDown, { params: { timing: 0.3, delay: 0, easing: 'cubic-bezier(0,0,0,.98)'  } })),
      transition(':leave', useAnimation(slideOutDown, { params: { timing: 0.3, delay: 0, easing: 'cubic-bezier(0,0,0,.98)'  } }))
    ]),
    trigger('sideMenuSlideInOutRight', [
      transition(':enter', useAnimation(slideInRight, { params: { timing: 0.3, delay: 0, easing: 'cubic-bezier(0,0,0,.98)'  } })),
      transition(':leave', useAnimation(slideOutRight, { params: { timing: 0.3, delay: 0, easing: 'cubic-bezier(0,0,0,.98)'  } }))
    ])
  ],
})
export class CustomModalComponent {
  
  constructor(public modalService: ModalService) {}
  
  getTitle():string {
    let title = this.modalService.title.getValue()
    console.log(title)
    return title
  }
}
