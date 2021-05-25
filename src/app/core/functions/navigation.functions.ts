import {
  ActivatedRoute,
  NavigationCancel,
  NavigationEnd,
  NavigationError,
  NavigationStart,
  RouterEvent,
} from '@angular/router';

export function isNavigationEvent(routerEvent: RouterEvent): boolean {
  return (
    routerEvent instanceof NavigationStart ||
    routerEvent instanceof NavigationEnd ||
    routerEvent instanceof NavigationCancel ||
    routerEvent instanceof NavigationError
  );
}

export function getLastChild(route: ActivatedRoute): ActivatedRoute {
  let child = route.firstChild;
  while (child.firstChild) {
    child = child.firstChild;
  }
  return child;
}
