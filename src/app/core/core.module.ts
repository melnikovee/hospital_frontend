import {isDevMode, NgModule, Optional, SkipSelf} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HeaderComponent} from './header/header.component';
import {FooterComponent} from './footer/footer.component';
import {BodyComponent} from './body/body.component';
import {HTTP_COMMON_INTERCEPTOR_PROVIDER} from './interceptors/http-common-interceptor.interceptor';
import {RouterModule} from '@angular/router';
import {MatButtonModule, MatNativeDateModule, MatToolbarModule} from '@angular/material';
import {FeaturesModule} from '../features/features.module';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    BodyComponent
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    BodyComponent,
    FeaturesModule
  ],
  imports: [
    CommonModule,
    FeaturesModule,
    RouterModule,
    MatToolbarModule,
    MatButtonModule,
    MatNativeDateModule,
  ],
  providers: [
    HTTP_COMMON_INTERCEPTOR_PROVIDER
  ]
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() coreModule?: CoreModule) {
    // tslint:disable-next-line
    if (coreModule !== null && isDevMode()) {
      throw Error('Only one import is allowed');
    }
  }
}
