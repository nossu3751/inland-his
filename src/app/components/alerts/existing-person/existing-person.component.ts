import { Component } from '@angular/core';
import { ModalService } from 'src/app/services/view/modal.service';
@Component({
  selector: 'app-existing-person',
  templateUrl: './existing-person.component.html',
  styleUrls: ['./existing-person.component.scss']
})
export class ExistingPersonComponent {
  constructor(public modalService:ModalService){}

  
}
