import { UiLayoutConfig } from '@ui-frontend-service/shared/ui/dom-layout';
import { UI_HOST_APP_NAME } from '../../app-config.const';

/** The factory that provides the default-options for the layout. */
export const layoutOptionsFactory = (): UiLayoutConfig => {
  return {
    disableSidenav: true,
    appName: UI_HOST_APP_NAME,
  };
};
