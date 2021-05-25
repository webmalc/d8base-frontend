export abstract class Reinitable {
  public ionViewWillEnter(): void {
    this.init();
  }

  protected abstract init(): any;
}
