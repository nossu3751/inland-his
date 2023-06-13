import { Component } from '@angular/core';
import { ModalService } from 'src/app/services/view/modal.service';
@Component({
  selector: 'app-offering-redirection',
  templateUrl: './offering-redirection.component.html',
  styleUrls: ['./offering-redirection.component.scss']
})
export class OfferingRedirectionComponent {
  constructor(public modalService:ModalService){}
}
