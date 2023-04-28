import { Component, AfterViewInit, OnInit } from '@angular/core';
import { SmallGroupNoteService } from 'src/app/services/data/small-group-note.service';
import InputPlaceholderPlugin from 'src/app/utils/ckeditor-plugins/input-placeholder-plugin';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { stringify } from 'flatted';
import { parse } from 'node-html-parser';


function customInputButton(context:any) {
  const ui = $.summernote.ui;
  const button = ui.button({
    contents: '입력란',
    tooltip: 'Insert input placeholder',
    container: '.note-editor',
    className: 'note-btn',
    click: function () {
      const inputPlaceholder = '<span class="input-placeholder" contenteditable="false">입력란<button class="remove-input-placeholder" type="button">X</button></span>';
      const node = document.createElement('div');
      node.innerHTML = inputPlaceholder;
      context.invoke('editor.insertNode', node.firstChild);
    },
  });
  return button.render();
}

@Component({
  selector: 'app-small-group-notes-admin',
  templateUrl: './small-group-notes-admin.component.html',
  styleUrls: ['./small-group-notes-admin.component.scss']
})
export class SmallGroupNotesAdminComponent implements AfterViewInit, OnInit {
  fileToUpload: File | null = null;
  
  constructor(private notesService: SmallGroupNoteService){}

  config: any;
  content: string = ""

  handleFileInput(event: Event){
    const files = (event.target as HTMLInputElement).files;
    if (files) {
      this.fileToUpload = files.item(0)
    }
  }

  onSubmit() {
    if (this.fileToUpload) {
      this.notesService.uploadFile(this.fileToUpload).subscribe({
        next: (response) => {
          console.log('File uploaded successfully', response);
        },
        error: (error) => {
          console.error('File upload error', error)
        }
      })
    }
  }

  ngOnInit(): void {
      this.config = {
        placeholder: '',
        tabsize: 2,
        height: 600,
        uploadImagePath: '/api/upload',
        
        toolbar: [
            ['misc', ['undo', 'redo', 'clear']],
            ['font', ['bold', 'italic', 'underline']],
            ['fontsize', ['fontname', 'fontsize', 'forecolor', 'backcolor']],
            ['para', ['style', 'ul', 'ol', 'paragraph']],
            ['insert', ['picture', 'link', 'inputBtn']],
        ],
    
        buttons: {
          inputBtn: (context: any) => customInputButton(context),
        },
        fontNames: ['Helvetica', 'Arial', 'Arial Black', 'Comic Sans MS', 'Courier New', 'Roboto', 'Times']
      }
  }

  ngAfterViewInit(): void {
    $(document).on('click', '.remove-input-placeholder', function () {
      $(this).closest('.input-placeholder').remove();
    });
  }
}
