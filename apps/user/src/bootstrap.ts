import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { UiUserAppModule } from './app/app.module';

platformBrowserDynamic()
  .bootstrapModule(UiUserAppModule)
  .catch((err) => console.error(err));
