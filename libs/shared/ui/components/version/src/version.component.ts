import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';

/**
 * A version consists of the name of the library and the version.
 */
export type UiVersion = { name: string; version: string };

@Component({
  selector: 'ui-version',
  standalone: true,
  template: `
    <mat-list role="list">
      <mat-list-item>
        <ng-content></ng-content>
      </mat-list-item>
      <mat-divider *ngIf="versions.length > 0"></mat-divider>
      <ng-container *ngFor="let version of versions; let last = last">
        <mat-list-item role="listitem">
          <strong>{{ version.name }}</strong
          >: {{ version.version }}</mat-list-item
        >
        <mat-divider *ngIf="!last"></mat-divider>
      </ng-container>
    </mat-list>
  `,
  imports: [CommonModule, MatListModule, MatDividerModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UiVersionComponent {
  /** An array of dependency-versions. */
  @Input('uiVersions') versions: UiVersion[] = [];
}
