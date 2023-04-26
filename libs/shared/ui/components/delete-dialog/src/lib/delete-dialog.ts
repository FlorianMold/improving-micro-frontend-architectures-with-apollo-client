import { ChangeDetectionStrategy, Component, EventEmitter, Inject, Input, OnInit, Output } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ThemePalette } from '@angular/material/core';
import { UiDeleteDialogConfig } from './delete-dialog.interface';

export const UI_DELETE_DIALOG_MISSING_PROPERTIES_ERROR_MESSAGE = 'Please set a direction for the UiDeleteDialogComponent';

export const throwMissingPropertiesError = (): never => {
  throw Error(UI_DELETE_DIALOG_MISSING_PROPERTIES_ERROR_MESSAGE);
};

@Component({
  selector: 'ui-delete-dialog',
  template: ` <button
      type="button"
      *ngIf="!_isIconButton"
      mat-raised-button
      [color]="color"
      [disabled]="disabled"
      [title]="buttonText"
      (click)="openDialog()"
    >
      {{ buttonText }}
    </button>
    <button
      type="button"
      *ngIf="_isIconButton"
      mat-icon-button
      [attr.aria-label]="buttonText"
      [color]="color"
      [disabled]="disabled"
      [title]="buttonText"
      (click)="openDialog()"
    >
      <mat-icon>{{ icon }}</mat-icon>
    </button>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'ui-delete-dialog-block',
  },
  exportAs: 'uiDeleteDialog',
})
export class UiDeleteDialogComponent implements OnInit {
  constructor(public dialog: MatDialog) {}

  /** Whether the button for the dialog should use a button. */
  _isIconButton = false;

  /** The text, which is displayed inside the open-dialog button  */
  @Input('uiDeleteDialogButtonText') buttonText?: string;

  /**
   * The icon to display instead of the button-text.
   * The icon has precedence over the icon.
   */
  @Input('uiDeleteDialogIcon') icon?: string;

  /** The color of the open-dialog button. */
  @Input('uiDeleteDialogButtonColor') color?: ThemePalette;

  /** Whether the open-dialog button is disabled.  */
  @Input('disabled') disabled?: boolean;

  /** The width of the dialog. */
  @Input('uiDeleteDialogWidth') dialogWidth = '350px';

  /** The config of the dialog. */
  @Input('uiDeleteDialogConfig') dialogConfig?: UiDeleteDialogConfig;

  /** Emits, when the apply-button was clicked. */
  @Output('uiDeleteDialogApplyClicked') readonly applyClicked = new EventEmitter<true>();

  /** Emits, when the cancel-button was clicked. */
  @Output('uiDeleteDialogCancelClicked') readonly cancelClicked = new EventEmitter<false>();

  openDialog(): void {
    const config: MatDialogConfig<UiDeleteDialogConfig> = {
      width: this.dialogWidth,
      data: {
        ...this.dialogConfig,
      },
    };

    const dialogRef = this.dialog.open(UiDeleteDialogOverlayComponent, config);
    dialogRef.afterClosed().subscribe((value: boolean) => {
      value ? this.applyClicked.emit(true) : this.cancelClicked.emit(false);
    });
  }

  ngOnInit(): void {
    if (!this.icon && !this.buttonText) {
      throwMissingPropertiesError();
    }

    this._isIconButton = !!this.icon;
  }
}

@Component({
  template: `
    <h1 mat-dialog-title>{{ data.title }}</h1>
    <div mat-dialog-content>{{ data.description }}</div>
    <div mat-dialog-actions [align]="'end'">
      <button mat-raised-button color="primary" [mat-dialog-close]="false">{{ data.cancelButtonText }}</button>
      <button mat-raised-button color="accent" [mat-dialog-close]="true" cdkFocusInitial>
        {{ data.applyButtonText }}
      </button>
    </div>
  `,
  styles: [
    `
              :host {
                display: block;
              }
            `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'ui-delete-dialog-overlay',
  },
})
export class UiDeleteDialogOverlayComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: UiDeleteDialogConfig) {}
}
