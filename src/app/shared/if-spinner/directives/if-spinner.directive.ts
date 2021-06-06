/* eslint-disable max-classes-per-file */
import {
  ComponentFactoryResolver,
  Directive,
  Inject,
  Input,
  Optional,
  TemplateRef,
  Type,
  ViewContainerRef,
  ViewRef,
} from '@angular/core';
import { isIfSpinnerState } from '@app/shared/if-spinner/utils/if-spinner.functions';
import { IfSpinnerConfigurationInterface, IF_SPINNER_MODULE_CONFIG_TOKEN } from '../if-spinner.config';
import { ContentState } from '../models/if-spinner.model';

export class IfSpinnerContext<T = unknown> {
  public $implicit: T = null;
  public appIfSpinner: T = null;
}

@Directive({
  selector: '[appIfSpinner]',
})
export class IfSpinnerDirective<T> {
  @Input()
  public set appIfSpinnerLoadingTemplate(templateRef: TemplateRef<IfSpinnerContext<T>> | null) {
    this.loadingTemplateRef = templateRef;
    this.updateView();
  }
  @Input()
  public set appIfSpinnerErrorTemplate(templateRef: TemplateRef<IfSpinnerContext<T>> | null) {
    this.errorTemplateRef = templateRef;
    this.updateView();
  }
  @Input()
  public set appIfSpinner(condition: T) {
    this.context.$implicit = this.context.appIfSpinner = condition;
    this.updateView();
  }
  private context: IfSpinnerContext<T> = new IfSpinnerContext<T>();
  private loadingTemplateRef: TemplateRef<IfSpinnerContext<T>> | null = null;
  private errorTemplateRef: TemplateRef<IfSpinnerContext<T>> | null = null;
  private readonly loadedTemplateRef: TemplateRef<IfSpinnerContext<T>> | null = null;
  private viewRef: ViewRef = null;

  constructor(
    private readonly viewContainerRef: ViewContainerRef,
    private readonly componentFactoryResolver: ComponentFactoryResolver,
    @Optional() @Inject(IF_SPINNER_MODULE_CONFIG_TOKEN) private readonly config: IfSpinnerConfigurationInterface,
    templateRef: TemplateRef<IfSpinnerContext<T>>,
  ) {
    this.loadedTemplateRef = templateRef;
  }

  private updateView() {
    const context = this.context.$implicit;

    if (isIfSpinnerState<T>(context)) {
      switch (context.state) {
        case ContentState.LOADING: {
          this.showLoadingState();
          return;
        }
        case ContentState.ERROR: {
          this.showErrorState();
          return;
        }
        case ContentState.LOADED:
        default: {
          const unpackedContext: IfSpinnerContext<T> = {
            $implicit: context.data,
            appIfSpinner: context.data,
          };
          this.showLoadedState(unpackedContext);
          return;
        }
      }
    }

    if (context) {
      this.showLoadedState();
    } else {
      this.showLoadingState();
    }
  }

  private showState(templateRef: TemplateRef<IfSpinnerContext<T>>, component: Type<any>): void {
    this.viewRef = null;
    this.viewContainerRef.clear();
    if (templateRef) {
      this.viewContainerRef.createEmbeddedView(templateRef);
    } else {
      if (!component) {
        return;
      }
      const componentFactory = this.componentFactoryResolver.resolveComponentFactory(component);
      this.viewContainerRef.createComponent<Type<any>>(componentFactory);
    }
  }

  private showLoadingState(): void {
    this.showState(this.loadingTemplateRef, this.config?.loadingComponent);
  }

  private showErrorState(): void {
    this.showState(this.errorTemplateRef, this.config?.errorComponent);
  }

  private showLoadedState(context?: IfSpinnerContext<T>): void {
    if (!this.viewRef) {
      this.viewContainerRef.clear();
      if (this.loadedTemplateRef) {
        this.viewRef = this.viewContainerRef.createEmbeddedView(this.loadedTemplateRef, context ?? this.context);
      }
    }
  }
}
