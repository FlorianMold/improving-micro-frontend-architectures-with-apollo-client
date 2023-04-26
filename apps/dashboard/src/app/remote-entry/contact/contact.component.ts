import { ChangeDetectionStrategy, Component, HostBinding, inject, OnInit, Optional } from '@angular/core';
import { CONTACT_WIDGET_VERSION } from '../../core/version';
import { UiDashboardRemoteSetupService } from '../remote-core';
import { map } from 'rxjs/operators';
import { UiAuthenticationDataAccessService, UiGlobalStateDataAccessService } from '@ui-frontend-service/shared/data-access';
import Chart from 'chart.js/auto';
import { UiContactDataAccessContactService, UiContactDataAccessTitleService } from '@ui-frontend-service/contact/data-access';

@Component({
  selector: 'ui-dashboard-contact-widget',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
  providers: [UiDashboardRemoteSetupService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UiDashboardRemoteEntryContactComponent implements OnInit {
  private _authService = inject(UiAuthenticationDataAccessService);
  private _stateService = inject(UiGlobalStateDataAccessService);
  private _contactService = inject(UiContactDataAccessContactService);
  private _titleService = inject(UiContactDataAccessTitleService);

  titleChart: unknown;

  @HostBinding('class') klass = 'ui-dashboard-widget';

  /** The currently authenticated user. */
  user$ = this._stateService.getLoggedInUser().pipe(map((data) => data.getAuthenticatedUser));

  /** Emits the titles aggregated by user. */
  contactTitlesCount$ = this._contactService.contactTitlesCount().pipe(map((data) => data.titleCount));
  /** Emits all titles. */
  titles$ = this._titleService.allTitles().pipe(map((data) => data.allTitles));

  constructor(@Optional() remoteSetupService?: UiDashboardRemoteSetupService) {
    remoteSetupService?.start(CONTACT_WIDGET_VERSION);
  }

  /**
   * Creates a chart with the contact titles.
   */
  createTitleChart() {
    this.contactTitlesCount$.subscribe((value) => {
      this.titles$.subscribe();
      const sortable = Object.entries(value)
        .filter(([key]) => {
          return key !== '';
        })
        .sort(([, a], [, b]) => b - a)
        .reduce((r, [k, v]) => ({ ...r, [k]: v }), {});

      this.titleChart = new Chart('TitleChart', {
        type: 'bar',

        data: {
          labels: Object.keys(sortable),
          datasets: [
            {
              label: 'Titel',
              data: Object.values(sortable),
              backgroundColor: '#1e88e5',
            },
          ],
        },
        options: {
          maintainAspectRatio: false,
        },
      });
    });
  }

  ngOnInit(): void {
    /**
     * Try to log in the user automatically.
     * This is only possible if the user has a valid refresh token.
     */
    this._authService.populate();

    this.createTitleChart();
  }
}
