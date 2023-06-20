import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, FormArray, AbstractControl } from '@angular/forms';
import { BulletinService } from 'src/app/services/data/bulletin.service';
@Component({
  selector: 'app-bulletin-paper-admin',
  templateUrl: './bulletin-paper-admin.component.html',
  styleUrls: ['./bulletin-paper-admin.component.scss']
})
export class BulletinPaperAdminComponent implements OnInit {
  form!: FormGroup;

  constructor(private fb: FormBuilder, private bulletinService: BulletinService) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      news: this.fb.array([
        this.createNewsFormGroup()
      ]),
      sermonTitle: ['', Validators.required],
      sermonSubtitle: [''],
      sermonContent: ['', Validators.required],
      hymns: this.fb.array([
        this.createHymnFormGroup()
      ]),
      representativePrayer: ['', Validators.required],
      communityNews: ['', Validators.required],
      message: ['', Validators.required],
      postMessageHymn: [''],
      blessing: ['', Validators.required]
    });
  }

  createNewsFormGroup(): FormGroup {
    return this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
    });
  }

  createHymnFormGroup(): FormGroup {
    return this.fb.group({
      title: ['', Validators.required]
    });
  }

  removeHymn(index: number): void {
    const hymnsArray = this.form.get('hymns') as FormArray;
    hymnsArray.removeAt(index);
  }

  removeNews(index: number): void {
    const newsArray = this.form.get('news') as FormArray;
    newsArray.removeAt(index);
  }

  addNews(): void {
    const newsArray = this.form.get('news') as FormArray;
    newsArray.push(this.createNewsFormGroup());
  }

  get news(): FormArray {
    return this.form.get('news') as FormArray;
  }

  addHymn(): void {
    const hymnsArray = this.form.get('hymns') as FormArray;
    hymnsArray.push(this.createHymnFormGroup());
  }

  get hymns(): FormArray {
    return this.form.get('hymns') as FormArray;
  }

  castToFormControl(control: AbstractControl | null): FormControl {
    return control as FormControl || new FormControl();
  }

  private formatBulletinData(bulletinData: any): any {
    return {
      news: bulletinData.news,
      sermon_title: bulletinData.sermonTitle,
      sermon_subtitle: bulletinData.sermonSubtitle,
      sermon_content: bulletinData.sermonContent,
      hymns: bulletinData.hymns,
      representative_prayer: bulletinData.representativePrayer,
      community_news: bulletinData.communityNews,
      message: bulletinData.message,
      post_message_hymn: bulletinData.postMessageHymn,
      blessing: bulletinData.blessing
    };
  }

  postBulletin(){
    const bulletinData = this.form.value;
    const formattedData = this.formatBulletinData(bulletinData);
    this.bulletinService.postBulletin(formattedData).subscribe({
      next: response => {
        console.log(response);
        // handle success
      },
      error: error => {
        console.log("error? why?",error.error.id);
        console.log("error", error)
        // handle error
      },
    })
  }
  
}
