import {
  ActivatedRoute,
  NavigationCancel,
  NavigationEnd,
  NavigationError,
  NavigationStart,
  RouterEvent,
} from '@angular/router';
import { NavBranch, NavPath } from '../constants/navigation.constants';

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
  return professionalId ? `/${NavPath.Professional}/${professionalId}/${NavBranch.Profile}` : '';
}

export function getNewProfessionalContactUrl(professionalId: number | string): string {
  return professionalId
    ? `/${NavPath.Professional}/${professionalId}/${NavBranch.Profile}/professional-contact-add`
    : '';
}

export function getNewProfessionalLocationsUrl(professionalId: number | string): string {
  return professionalId ? `/${NavPath.Professional}/${professionalId}/${NavBranch.Profile}/location-add` : '';
}

export function getProfessionalServicesUrl(professionalId: number | string): string {
  return professionalId ? `/${NavPath.Professional}/${professionalId}/${NavBranch.Services}` : '';
}

export function getProfessionalScheduleUrl(professionalId: number | string): string {
  return professionalId ? `/${NavPath.Professional}/${professionalId}/${NavBranch.Schedule}` : '';
}

export function getProfessionalReviewsUrl(professionalId: number | string): string {
  return professionalId ? `/${NavPath.Reviews}/${professionalId}` : '';
}

export function getUserChatUrl(userId: number | string): string {
  return userId ? `/${NavPath.Message}/${NavBranch.Chat}/${userId}` : '';
}

export function getServiceUrl(serviceId: number | string): string {
  return serviceId ? `/${NavPath.Service}/${serviceId}` : '';
}

export function getServiceOrderUrl(serviceId: number | string): string {
  return serviceId ? `/${NavPath.Order}/${serviceId}` : '';
}
