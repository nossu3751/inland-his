import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, HostBinding, Input, OnInit } from '@angular/core';
import { RoutingService } from 'src/app/services/data/routing.service';

@Component({
  selector: 'app-loading-screen',
  templateUrl: './loading-screen.component.html',
  styleUrls: ['./loading-screen.component.scss'],
  animations: [
    trigger('fade', [
      state('in', style({ opacity: 1 })),
      state('out', style({ opacity: 0 })),
      transition('in => out', [
        animate('0.5s')
      ])
    ])
  ]
})
export class LoadingScreenComponent implements OnInit{
  @Input() message:string|null = null
  @Input() lastingTime = 2
  @Input() mode = "screen"

  @HostBinding('style.height')
  height:string = "100%";

  @HostBinding('style.width')
  width:string = "100%";

  @HostBinding('style.top')
  top:string = "0px";

  fadeState = 'in'
  constructor(public routingService:RoutingService){}

  ngOnInit(): void {
      if (this.mode == "container"){
        this.height = "calc(var(--html-height) - var(--nav-height) * 2";
        this.top = "var(--nav-height)"
      }else if (this.mode == "admin-container"){
        this.height = "calc(var(--html-height) - var(--nav-height)";
        this.top = "var(--nav-height)"
      }
      // setTimeout(() => {
      //   this.fadeState = 'out'
      // }, (this.lastingTime-0.5) * 1000)
  }
}
