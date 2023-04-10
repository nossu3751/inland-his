import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-logo-svg',
  templateUrl: './logo-svg.component.html',
  styleUrls: ['./logo-svg.component.scss']
})
export class LogoSvgComponent {
  @Input() size: string = '38px';
  @Input() color: string = 'black';
}
