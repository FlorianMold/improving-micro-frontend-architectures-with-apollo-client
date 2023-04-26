import { NgModule } from '@angular/core';
import { UiDeleteDialogComponent, UiDeleteDialogOverlayComponent } from './delete-dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [UiDeleteDialogComponent, UiDeleteDialogOverlayComponent],
  imports: [MatButtonModule, MatDialogModule, CommonModule, MatIconModule],
  exports: [UiDeleteDialogComponent],
})
export class UiDeleteDialogModule {}
