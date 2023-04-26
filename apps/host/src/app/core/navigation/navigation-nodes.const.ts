import { UiLayoutNavigationConfig } from '@ui-frontend-service/shared/ui/dom-layout';

/** The navigation-nodes of the host-application. */
export const UI_HOST_NAVIGATION: UiLayoutNavigationConfig = {
  topNodes: [
    { title: 'Home', url: '/', tooltip: 'Home' },
    {
      title: 'Kontakt',
      url: '/contact',
      tooltip: 'Kontakt',
    },
    { title: 'Ausgangsrechnungen', url: '/sales', tooltip: 'Ausgangsrechnungen' },
    { title: 'Benutzer', url: '/users', tooltip: 'Benutzer' },
  ],
};
