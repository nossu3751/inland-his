import { Directive, ElementRef, Input, HostListener } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router, NavigationEnd } from '@angular/router';
import { Location } from '@angular/common';
import { filter, take } from 'rxjs/operators';
import { RouteModalComponent } from 'src/app/components/shared/route-modal/route-modal.component';
import { AppComponent } from 'src/app/app.component';

@Directive({
  selector: '[routeModalOpen]'
})
export class RouteModalOpenLogicDirective {

  @Input('routeModalOpen') route: string = '/';

  constructor(
    private elementRef: ElementRef, 
    private router: Router, 
    private location: Location, 
    private dialog: MatDialog,
    private appComponent: AppComponent) { }

  @HostListener('click', ['$event'])
  onClick(event: MouseEvent) {
    event.preventDefault();
  
    console.log(`Opening modal for route: ${this.route}`);
  
    const dialogRef = this.dialog.open(RouteModalComponent, {
      width: '100%',
      height: '100%',
      panelClass: 'full-screen-modal',
      backdropClass: 'modal-backdrop',
      data: { route: this.route, parentComponent: this.appComponent }
    });
  
    this.router.navigate([this.route], { skipLocationChange: true });
  
    dialogRef.afterClosed().subscribe(() => {
      // Navigate back to the previous route
      this.location.back();
    });
  }

}
