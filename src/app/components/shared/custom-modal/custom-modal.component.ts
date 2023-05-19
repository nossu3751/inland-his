import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ModalService } from 'src/app/services/view/modal.service';
@Component({
  selector: 'app-custom-modal',
  templateUrl: './custom-modal.component.html',
  styleUrls: ['./custom-modal.component.scss']
})
export class CustomModalComponent {
  constructor(public modalService: ModalService) {}

  
}
