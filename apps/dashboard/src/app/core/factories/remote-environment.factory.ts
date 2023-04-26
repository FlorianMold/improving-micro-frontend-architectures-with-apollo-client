import { UiDashboardEnvironmentLoaderService } from '../conf';

export const remoteEnvironmentFactory = (envService: UiDashboardEnvironmentLoaderService) => {
  return () => envService.storeResource('dashboard', 'assets/settings.json');
};
