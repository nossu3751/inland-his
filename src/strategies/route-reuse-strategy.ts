import { ActivatedRouteSnapshot, DetachedRouteHandle, RouteReuseStrategy } from '@angular/router';

export class CustomReuseStrategy implements RouteReuseStrategy {
    handlers: { [key: string]: DetachedRouteHandle } = {};

    shouldDetach(route: ActivatedRouteSnapshot): boolean {
        return route.data && route.data['reuse'];
    }

    store(route: ActivatedRouteSnapshot, handle: DetachedRouteHandle): void {
        if(route.data && route.data['reuse']){
          this.handlers[route.routeConfig!.path!] = handle;
        }
    }

    shouldAttach(route: ActivatedRouteSnapshot): boolean {
        return !!route.routeConfig && !!this.handlers[route.routeConfig!.path!];
    }

    retrieve(route: ActivatedRouteSnapshot): DetachedRouteHandle | null{
        if (!route.routeConfig || route.data && !route.data['reuse']) return null;
        return this.handlers[route.routeConfig!.path!];
    }

    shouldReuseRoute(future: ActivatedRouteSnapshot, curr: ActivatedRouteSnapshot): boolean {
        return future.routeConfig === curr.routeConfig;
    }
}
