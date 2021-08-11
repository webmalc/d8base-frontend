import {
  ActivatedRoute,
  NavigationCancel,
  NavigationEnd,
  NavigationError,
  NavigationStart,
  RouterEvent,
} from '@angular/router';
import { Path } from '../constants/navigation.constants';

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

export function getProfessionalProfileUrl(professionalId: number | string) {
  return `/${Path.Professional}/${professionalId}/profile`;
}
