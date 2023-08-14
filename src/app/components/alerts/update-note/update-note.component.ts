import { Component } from '@angular/core';
import { ModalService } from 'src/app/services/view/modal.service';

@Component({
  selector: 'app-update-note',
  templateUrl: './update-note.component.html',
  styleUrls: ['./update-note.component.scss']
})
export class UpdateNoteComponent {
  constructor(public modalService:ModalService){}
}
