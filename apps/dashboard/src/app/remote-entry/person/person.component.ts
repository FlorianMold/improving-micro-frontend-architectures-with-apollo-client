import { ChangeDetectionStrategy, Component, HostBinding, inject, OnInit, Optional } from '@angular/core';
import { UiDashboardRemoteSetupService } from '../remote-core';
import { PERSON_WIDGET_VERSION } from '../../core/version';
import { UiContactDataAccessContactService, UiContactDataAccessCountryService } from '@ui-frontend-service/contact/data-access';
import { map } from 'rxjs/operators';
import { UiAuthenticationDataAccessService, UiGlobalStateDataAccessService } from '@ui-frontend-service/shared/data-access';
import Chart from 'chart.js/auto';

@Component({
  selector: 'ui-dashboard-person-widget',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.scss'],
  providers: [UiDashboardRemoteSetupService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UiDashboardRemoteEntryPersonComponent implements OnInit {
  private _authService = inject(UiAuthenticationDataAccessService);
  private _stateService = inject(UiGlobalStateDataAccessService);
  private _contactService = inject(UiContactDataAccessContactService);
  private _countryService = inject(UiContactDataAccessCountryService);

  countryChart: unknown;

  @HostBinding('class') klass = 'ui-dashboard-widget';

  /** The currently authenticated user. */
  user$ = this._stateService.getLoggedInUser().pipe(map((data) => data.getAuthenticatedUser));

  /** Emits the countries aggregated by user. */
  contactCountriesCount$ = this._contactService.contactCountryCount().pipe(map((data) => data.countryCount));
  /** Emits all countries. */
  countries$ = this._countryService.allCountries().pipe(map((data) => data.allCountries));

  constructor(@Optional() remoteSetupService?: UiDashboardRemoteSetupService) {
    remoteSetupService?.start(PERSON_WIDGET_VERSION);
  }

  /**
   * Creates a chart with the contact titles.
   */
  createCountryChart() {
    this.contactCountriesCount$.subscribe((value) => {
      this.countries$.subscribe();
      const sortable = Object.entries(value)
        .sort(([, a], [, b]) => b - a)
        .reduce((r, [k, v]) => ({ ...r, [k]: v }), {});

      this.countryChart = new Chart('CountryChart', {
        type: 'bar',

        data: {
          labels: Object.keys(sortable),
          datasets: [
            {
              label: 'Länder',
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
    this.createCountryChart();
  }
}
