import { Component, Input} from '@angular/core';
import { UpdateService } from 'src/app/services/update.service';
import { SwUpdate } from '@angular/service-worker';

@Component({
  selector: 'app-updates',
  templateUrl: './updates.component.html',
  styleUrls: ['./updates.component.scss']
})
export class UpdatesComponent {
  @Input() updateData:any = null;

  constructor(
    private updateService: UpdateService,
    private updates: SwUpdate
  ){}
  startUpdate(){
    console.log("update enabled?", this.updates.isEnabled)
    if(this.updateData){
      if (this.updates.isEnabled) {
        this.updateService.updating$.next(true);
        this.updates.activateUpdate().then(() => {
          localStorage.setItem("his-app-update-version", this.updateData.id.toString())
          this.updateService.updateData$.next(null)
          document.location.reload();
        });
      }
    }
  }
}
