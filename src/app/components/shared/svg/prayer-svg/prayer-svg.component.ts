import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-prayer-svg',
  templateUrl: './prayer-svg.component.html',
  styleUrls: ['./prayer-svg.component.scss']
})
export class PrayerSvgComponent {
  @Input() size: string = '50px';
  @Input() color: string = '#ccc';
}
