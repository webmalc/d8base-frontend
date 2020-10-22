export class StorageManagerMock {

  private readonly data: object = {
      api_token: null,
      refresh_token: null
  };

  public get(storageKey: string): Promise<any> {
      return Promise.resolve(this.data[storageKey]);
  }

  public set(storageKey: string, data: any): Promise<any> {
      this.data[storageKey] = data;

      return Promise.resolve(this.data[storageKey]);
  }

  public remove(storageKey: string): Promise<any> {
      this.data[storageKey] = null;

      return Promise.resolve();
  }
}
