import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UiSalesRemoteCoreModule } from './remote-core';
import { UiSalesEntryRoutingModule } from './entry-routing.module';
import { UiSalesRemoteModule } from './sales/sales.module';
import { environment } from '../core/environment';

@NgModule({
  imports: [CommonModule, UiSalesRemoteCoreModule, UiSalesEntryRoutingModule, UiSalesRemoteModule],
  providers: [...environment.dataAccessProviders],
})
export class UiSalesRemoteEntryModule {}
