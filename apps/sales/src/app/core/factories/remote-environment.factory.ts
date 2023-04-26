import { UiSalesEnvironmentLoaderService } from '../conf';
import { UI_SALES_APP_NAME } from '../../app-config.const';

export const remoteEnvironmentFactory = (envService: UiSalesEnvironmentLoaderService) => {
  return () => envService.storeResource(UI_SALES_APP_NAME, 'assets/settings.json');
};
