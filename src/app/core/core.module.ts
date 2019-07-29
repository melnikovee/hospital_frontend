import {isDevMode, NgModule, Optional, SkipSelf} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HeaderComponent} from './header/header.component';
import {FooterComponent} from './footer/footer.component';
import {BodyComponent} from './body/body.component';
import {RouterModule} from '@angular/router';
import {MatButtonModule, MatIconModule, MatMenuModule, MatNativeDateModule, MatToolbarModule} from '@angular/material';
import {FeaturesModule} from '../features/features.module';
import {SharedModule} from '../_shared/shared.module';
import {HTTP_COMMON_INTERCEPTOR_PROVIDER} from './interceptors/http-common-interceptor.interceptor';

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
    SharedModule,
    MatMenuModule,
    MatIconModule

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
