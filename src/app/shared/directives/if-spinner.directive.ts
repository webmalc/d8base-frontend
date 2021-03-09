/* eslint-disable max-classes-per-file */
import { ComponentFactoryResolver, Directive, Input, TemplateRef, ViewContainerRef, ViewRef } from '@angular/core';
import { LoadingIndicatorComponent } from '../components';

export class IfSpinnerContext<T = unknown> {
  public $implicit: T = null;
  public appIfSpinner: T = null;
}

@Directive({
  selector: '[appIfSpinner]',
})
export class IfSpinnerDirective<T> {
  @Input()
  public set appIfSpinnerFallbackTemplate(templateRef: TemplateRef<IfSpinnerContext<T>> | null) {
    this.fallbackTemplateRef = templateRef;
    this.updateView();
  }
  @Input()
  public set appIfSpinner(condition: T) {
    this.context.$implicit = this.context.appIfSpinner = condition;
    this.updateView();
  }
  private context: IfSpinnerContext<T> = new IfSpinnerContext<T>();
  private fallbackTemplateRef: TemplateRef<IfSpinnerContext<T>> | null = null;
  private readonly thenTemplateRef: TemplateRef<IfSpinnerContext<T>> | null = null;
  private viewRef: ViewRef = null;

  constructor(
    private readonly viewContainerRef: ViewContainerRef,
    private readonly componentFactoryResolver: ComponentFactoryResolver,
    templateRef: TemplateRef<IfSpinnerContext<T>>,
  ) {
    this.thenTemplateRef = templateRef;
  }

  private updateView() {
    if (this.context.$implicit) {
      if (!this.viewRef) {
        this.viewContainerRef.clear();
        if (this.thenTemplateRef) {
          this.viewRef = this.viewContainerRef.createEmbeddedView(this.thenTemplateRef, this.context);
        }
      }
    } else {
      this.viewRef = null;
      this.viewContainerRef.clear();
      if (this.fallbackTemplateRef) {
        this.viewContainerRef.createEmbeddedView(this.fallbackTemplateRef);
      } else {
        const componentFactory = this.componentFactoryResolver.resolveComponentFactory(LoadingIndicatorComponent);
        this.viewContainerRef.createComponent<LoadingIndicatorComponent>(componentFactory);
      }
    }
  }
}
