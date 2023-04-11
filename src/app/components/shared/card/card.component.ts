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
  @Input() borderColor: string = "#eee";
  @Input() backgroundColor: string = "white";
  @Input() alignItems: string = "stretch";
  @Input() justifyContent: string = "flex-start";
  @Input() display: string = "flex"
  @Input() hoveredBackgroundColor: string = "#f5f5f5"

  isHovered:boolean;

  constructor(){
    this.isHovered = false;
  }
  
}
