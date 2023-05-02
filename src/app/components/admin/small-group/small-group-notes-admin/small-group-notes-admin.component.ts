import { Component, AfterViewInit, OnInit, ElementRef} from '@angular/core';
import { SmallGroupNoteService } from 'src/app/services/data/small-group-note.service';
import { ViewChild } from '@angular/core';
import { parse } from 'node-html-parser'


const inputPlaceHolderHtml = '<span class="input-placeholder" contenteditable="false">입력란<button class="remove-input-placeholder" type="button">X</button></span>'
function customInputButton(context:any) {
  const ui = $.summernote.ui;
  const button = ui.button({
    contents: '입력란',
    tooltip: 'Insert input placeholder',
    container: '.note-editor',
    className: 'note-btn',
    click: function () {
      const inputPlaceholder = inputPlaceHolderHtml;
      const node = document.createElement('div');
      node.innerHTML = inputPlaceholder;
      context.invoke('editor.insertNode', node.firstChild);
    },
  });
  return button.render();
}

function parseNode(node: any): any {
  if (node.nodeType !== 1) {
    if (node.nodeType === 3) {
      return {
        tagName: null,
        content: node.rawText,
        textColor: null,
        textDecoration: null,
        fontWeight: null,
        children: []
      }
    }
    return null;
  }
  const style = node.getAttribute('style');
  const tagName = node.tagName;
  const className = node.getAttribute('class');

  // Extract style properties
  const textColor = style ? style.match(/color:\s*([^;]+);?/i) : null;
  const textDecoration = style ? style.match(/text-decoration:\s*([^;]+);?/i) : null;
  const fontWeight = style ? style.match(/font-weight:\s*([^;]+);?/i) : null;

  const fontColor = tagName && tagName.toUpperCase() === 'FONT' ? node.getAttribute('color') : null;

  const result: any = {
    tagName,
    content: null,
    textColor: textColor ? textColor[1] : fontColor,
    textDecoration: textDecoration ? textDecoration[1] : null,
    fontWeight: fontWeight ? fontWeight[1] : (tagName && tagName.toUpperCase() === 'B') ? 'bold' : null,
    children: [],
  };

  let hasChildNodes = false;

  // Check if the current node is an input-placeholder
  if ((tagName === 'SPAN' || tagName === 'span') && className === 'input-placeholder') {
    result.content = 'input-placeholder';
  } else {
    for (const child of node.childNodes) {
      if (child.nodeType === 1) {
        hasChildNodes = true;
        result.children.push(parseNode(child));
      }
    }
  }

  // Set content only for leaf nodes
  if (!hasChildNodes && result.content === null) {
    result.content = node.rawText;
  }

  return result;
}




@Component({
  selector: 'app-small-group-notes-admin',
  templateUrl: './small-group-notes-admin.component.html',
  styleUrls: ['./small-group-notes-admin.component.scss']
})
export class SmallGroupNotesAdminComponent implements AfterViewInit, OnInit {
  @ViewChild('summernote') summernoteRef: ElementRef | undefined;
  fileToUpload: File | null = null;


  constructor(private smallGroupNoteService: SmallGroupNoteService){}

  config: any;
  content: any;
  contentsJson: any;

  handleFileInput(event: Event){
    const files = (event.target as HTMLInputElement).files;
    if (files) {
      this.fileToUpload = files.item(0)
    }
  }

  onSubmit() {
    if (this.fileToUpload) {
      this.smallGroupNoteService.uploadFile(this.fileToUpload).subscribe({
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

      this.smallGroupNoteService.getData().subscribe((data) => {
        console.log(data)
        this.contentsJson = data
        var content_tmp = this.contentsJson.length > 0 ? this.contentsJson[0]["html_template_data"]["html_string"] : ""
        const inputPlaceholderRegex = new RegExp("\\[input\\]", 'gi');
        content_tmp = content_tmp.replace(inputPlaceholderRegex, inputPlaceHolderHtml)
        this.content = content_tmp
        console.log(this.content)
      })
  }

  ngAfterViewInit(): void {
    $(document).on('click', '.remove-input-placeholder', function () {
      $(this).closest('.input-placeholder').remove();
    });
  }

  testButton():void {
    this.content = "Changed"

  }

  exportToJson(): void {
    const htmlContent = ($(this.summernoteRef?.nativeElement) as any).summernote('code');
    const rootNode = parse(htmlContent);
    console.log("parsed html", rootNode)
    const parsedContent = parseNode(rootNode);
    console.log(parsedContent);
  }

}