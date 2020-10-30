export class TokenManagerServiceMock {
  public setTokens = () => Promise.resolve();
  public isRefreshTokenExpired = () => Promise.resolve();
  public clear = () => Promise.resolve();
}
