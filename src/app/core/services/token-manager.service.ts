import { Injectable } from '@angular/core';
import { AuthResponseInterface } from '@app/auth/interfaces/auth-response.interface';
import { StorageManagerService } from '@app/core/proxies/storage-manager.service';

@Injectable({
  providedIn: 'root',
})
export class TokenManagerService {

  private tokenData: AuthResponseInterface;
  private readonly TOKEN_DATA_STORAGE_KEY = 'api_token_data';

  constructor(private readonly storage: StorageManagerService) {
  }

  public getAccessToken(): Promise<string> {
    if (this.tokenData && this.tokenData.access_token) {
      return Promise.resolve(this.tokenData.access_token);
    }

    return new Promise<string>((resolve) => {
      this.getTokenData().then(
        (tokenData: AuthResponseInterface) => {
          this.tokenData = tokenData;
          resolve(this.tokenData?.access_token);
        },
      );
    });
  }

  public getRefreshToken(): Promise<string> {
    return new Promise((resolve) =>
      this.getTokenData().then(tokenData =>
        resolve(tokenData?.refresh_token),
      ),
    );
  }

  public setTokens(data: AuthResponseInterface): Promise<void> {
    this.tokenData = {
      ...data,
    };

    return this.storage.set(this.TOKEN_DATA_STORAGE_KEY, this.tokenData);
  }

  public clear(): Promise<any> {
    this.tokenData = undefined;

    return this.storage.remove(this.TOKEN_DATA_STORAGE_KEY);
  }

  private getTokenData(): Promise<AuthResponseInterface | null> {
    if (this.tokenData) {
      return Promise.resolve(this.tokenData);
    }

    return new Promise(resolve => {
      this.storage.get(this.TOKEN_DATA_STORAGE_KEY).then(
        (tokenData: AuthResponseInterface) => resolve(tokenData),
      );
    });
  }
}
