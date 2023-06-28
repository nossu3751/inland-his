import { Component , OnInit} from '@angular/core';
import { Location } from '@angular/common';


@Component({
  selector: 'app-new-comer',
  templateUrl: './new-comer.component.html',
  styleUrls: ['./new-comer.component.scss']
})
export class NewComerComponent{
  
  constructor(private location: Location) {}
  closeAndGoBack() {
    this.location.back();
  }

}
