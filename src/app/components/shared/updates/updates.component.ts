import { Component, Input} from '@angular/core';
import { UpdateService } from 'src/app/services/update.service';
import { SwUpdate } from '@angular/service-worker';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-updates',
  templateUrl: './updates.component.html',
  styleUrls: ['./updates.component.scss']
})
export class UpdatesComponent {
  @Input() updateData:any = null;

  constructor(
    public updateService: UpdateService,
    private updates: SwUpdate,
    private snackBar: MatSnackBar
  ){}

  startUpdate(){
    if(this.updateData){
      console.log("enabled", this.updates.isEnabled)
      if (this.updates.isEnabled) {
        this.updateService.updating$.next(true);
        const updateTimeout = setTimeout(() => {
          localStorage.setItem("his-app-update-version", this.updateData.id.toString())
          this.updateService.updateData$.next(null);
          this.updateService.updating$.next(false);
          this.snackBar.open("업데이트에 실패했습니다. 백그라운드에서 시도합니다. 조금만 기다려주세요.", "Close", {
            duration: 5000,
            panelClass: ['custom-snackbar'],
            verticalPosition: 'bottom'
          })
        }, 10000);
        this.updates.activateUpdate().then(() => {
          console.log("updating...")
          clearTimeout(updateTimeout)
        }).catch((e)=>{
          console.log(e)
        }).finally(()=>{
          localStorage.setItem("his-app-update-version", this.updateData.id.toString())
          this.updateService.updateData$.next(null)
          this.updateService.updating$.next(false);
          clearTimeout(updateTimeout)
          document.location.reload();
          
        });
      }else{
        localStorage.setItem("his-app-update-version", this.updateData.id.toString())
        this.updateService.updateData$.next(null)
        this.updateService.updating$.next(false);
      }
    }
  }
}
