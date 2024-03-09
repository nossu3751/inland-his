import { Component, OnInit} from '@angular/core';
import { ScreenSizeService } from './services/view/screen-size.service'
import { HoverService } from './services/view/hover.service';
import { routeAnimation} from 'src/animations/route-animations'
import { Router, NavigationEnd} from '@angular/router'
import { filter, map } from 'rxjs';
import { RoutingService } from './services/data/routing.service';
import { ModalService } from './services/view/modal.service';
import { SearchService } from './services/data/search.service';
import { UpdateService } from './services/update.service';

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
    public routingService:RoutingService,
    public modalService: ModalService,
    private searchService: SearchService,
    public updateService: UpdateService) {
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

    this.updateService.getRecentPatch().subscribe({
      "next":(data)=>{
        const updateAvailable = data.id.toString() !== localStorage.getItem("his-app-update-version")
        if (updateAvailable) {
          this.updateService.updateData$.next(data)
        }
      },
      "error":()=>{

      }
    })
    

    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      map(() => {
        if(this.router.url.includes("bulletin")){
          return 0
        }else if(this.router.url.includes("videos")){
          return 1
        }else if(this.router.url.includes("calendar")){
          return 2
        }else {
          return 0
        }
      }),
    ).subscribe((routeType) => {
      this.searchService.prevRoute = this.searchService.currRoute
      this.searchService.currRoute = routeType
      this.searchService.resetSearch()
      console.log('prev',this.searchService.prevRoute,'curr',this.searchService.currRoute);
    });
    this.screenSizeService.screenSizeClass$.subscribe((screenSizeClass) => {
      this.screenSizeClass = screenSizeClass;
    });
  }
}
