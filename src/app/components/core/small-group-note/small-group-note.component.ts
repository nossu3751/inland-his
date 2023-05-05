import { Component, Input, OnInit } from '@angular/core';
import { SmallGroupNoteService } from 'src/app/services/data/small-group-note.service';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
@Component({
  selector: 'app-small-group-note',
  templateUrl: './small-group-note.component.html',
  styleUrls: ['./small-group-note.component.scss']
})
export class SmallGroupNoteComponent implements OnInit{
  @Input() isPartial:boolean = false;
  @Input() smallGroupNote:any;

  constructor(
    private smallGroupNoteService: SmallGroupNoteService,
    private sanitizer: DomSanitizer
  ){}

  getTrustedHtml(html: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(html)
  }

  ngOnInit(): void {
    this.smallGroupNoteService.getData().subscribe((data) => {
      this.smallGroupNote = data.length > 0 ? data[0] : null;
    })
  }
}
