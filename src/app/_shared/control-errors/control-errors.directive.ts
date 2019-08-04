import {
  Directive,
  Input,
  OnChanges,
  OnDestroy,
  SimpleChanges,
  TemplateRef,
  ViewContainerRef
} from '@angular/core';
import {AbstractControl, FormGroupDirective} from '@angular/forms';
import {Subscription} from 'rxjs';

interface ErrorTemplateContext {
  $implicit: string;
}

@Directive({
  selector: '[appControlErrors]'
})
export class ControlErrorsDirective implements OnDestroy, OnChanges {

  @Input() appControlErrorsOf: string | undefined;

  private textMap: { [p: string]: string } = {
    required: 'Value is required'
  };

  private statusSub = Subscription.EMPTY;

  constructor(private vcr: ViewContainerRef,
              private template: TemplateRef<ErrorTemplateContext>,
              private formGroup: FormGroupDirective) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if ('appControlErrorsOf' in changes) {
      this.statusSub.unsubscribe();
      if (this.appControlErrorsOf !== undefined) {
        const control = this.formGroup.control.controls[this.appControlErrorsOf];

        this.statusSub = control.statusChanges.subscribe(() => {
          this.redrawErrors(control);
        });
      }
    }
  }

  private redrawErrors(control: AbstractControl) {
    this.vcr.clear();
    const errors = control.errors;
    if (errors !== null) {
      for (const key in errors) {
        if (errors.hasOwnProperty(key)) {
          this.vcr.createEmbeddedView(this.template, {
            $implicit: this.textMap[key]
          });
        }
      }
    }
  }

  ngOnDestroy(): void {
    this.statusSub.unsubscribe();
  }

}
