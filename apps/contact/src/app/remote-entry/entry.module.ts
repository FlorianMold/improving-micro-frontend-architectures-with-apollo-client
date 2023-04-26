import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UiContactRemoteCoreModule } from './remote-core';
import { UiContactEntryRoutingModule } from './entry-routing.module';
import { UiContactRemoteModule } from './contact';
import { environment } from '../core/environment';

@NgModule({
  imports: [CommonModule, UiContactRemoteCoreModule, UiContactEntryRoutingModule, UiContactRemoteModule],
  providers: [...environment.dataAccessProviders],
})
export class UiContactRemoteEntryModule {}
