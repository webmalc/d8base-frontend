import {
  ActivatedRoute,
  NavigationCancel,
  NavigationEnd,
  NavigationError,
  NavigationStart,
  RouterEvent,
} from '@angular/router';
import { NavPath } from '../constants/navigation.constants';

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
  return professionalId ? `/${NavPath.Professional}/${professionalId}/profile` : '';
}

export function getNewProfessionalContactUrl(professionalId: number | string): string {
  return professionalId ? `/${NavPath.Professional}/${professionalId}/profile/professional-contact-add` : '';
}

export function getNewProfessionalLocationsUrl(professionalId: number | string): string {
  return professionalId ? `/${NavPath.Professional}/${professionalId}/profile/location-add` : '';
}

export function getProfessionalServicesUrl(professionalId: number | string): string {
  return professionalId ? `/${NavPath.Professional}/${professionalId}/services` : '';
}

export function getProfessionalReviewsUrl(professionalId: number | string): string {
  return professionalId ? `/${NavPath.Reviews}/${professionalId}` : '';
}

export function getUserChatUrl(userId: number | string): string {
  return userId ? `/${NavPath.Message}/chat/${userId}` : '';
}
