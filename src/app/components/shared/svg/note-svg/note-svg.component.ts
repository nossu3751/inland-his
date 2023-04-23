import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-note-svg',
  templateUrl: './note-svg.component.html',
  styleUrls: ['./note-svg.component.scss']
})
export class NoteSvgComponent {
  @Input() size: string = '38px';
  @Input() color: string = 'black';
}
