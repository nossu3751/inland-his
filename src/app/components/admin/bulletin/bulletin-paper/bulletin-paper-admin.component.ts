import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, FormArray, AbstractControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { BulletinService } from 'src/app/services/data/bulletin.service';
@Component({
  selector: 'app-bulletin-paper-admin',
  templateUrl: './bulletin-paper-admin.component.html',
  styleUrls: ['./bulletin-paper-admin.component.scss']
})
export class BulletinPaperAdminComponent implements OnInit {
  form: FormGroup | null = null;
  date: string|null = null;
  id: number|null = null;
  loading:boolean|null = true;
  mode:string = "create";

  constructor(
    private fb: FormBuilder, 
    private bulletinService: BulletinService,
    private activatedRoute: ActivatedRoute,
    private snackBar: MatSnackBar,
    private router:Router
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.date = String(params['date']);
      if (this.date === "create") {
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
      } else {
        this.mode = "modify"
        this.bulletinService.getBulletinOfSunday(this.date).subscribe({
          "next":(data)=>{
            console.log(data)
            const blessing = data.blessing
            const communityNews = data.community_news
            const hymns = data.hymns
            const message = data.message
            const news = data.news
            const postMessageHymn = data.post_message_hymn
            const representativePrayer = data.representative_prayer
            const sermonContent = data.sermon_content
            const sermonSubtitle = data.sermon_subtitle
            const sermonTitle = data.sermon_title
            this.id = data.id
            this.form = this.fb.group({
              news: this.loadNewsArray(news),
              sermonTitle: [sermonTitle, Validators.required],
              sermonSubtitle: [sermonSubtitle],
              sermonContent: [sermonContent, Validators.required],
              hymns: this.loadHymnsArray(hymns),
              representativePrayer: [representativePrayer, Validators.required],
              communityNews: [communityNews, Validators.required],
              message: [message, Validators.required],
              postMessageHymn: [postMessageHymn],
              blessing: [blessing, Validators.required],
            });
          },
          "error":(error)=>{
            this.snackBar.open("해당 날짜의 주보를 불러올 수 없습니다 ", "Close", {
              duration: 3000,
              panelClass: ['custom-snackbar'],
              verticalPosition: 'bottom'
            })
            this.router.navigateByUrl("/admin/bulletins")
          }
        })
      }
    })
    this.loading = false;
  }

  loadNewsArray(news:any[]): FormArray<any> {
    const res:FormArray<any> = this.fb.array([])
    for (let newsItem of news){
      res.push(
        this.fb.group({
          title: [newsItem.title, Validators.required],
          description: [newsItem.description, Validators.required]
        })
      )
    }
    return res
  }

  loadHymnsArray(hymns:any[]): FormArray<any> {
    const res:FormArray<any> = this.fb.array([])
    for (let hymn of hymns){
      res.push(
        this.fb.group({
          title: [hymn.title, Validators.required],
        })
      )
    }
    return res
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
    const hymnsArray = this.form?.get('hymns') as FormArray;
    hymnsArray.removeAt(index);
  }

  removeNews(index: number): void {
    const newsArray = this.form?.get('news') as FormArray;
    newsArray.removeAt(index);
  }

  addNews(): void {
    const newsArray = this.form?.get('news') as FormArray;
    newsArray.push(this.createNewsFormGroup());
  }

  get news(): FormArray {
    return this.form?.get('news') as FormArray;
  }

  addHymn(): void {
    const hymnsArray = this.form?.get('hymns') as FormArray;
    hymnsArray.push(this.createHymnFormGroup());
  }

  get hymns(): FormArray {
    return this.form?.get('hymns') as FormArray;
  }

  castToFormControl(control: AbstractControl | null): FormControl {
    return control as FormControl || new FormControl();
  }

  deleteBulletin(){
    if(this.id !== null){
      this.bulletinService.deleteBulletin(this.id).subscribe({
        "next":()=>{
          this.router.navigateByUrl("/admin/bulletins")
          this.snackBar.open("주보가 삭제되었습니다", "Close", {
            duration: 3000,
            panelClass: ['custom-snackbar'],
            verticalPosition: 'bottom'
          })
        },
        "error":()=>{
          this.snackBar.open("죄송합니다. 삭제할 수 없습니다", "Close", {
            duration: 3000,
            panelClass: ['custom-snackbar'],
            verticalPosition: 'bottom'
          })
        }
      })
    }else{
      this.snackBar.open("죄송합니다. 삭제할 수 없습니다", "Close", {
        duration: 3000,
        panelClass: ['custom-snackbar'],
        verticalPosition: 'bottom'
      })
    }
    
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

  updateBulletin(){
    const bulletinData = this.form?.value;
    let formattedData = this.formatBulletinData(bulletinData)
    formattedData.sunday_date = this.date
    console.log(formattedData)
    if (this.id !== null) {
      console.log(formattedData)
      this.bulletinService.updateData(this.id, formattedData).subscribe({
        "next":(data)=>{
          this.router.navigateByUrl("/admin/bulletins")
          this.snackBar.open("주보가 수정되었습니다", "Close", {
            duration: 3000,
            panelClass: ['custom-snackbar'],
            verticalPosition: 'bottom'
          })
        },
        "error":()=>{
          this.snackBar.open("주보를 수정할 수 없습니다", "Close", {
            duration: 3000,
            panelClass: ['custom-snackbar'],
            verticalPosition: 'bottom'
          })
        }
      })
    } else {
      this.snackBar.open("주보를 수정할 수 없습니다", "Close", {
        duration: 3000,
        panelClass: ['custom-snackbar'],
        verticalPosition: 'bottom'
      })
    }
   

  }

  postBulletin(){
    const bulletinData = this.form?.value;
    const formattedData = this.formatBulletinData(bulletinData);
    this.bulletinService.postBulletin(formattedData).subscribe({
      next: response => {
        this.router.navigateByUrl("/admin/bulletins")
        this.snackBar.open("주보를 업로드했습니다.", "Close", {
          duration: 3000,
          panelClass: ['custom-snackbar'],
          verticalPosition: 'bottom'
        })
      },
      error: error => {
        const errorMsg = error.error.error
        if (errorMsg === "BulletinExists" ){
          this.snackBar.open("해당 주일의 주보가 이미 등록되어있습니다. 주보를 클릭해 수정해주세요.", "Close", {
            duration: 3000,
            panelClass: ['custom-snackbar'],
            verticalPosition: 'bottom'
          })
        }else{
          console.log(error.message)
          this.snackBar.open("주보 등록에 실패했습니다.", "Close", {
          duration: 3000,
          panelClass: ['custom-snackbar'],
          verticalPosition: 'bottom'
        })
        }
      },
    })
  }
  
}
