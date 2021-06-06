export enum ContentState {
  LOADING,
  LOADED,
  ERROR,
}

export type LoadingState = { state: ContentState.LOADING };
export type ErrorState = { state: ContentState.ERROR; error: string };
export type LoadedState<T> = { state: ContentState.LOADED; data: T };

export type IfSpinnerState<T> = LoadingState | ErrorState | LoadedState<T>;
