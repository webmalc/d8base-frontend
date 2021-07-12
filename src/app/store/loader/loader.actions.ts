/* eslint-disable max-classes-per-file */

export enum LoaderActions {
  ShowLoader = '[AppShell] Show loader',
  HideLoader = '[AppShell] Hide loader',
}

export class ShowLoader {
  public static readonly type = LoaderActions.ShowLoader;

  constructor(public loaderKeyToShow: string) {}
}

export class HideLoader {
  public static readonly type = LoaderActions.HideLoader;

  constructor(public loaderKeyToHide: string) {}
}
