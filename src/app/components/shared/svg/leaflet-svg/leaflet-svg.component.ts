import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-leaflet-svg',
  templateUrl: './leaflet-svg.component.html',
  styleUrls: ['./leaflet-svg.component.scss']
})
export class LeafletSvgComponent {
  @Input() size: string = '38px';
  @Input() color: string = 'black';
}
