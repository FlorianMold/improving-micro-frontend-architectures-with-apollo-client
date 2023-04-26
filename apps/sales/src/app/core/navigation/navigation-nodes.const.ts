import { UiLayoutNavigationConfig } from '@ui-frontend-service/shared/ui/dom-layout';

export const UI_SALES_NAVIGATION: UiLayoutNavigationConfig = {
  topNodes: [
    {
      title: 'Rechnungen',
      tooltip: 'Rechnungen',
      children: [
        {
          title: 'Alle Rechnungen',
          url: ['./sales/invoices'],
        },
        {
          title: 'Neue Rechnung',
          url: ['./sales/invoices', { outlets: { 'detail-outlet': ['new'] } }],
        },
      ],
    },
    {
      title: 'Verträge',
      tooltip: 'Verträge',
      children: [
        {
          title: 'Alle Verträge',
          url: ['./sales/contracts'],
        },
        {
          title: 'Neuer Vertrag',
          url: ['./sales/contracts', { outlets: { 'detail-outlet': ['new'] } }],
        },
      ],
    },
  ],
};
