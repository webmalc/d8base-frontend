/* eslint-disable */
import { Injectable } from '@angular/core';

/**
 * Global configuration for Api services
 */
@Injectable({
  providedIn: 'root',
})
export class ApiConfiguration {
  rootUrl: string = 'https://app.maxibooking.ru:8000/en/api';
}

export interface ApiConfigurationInterface {
  rootUrl?: string;
}
