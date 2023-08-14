import { Component } from '@angular/core';
import { ModalService } from 'src/app/services/view/modal.service';
import { QtRedirectionComponent } from '../../alerts/qt-redirection/qt-redirection.component';

@Component({
  selector: 'app-widgets',
  templateUrl: './widgets.component.html',
  styleUrls: ['./widgets.component.scss']
})
export class WidgetsComponent {
  qtRedirectionComponent = QtRedirectionComponent
  
  constructor(
    public modalService: ModalService
  ){}


}
