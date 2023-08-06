import { Component, OnInit} from '@angular/core';
import { ScreenSizeService } from './services/view/screen-size.service'
import { HoverService } from './services/view/hover.service';
import { routeAnimation} from 'src/animations/route-animations'
import { Router, ActivatedRoute, NavigationEnd} from '@angular/router'
import { filter, map } from 'rxjs';
import { RoutingService } from './services/data/routing.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [routeAnimation]
})
export class AppComponent implements OnInit{
  constructor(
    private screenSizeService: ScreenSizeService,
    private hoverService: HoverService,
    private router:Router,
    public routingService:RoutingService) {
      this.hoverService.hoverStatus$.subscribe((status) => {
        this.isHovered = status;
      })
    }

  name = 'User';
  title = '인랜드히즈'
  isLoading = false;
  ptrIndicator = '<div class="indicator"></div>';
  screenSizeClass = '';
  isHovered = false;
  isOnAdminRoute: boolean|null = null;

  prepareRoute(outlet: any) {
    return (
      outlet &&
      outlet.activatedRouteData &&
      outlet.activatedRouteData['animation']
    )
  }

  ngOnInit() {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      map(() => this.router.url.includes('admin')),
    ).subscribe((isOnAdminRoute) => {
      this.isOnAdminRoute = isOnAdminRoute;
      console.log("isOnAdminRoute", this.isOnAdminRoute);
    });
    this.screenSizeService.screenSizeClass$.subscribe((screenSizeClass) => {
      this.screenSizeClass = screenSizeClass;
    });
  }
}
