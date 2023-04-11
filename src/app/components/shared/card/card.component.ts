import { Component, Input, OnInit } from '@angular/core';
import { ScreenSizeService } from 'src/app/services/view/screen-size.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit{
  isHovered:boolean;
  screenSizeClass:string;

  constructor(private screenSizeService: ScreenSizeService){
    this.isHovered = false;
    this.screenSizeClass = '';
  }
  
  @Input() height: string = "150px";
  @Input() borderRadius: string = "1em";
  @Input() marginLeft: string = "1em";
  @Input() marginRight: string = "1em";
  @Input() marginTop: string = "1em";
  @Input() marginBottom: string = "1em";
  @Input() boxShadow: string = "0 2px 10px rgba(0,0,0,.1)";
  @Input() borderColor: string = "#eee";
  @Input() backgroundColor: string = "white";
  @Input() alignItems: string = "stretch";
  @Input() justifyContent: string = "flex-start";
  @Input() display: string = "flex"
  @Input() hoveredBackgroundColor: string = "#f5f5f5"
  @Input() href: string = ""

  

  openLink(link:string){
    if (this.href !== ""){
      window.open(link, "_blank", 'noopener,noreferrer');
    }
    this.isHovered = false;
  }
  
  ngOnInit(): void {
    this.screenSizeService.screenSizeClass$.subscribe((screenSizeClass) => {
      this.screenSizeClass = screenSizeClass;
    });
  }
}
