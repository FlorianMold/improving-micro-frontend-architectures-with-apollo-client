import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { UiSalesAppModule } from './app/app.module';
import { environment } from "./app/core/environment";

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic()
  .bootstrapModule(UiSalesAppModule)
  .catch((err) => console.error(err));
