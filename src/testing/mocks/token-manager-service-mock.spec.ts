export class TokenManagerServiceMock {
  public getAccessToken = () => Promise.resolve('access_token');
  public getRefreshToken = () => Promise.resolve('refresh_token');
  public setTokens = () => Promise.resolve();
  public clear = () => Promise.resolve();
}
