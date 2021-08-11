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

export function getProfessionalProfileUrl(professionalId: number | string): string {
  return professionalId ? `/${Path.Professional}/${professionalId}/profile` : '';
}

export function getProfessionalServicesUrl(professionalId: number | string): string {
  return professionalId ? `/${Path.Professional}/${professionalId}/services` : '';
}

export function getProfessionalReviewsUrl(professionalId: number | string): string {
  return professionalId ? `/${Path.Reviews}/${professionalId}` : '';
}

export function getUserChatUrl(userId: number | string): string {
  return userId ? `/${Path.Message}/chat/${userId}` : '';
}
