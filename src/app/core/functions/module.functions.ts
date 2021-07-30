export function throwIfAlreadyLoaded(parentModule: object): void {
  if (parentModule) {
    throw new Error(
      `${parentModule.constructor.name} has already been loaded. Import Core modules in the AppModule only.`,
    );
  }
}
