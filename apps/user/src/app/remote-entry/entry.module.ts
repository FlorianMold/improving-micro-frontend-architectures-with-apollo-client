import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { environment } from '../core/environment';
import { UiUserRemoteCoreModule } from './remote-core';
import { UiUserEntryRoutingModule } from './entry-routing.module';
import { UiUserOverviewComponent } from './user/user-overview/user-overview.component';

@NgModule({
  imports: [CommonModule, UiUserRemoteCoreModule, UiUserEntryRoutingModule, UiUserOverviewComponent],
  providers: [...environment.dataAccessProviders],
})
export class UiUserRemoteEntryModule {}
