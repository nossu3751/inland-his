import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class VersionControlService {
  private readonly VERSION_KEY = 'his_app_version';
  private readonly NEW_VERSION_AVAILABLE_KEY = 'his_new_version_available';
  constructor() { }

  checkVersion():boolean {
    const currentVersion = localStorage.getItem(this.VERSION_KEY)
    console.log(currentVersion)
    const appVersion = environment.appVersion;
    console.log(appVersion)

    if (currentVersion !== appVersion) {
      localStorage.setItem(this.VERSION_KEY, appVersion);
      localStorage.setItem(this.NEW_VERSION_AVAILABLE_KEY, 'true');
      return true;
    }

    return false;
  }

  isNewVersionAvailable(): boolean {
    return localStorage.getItem(this.NEW_VERSION_AVAILABLE_KEY) === 'true';
  }

  clearNewVersionFlag(): void {
    localStorage.removeItem(this.NEW_VERSION_AVAILABLE_KEY);
  }

}
