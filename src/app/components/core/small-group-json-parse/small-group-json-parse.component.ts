import { Component, Input, OnInit, AfterViewInit} from '@angular/core';

@Component({
  selector: 'app-small-group-json-parse',
  templateUrl: './small-group-json-parse.component.html',
  styleUrls: ['./small-group-json-parse.component.scss']
})
export class SmallGroupJsonParseComponent implements OnInit, AfterViewInit {
  @Input() data: any;
  @Input() inputs: any;
  @Input() showSpinner = true; //isRoot?
  loading = true;

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
      // console.log(this.data)
      if(this.showSpinner){
        console.log(this.loading)
      }
      console.log(this.inputs)
  }

  ngAfterViewInit(): void {
    if (this.showSpinner) {
      // Set loading to false when the view has been fully initialized
      setTimeout(() => {
        this.loading = false;
        console.log(this.loading)
      });
    } else {
      this.loading = false;
    }
  }
}
