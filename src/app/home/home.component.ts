import { Component, OnInit } from '@angular/core';
import { ScreenSizeService } from '../services/view/screen-size.service'
import { ModalService } from '../services/view/modal.service';
import { SmallGroupNoteComponent } from '../components/core/small-group-note/small-group-note.component';
import { NewComerFormComponent } from '../components/core/new-comer-form/new-comer-form.component';
import { BulletinPaperComponent } from '../components/core/bulletin-paper/bulletin-paper.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit{

  smallGroupNoteComponent = SmallGroupNoteComponent
  newComerFormComponent = NewComerFormComponent
  bulletinPaperComponent = BulletinPaperComponent
  
  constructor(
    private screenSizeService: ScreenSizeService,
    public modalService: ModalService
  ) {}
  screenSizeClass = '';

  ngOnInit() {
    this.screenSizeService.screenSizeClass$.subscribe((screenSizeClass) => {
      this.screenSizeClass = screenSizeClass;
    });
  }
}
