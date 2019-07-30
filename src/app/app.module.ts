import {BrowserModule} from '@angular/platform-browser';
import {LOCALE_ID, NgModule} from '@angular/core';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MaterialAppModule} from './ngmaterial.module';
import {MatSortModule} from '@angular/material';
import {CoreModule} from './core/core.module';
import {SharedModule} from './_shared/shared.module';
import {GuardsCheckEnd, Router} from '@angular/router';
import {filter, map} from 'rxjs/operators';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    MatSortModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    MaterialAppModule,
    CoreModule,
    SharedModule
  ],
  providers: [
    {provide: LOCALE_ID, useValue: 'ru'}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {

  constructor(private router: Router) {
    router.events.pipe(
      filter(event => event instanceof GuardsCheckEnd),
      map(event => (event as GuardsCheckEnd).shouldActivate)
    ).subscribe(shouldActivate => {
      if (!shouldActivate) {
        this.router.navigate(['auth']);
      }
    });
  }
}
