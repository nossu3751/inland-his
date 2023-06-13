import { Component } from '@angular/core';
import { ModalService } from 'src/app/services/view/modal.service';

@Component({
  selector: 'app-alert-modal',
  templateUrl: './alert-modal.component.html',
  styleUrls: ['./alert-modal.component.scss']
})
export class AlertModalComponent {
  constructor(public modalService: ModalService) {}
  


}
