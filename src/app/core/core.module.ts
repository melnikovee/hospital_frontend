import {isDevMode, NgModule, Optional, SkipSelf} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HeaderComponent} from './header/header.component';
import {FooterComponent} from './footer/footer.component';
import {BodyComponent} from './body/body.component';
import {RouterModule} from '@angular/router';
import {MatButtonModule, MatIconModule, MatListModule, MatMenuModule, MatNativeDateModule, MatToolbarModule} from '@angular/material';
import {FeaturesModule} from '../features/features.module';
import {SharedModule} from '../_shared/shared.module';
import {AUTH_INITIALIZER, CurrentUserService} from './auth/currentuser-service.service';
import {PermissionService} from './auth/permision.service';
import {HTTP_AUTH_INTERCEPTOR_PROVIDER} from './interceptors/http-auth-interceptor.interceptor';
import {PermitDirective} from './auth/permit.directive';
import {HomepageComponent} from './home/homepage/homepage.component';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    BodyComponent,
    PermitDirective,
    HomepageComponent
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    BodyComponent,
    FeaturesModule,
    HomepageComponent
  ],
  imports: [
    CommonModule,
    FeaturesModule,
    RouterModule,
    MatToolbarModule,
    MatButtonModule,
    MatListModule,
    MatNativeDateModule,
    SharedModule,
    MatMenuModule,
    MatIconModule

  ],
  providers: [
    HTTP_AUTH_INTERCEPTOR_PROVIDER,
    AUTH_INITIALIZER,
    CurrentUserService,
    PermissionService
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
