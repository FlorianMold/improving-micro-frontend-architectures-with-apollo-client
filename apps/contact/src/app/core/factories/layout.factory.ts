import { UiLayoutConfig } from '@ui-frontend-service/shared/ui/dom-layout';

export const layoutOptionsFactory = (): UiLayoutConfig => {
  return {
    disableSidenav: true,
    appName: 'Kontakt',
  };
};
