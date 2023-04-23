import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-bible-svg',
  templateUrl: './bible-svg.component.html',
  styleUrls: ['./bible-svg.component.scss']
})
export class BibleSvgComponent {
  @Input() size: string = '38px';
  @Input() color: string = 'black';
}
