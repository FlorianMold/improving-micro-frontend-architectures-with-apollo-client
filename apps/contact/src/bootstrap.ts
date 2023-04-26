import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { UiContactAppModule } from './app/app.module';
import { environment } from "./app/core/environment";

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic()
  .bootstrapModule(UiContactAppModule)
  .catch((err) => console.error(err));
