import { Component, Input } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-route-modal',
  templateUrl: './route-modal.component.html',
  styleUrls: ['./route-modal.component.scss']
})
export class RouteModalComponent {
  @Input() route: string = '/';

  constructor(private dialogRef: MatDialogRef<RouteModalComponent>) {}

  close() {
    this.dialogRef.close();
  }
}
