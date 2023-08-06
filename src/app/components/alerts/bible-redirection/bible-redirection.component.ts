import { Component } from '@angular/core';
import { ModalService } from 'src/app/services/view/modal.service';

@Component({
  selector: 'app-bible-redirection',
  templateUrl: './bible-redirection.component.html',
  styleUrls: ['./bible-redirection.component.scss']
})
export class BibleRedirectionComponent {
  constructor(public modalService:ModalService){}
}
