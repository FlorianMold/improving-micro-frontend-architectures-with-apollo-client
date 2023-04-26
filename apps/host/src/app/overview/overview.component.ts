import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatGridListModule } from '@angular/material/grid-list';
import { RouterOutlet } from '@angular/router';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'ui-host-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['overview.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatGridListModule, RouterOutlet, MatCardModule],
})
export class UiHostOverviewComponent {}
