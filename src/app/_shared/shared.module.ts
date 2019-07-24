import {NgModule} from '@angular/core';
import {CssUrlPipe} from './pipes/css-url.pipe';
import {ControlErrorsDirective} from './control-errors/control-errors.directive';
import {CommonModule} from '@angular/common';
import {MatButtonModule} from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    MatButtonModule
  ],
  exports: [
    CssUrlPipe,
    ControlErrorsDirective,
    MatButtonModule
  ],
  declarations: [
    CssUrlPipe,
    ControlErrorsDirective
  ],
  providers: [],
})
export class SharedModule {
}
