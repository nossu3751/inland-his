import { Component, Input, OnInit, HostListener, AfterViewInit, ChangeDetectorRef, ElementRef } from '@angular/core';
import { ScreenSizeService } from 'src/app/services/view/screen-size.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit, AfterViewInit{
// export class CardComponent implements OnInit{
  
  private heightProvided:boolean = false;

  @Input() height: string | null = null; 
  @Input() width: string = "auto";
  @Input() borderRadius: string = "0.25em";
  @Input() marginLeft: string = "1em";
  @Input() marginRight: string = "1em";
  @Input() marginTop: string = "1em";
  @Input() marginBottom: string = "1em";
  @Input() boxShadow: string = "0 0 0 rgba(0,0,0,.1)";
  @Input() borderColor: string = "#eee";
  @Input() backgroundColor: string = "white";
  @Input() alignItems: string = "center"; //stretch
  @Input() justifyContent: string = "center"; //flex-start
  @Input() display: string = "flex";
  @Input() hoveredBackgroundColor: string = "#f5f5f5";
  @Input() href: string = "";
  @Input() disableHoverEffect:boolean = false;
  @Input() widthOffset:string = "0";
  @Input() heightOffset:string = "0";
  @Input() padding:string = "0 0 0 0";
  @Input() textColor:string | null = null;
  @Input() hoveredTextColor: string | null = null;
  @Input() borderWidth: string = "1px";
  
  isHovered:boolean;
  screenSizeClass:string;

  constructor(private el:ElementRef, private screenSizeService: ScreenSizeService, private changeDetectorRef: ChangeDetectorRef){
    this.isHovered = false;
    this.screenSizeClass = '';
  }

  disableIfHrefEmpty(event: MouseEvent): void {
    if(this.href === ""){
      event.preventDefault();
    }
  }
  
  ngOnInit(): void {
    this.heightProvided = this.height != null;
    this.screenSizeService.screenSizeClass$.subscribe((screenSizeClass) => {
      this.screenSizeClass = screenSizeClass;
    });
    
  }

  getWidthInPixels(): number {
    const el = this.el.nativeElement as HTMLElement;
    const tempEl = document.createElement('div');
    tempEl.style.width = this.width;
    el.appendChild(tempEl);

    // Get the computed width in pixels
    const computedWidth = parseFloat(getComputedStyle(tempEl).width);

    // Remove the temporary element
    el.removeChild(tempEl);

    return computedWidth;
  }

  updateSize() {
    if (!this.heightProvided) {
      const widthInPixels = this.getWidthInPixels();
      const heightValue = widthInPixels * (9 / 16);
      this.height = 'calc(' + heightValue + 'px' + ' + ' + this.heightOffset + ")";
      console.log("Video Card height:", this.height)
    }
  }

  @HostListener('window:resize')
  @HostListener('window:orientationchange')
  onResize() {
    this.updateSize();
  }

  ngAfterViewInit(): void {   
    this.updateSize()
    this.changeDetectorRef.detectChanges();
  }
}
