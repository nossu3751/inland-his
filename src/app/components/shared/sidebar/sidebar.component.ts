import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import {Clipboard } from '@angular/cdk/clipboard'

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
  churchAddress="1101 N. Glen Ave, Pomona, CA, 91768"
  pastorPhone="san886@icloud.com"
  constructor(private clipboard: Clipboard, private snackBar:MatSnackBar){}

  copyToClipboard(s:string) {
    this.clipboard.copy(s)
    
    this.snackBar.open("내용이 복사되었습니다", "Close", {
      duration: 3000,
      panelClass: ['custom-snackbar'],
      verticalPosition: 'bottom'
    })
  }
}
