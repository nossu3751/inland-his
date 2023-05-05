import { Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-small-group-json-parse',
  templateUrl: './small-group-json-parse.component.html',
  styleUrls: ['./small-group-json-parse.component.scss']
})
export class SmallGroupJsonParseComponent implements OnInit {
  @Input() data: any;
  @Input() inputs: any;
  style: any;

  getStyle(): any {
    if(!this.data){
      return {}
    }else{
      return {
        'color':this.data.textColor,
        'text-decoration':this.data.textDecoration,
        'font-weight':this.data.fontWeight
      }
    }
  }

  ngOnInit(): void {
      console.log(this.data)
  }
}
