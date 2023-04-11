import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent {
  @Input() height: string = "150px";
  @Input() borderRadius: string = "1em";
  @Input() marginLeft: string = "1em";
  @Input() marginRight: string = "1em";
  @Input() marginTop: string = "1em";
  @Input() marginBottom: string = "1em";
  @Input() boxShadow: string = "0 2px 10px rgba(0,0,0,.1)";
}
