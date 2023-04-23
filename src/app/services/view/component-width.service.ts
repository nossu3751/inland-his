import { Injectable, ElementRef, Renderer2 } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ComponentWidthService {

  constructor(private renderer: Renderer2) { }

  getWidthInPixels(el: ElementRef): number {
    const tempEl = this.renderer.createElement('div');
    tempEl.style.width = el.nativeElement.offsetWidth + 'px';
    this.renderer.appendChild(el.nativeElement, tempEl);

    // Get the computed width in pixels
    const computedWidth = parseFloat(getComputedStyle(tempEl).width);

    // Remove the temporary element
    this.renderer.removeChild(el.nativeElement, tempEl);

    return computedWidth;
  }
}
