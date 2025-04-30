import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { DirectivaComponent } from './directiva/directiva.component';
import { PaquetesComponent } from './paquetes/paquetes.component';
import { PaqueteService } from './paquetes/paquete.service';
import { provideHttpClient } from '@angular/common/http';
import { FormComponent } from './paquetes/form.component';
import { FormsModule } from '@angular/forms';
import { registerLocaleData } from '@angular/common';
import localeES from '@angular/common/locales/es';

registerLocaleData(localeES, 'es');

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    DirectivaComponent,
    PaquetesComponent,
    FormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [
    PaqueteService,
    provideHttpClient(),
    {provide: LOCALE_ID, useValue: 'es'}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
