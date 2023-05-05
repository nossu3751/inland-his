import { Component, Input, HostBinding } from '@angular/core';

@Component({
  selector: 'app-flex-item',
  templateUrl: './flex-item.component.html',
  styleUrls: ['./flex-item.component.scss']
})
export class FlexItemComponent {
  @Input() 
  @HostBinding('style.flex-direction')
  flexDirection:string = "row";

  @Input() 
  @HostBinding('style.width')
  width:string = "auto"

  @Input()
  @HostBinding('style.flex')
  flex:string = "1"

  @Input()
  @HostBinding('style.align-items')
  alignItems:string = "stretch"

  @Input()
  @HostBinding('style.justify-content')
  justifyContent:string = "flex-start"

}
