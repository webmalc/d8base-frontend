export abstract class Reinitable {

  public ionViewDidEnter(): void {
    this.init();
  }

  protected abstract init(): any;
}
