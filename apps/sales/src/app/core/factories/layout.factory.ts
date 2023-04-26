import { UiLayoutConfig } from '@ui-frontend-service/shared/ui/dom-layout';
import { UI_SALES_APP_NAME } from '../../app-config.const';

export const layoutOptionsFactory = (): UiLayoutConfig => {
  return {
    disableSidenav: true,
    appName: UI_SALES_APP_NAME,
  };
};
