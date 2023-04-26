import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { UiAuthenticationDataAccessService } from '@ui-frontend-service/shared/data-access';

@Component({
  selector: 'ui-dashboard-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UiDashboardAppComponent implements OnInit {
  private _authService = inject(UiAuthenticationDataAccessService);

  ngOnInit(): void {
    this._authService.populate();
  }
}
