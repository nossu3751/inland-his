import { Component, Input } from '@angular/core';
import { PersonService } from 'src/app/services/data/person.service';

@Component({
  selector: 'app-admin-top-navbar',
  templateUrl: './admin-top-navbar.component.html',
  styleUrls: ['./admin-top-navbar.component.scss']
})
export class AdminTopNavbarComponent {
  @Input() title:string|null = null
  constructor(public personService:PersonService){

  }
}
