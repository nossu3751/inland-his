import { Component } from '@angular/core';
import { ModalService } from 'src/app/services/view/modal.service';

@Component({
  selector: 'app-qt-redirection',
  templateUrl: './qt-redirection.component.html',
  styleUrls: ['./qt-redirection.component.scss']
})
export class QtRedirectionComponent {
  constructor(public modalService:ModalService){}
}
