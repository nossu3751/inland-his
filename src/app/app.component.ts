import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  name = 'User';
  title = 'inland-his'
  isLoading = false;
  ptrIndicator = '<div class="indicator"></div>';

  onRefresh() {
    // Your refresh logic goes here
    // Call refresh() when the refresh is complete
    setTimeout(() => {
      
    }, 2000);
  }
}
