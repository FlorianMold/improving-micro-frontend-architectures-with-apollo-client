import { UiLayoutConfig } from '@ui-frontend-service/shared/ui/dom-layout';
import { UI_USER_APP_NAME } from '../../app-config.const';

export const layoutOptionsFactory = (): UiLayoutConfig => {
  return {
    disableSidenav: true,
    appName: UI_USER_APP_NAME,
  };
};
