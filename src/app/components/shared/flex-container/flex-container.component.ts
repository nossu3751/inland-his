import { Component,Input,HostBinding } from '@angular/core';

@Component({
  selector: 'app-flex-container',
  templateUrl: './flex-container.component.html',
  styleUrls: ['./flex-container.component.scss']
})
export class FlexContainerComponent {
  @HostBinding('style.align-items')
  @Input() 
  alignItems: string = "stretch"; //stretch

  @HostBinding('style.justify-content')
  @Input() 
  justifyContent: string = "flex-start"; //flex-start

  @HostBinding('style.height')
  @Input()
  height:string = "auto";

  @HostBinding('style.margin-top')
  @Input() 
  marginTop: string = "0"; //flex-start

  @HostBinding('style.margin-bottom')
  @Input()
  marginBottom:string = "0";

  @HostBinding('style.margin-left')
  @Input() 
  marginLeft: string = "0"; //flex-start

  @HostBinding('style.margin-right')
  @Input()
  marginRight:string = "0";
}
