import { Component } from '@angular/core';
import { ModalService } from 'src/app/services/view/modal.service';
import { OfferingComponent } from '../../core/offering/offering.component';

@Component({
  selector: 'app-offering-redirection',
  templateUrl: './offering-redirection.component.html',
  styleUrls: ['./offering-redirection.component.scss']
})
export class OfferingRedirectionComponent {
  offeringComponent = OfferingComponent
  constructor(public modalService:ModalService){}
}
