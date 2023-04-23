import { Component, HostBinding, Input} from '@angular/core';

@Component({
  selector: 'app-block',
  templateUrl: './block.component.html',
  styleUrls: ['./block.component.scss']
})
export class BlockComponent {
  @Input() 
  @HostBinding('style.height')
  height:string = "auto"

  @Input() 
  @HostBinding('style.padding-bottom')
  paddingBottom:string = "0"

  @Input() 
  @HostBinding('style.padding-top')
  paddingTop:string = "0"

  @Input() 
  @HostBinding('style.padding-left')
  paddingLeft:string = "0"

  @Input() 
  @HostBinding('style.padding-right')
  paddingRight:string = "0"
}
