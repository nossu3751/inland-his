import { Directive, HostListener } from '@angular/core';
import { Location } from '@angular/common';
@Directive({
  selector: '[appNavigateBack]'
})
export class NavigateBackDirective {

  constructor(private location: Location) {}

  @HostListener('click', ['$event'])
    onclick(event: MouseEvent) {
      event?.preventDefault();
      this.location.back()
    }

}
