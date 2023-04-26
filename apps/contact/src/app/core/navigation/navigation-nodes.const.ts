import { UiLayoutNavigationConfig } from '@ui-frontend-service/shared/ui/dom-layout';

export const UI_CONTACT_NAVIGATION: UiLayoutNavigationConfig = {
  topNodes: [
    {
      title: 'Alle Kontakte',
      url: ['./contact'],
    },
    {
      title: 'Neuer Kontakt',
      url: ['./contact', { outlets: { 'detail-outlet': ['new'] } }],
    },
  ],
};
