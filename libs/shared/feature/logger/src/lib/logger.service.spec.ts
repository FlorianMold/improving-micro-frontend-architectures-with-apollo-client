import { inject, TestBed } from '@angular/core/testing';
import { UiLogLevel } from './levels.const';
import { UiLoggerService } from './logger.service';
import { UiLoggerModule } from './logger.module';

describe('Logger service', () => {
  beforeEach(() => {
    jest.spyOn(console, 'log');
    jest.spyOn(console, 'debug');
    jest.spyOn(console, 'info');
    jest.spyOn(console, 'warn');
    jest.spyOn(console, 'error');
    jest.spyOn(console, 'group');
    jest.spyOn(console, 'groupCollapsed');
    jest.spyOn(console, 'groupEnd');
    jest.spyOn(console, 'time');
    jest.spyOn(console, 'timeEnd');
  });

  describe('with UiLogLevel OFF', () => {
    beforeEach(() => {
      TestBed.configureTestingModule({ imports: [UiLoggerModule.withLogLevel(UiLogLevel.OFF)] });
    });

    it('should not call anything', inject([UiLoggerService], (logger: UiLoggerService) => {
      logger.log('log', 'param');
      logger.debug('debug', 'param');
      logger.info('info', 'param');
      logger.warn('warn', 'param');
      logger.error('error', 'param');
      logger.group('group');
      logger.groupCollapsed('groupCollapsed');
      logger.groupEnd();
      logger.time('time');
      logger.timeEnd('time');

      expect(console.log).not.toHaveBeenCalled();
      expect(console.debug).not.toHaveBeenCalled();
      expect(console.info).not.toHaveBeenCalled();
      expect(console.warn).not.toHaveBeenCalled();
      expect(console.error).not.toHaveBeenCalled();
      expect(console.group).not.toHaveBeenCalled();
      expect(console.groupCollapsed).not.toHaveBeenCalled();
      expect(console.groupEnd).not.toHaveBeenCalled();
      expect(console.time).not.toHaveBeenCalled();
      expect(console.timeEnd).not.toHaveBeenCalled();
    }));
  });

  describe('with UiLogLevel ERROR', () => {
    beforeEach(() => {
      TestBed.configureTestingModule({ imports: [UiLoggerModule.withLogLevel(UiLogLevel.ERROR)] });
    });

    it('should call groups and error', inject([UiLoggerService], (logger: UiLoggerService) => {
      expect(logger.level).toBe(UiLogLevel.ERROR);

      logger.log('log', 'param');
      logger.debug('debug', 'param');
      logger.info('info', 'param');
      logger.warn('warn', 'param');
      logger.error('error', 'param');
      logger.group('group');
      logger.groupCollapsed('groupCollapsed');
      logger.groupEnd();
      logger.time('time');
      logger.timeEnd('time');

      expect(console.log).not.toHaveBeenCalled();
      expect(console.debug).not.toHaveBeenCalled();
      expect(console.info).not.toHaveBeenCalled();
      expect(console.warn).not.toHaveBeenCalled();
      expect(console.error).toHaveBeenCalledWith('error', 'param');
      expect(console.group).toHaveBeenCalledWith('group');
      expect(console.groupCollapsed).toHaveBeenCalledWith('groupCollapsed');
      expect(console.groupEnd).toHaveBeenCalled();
      expect(console.time).not.toHaveBeenCalled();
      expect(console.timeEnd).not.toHaveBeenCalled();
    }));
  });

  describe('with UiLogLevel WARN', () => {
    beforeEach(() => {
      TestBed.configureTestingModule({ imports: [UiLoggerModule.withLogLevel(UiLogLevel.WARN)] });
    });

    it('should call groups, warn and error', inject([UiLoggerService], (logger: UiLoggerService) => {
      expect(logger.level).toBe(UiLogLevel.WARN);

      logger.log('log', 'param');
      logger.debug('debug', 'param');
      logger.info('info', 'param');
      logger.warn('warn', 'param');
      logger.error('error', 'param');
      logger.group('group');
      logger.groupCollapsed('groupCollapsed');
      logger.groupEnd();
      logger.time('time');
      logger.timeEnd('time');

      expect(console.log).not.toHaveBeenCalled();
      expect(console.debug).not.toHaveBeenCalled();
      expect(console.info).not.toHaveBeenCalled();
      expect(console.warn).toHaveBeenCalledWith('warn', 'param');
      expect(console.error).toHaveBeenCalledWith('error', 'param');
      expect(console.group).toHaveBeenCalledWith('group');
      expect(console.groupCollapsed).toHaveBeenCalledWith('groupCollapsed');
      expect(console.groupEnd).toHaveBeenCalled();
      expect(console.time).not.toHaveBeenCalled();
      expect(console.timeEnd).not.toHaveBeenCalled();
    }));
  });

  describe('with UiLogLevel INFO', () => {
    beforeEach(() => {
      TestBed.configureTestingModule({ imports: [UiLoggerModule.withLogLevel(UiLogLevel.INFO)] });
    });

    it('should call groups and UiLogLevels >= INFO', inject([UiLoggerService], (logger: UiLoggerService) => {
      expect(logger.level).toBe(UiLogLevel.INFO);

      logger.log('log', 'param');
      logger.debug('debug', 'param');
      logger.info('info', 'param');
      logger.warn('warn', 'param');
      logger.error('error', 'param');
      logger.group('group');
      logger.groupCollapsed('groupCollapsed');
      logger.groupEnd();
      logger.time('time');
      logger.timeEnd('time');

      expect(console.log).not.toHaveBeenCalled();
      expect(console.debug).not.toHaveBeenCalled();
      expect(console.info).toHaveBeenCalledWith('info', 'param');
      expect(console.warn).toHaveBeenCalledWith('warn', 'param');
      expect(console.error).toHaveBeenCalledWith('error', 'param');
      expect(console.group).toHaveBeenCalledWith('group');
      expect(console.groupCollapsed).toHaveBeenCalledWith('groupCollapsed');
      expect(console.groupEnd).toHaveBeenCalled();
      expect(console.time).not.toHaveBeenCalled();
      expect(console.timeEnd).not.toHaveBeenCalled();
    }));
  });

  describe('with UiLogLevel DEBUG', () => {
    beforeEach(() => {
      TestBed.configureTestingModule({ imports: [UiLoggerModule.withLogLevel(UiLogLevel.DEBUG)] });
    });

    it('should call groups, times and UiLogLevels >= DEBUG', inject([UiLoggerService], (logger: UiLoggerService) => {
      expect(logger.level).toBe(UiLogLevel.DEBUG);

      logger.log('log', 'param');
      logger.debug('debug', 'param');
      logger.info('info', 'param');
      logger.warn('warn', 'param');
      logger.error('error', 'param');
      logger.group('group');
      logger.groupCollapsed('groupCollapsed');
      logger.groupEnd();
      logger.time('time');
      logger.timeEnd('time');

      expect(console.log).not.toHaveBeenCalled();
      expect(console.debug).toHaveBeenCalledWith('debug', 'param');
      expect(console.info).toHaveBeenCalledWith('info', 'param');
      expect(console.warn).toHaveBeenCalledWith('warn', 'param');
      expect(console.error).toHaveBeenCalledWith('error', 'param');
      expect(console.group).toHaveBeenCalledWith('group');
      expect(console.groupCollapsed).toHaveBeenCalledWith('groupCollapsed');
      expect(console.groupEnd).toHaveBeenCalled();
      expect(console.time).toHaveBeenCalledWith('time');
      expect(console.timeEnd).toHaveBeenCalledWith('time');
    }));
  });

  describe('with UiLogLevel LOG', () => {
    beforeEach(() => {
      TestBed.configureTestingModule({ imports: [UiLoggerModule.withLogLevel(UiLogLevel.LOG)] });
    });

    it('should call groups, times and all UiLogLevels', inject([UiLoggerService], (logger: UiLoggerService) => {
      expect(logger.level).toBe(UiLogLevel.LOG);

      logger.log('log', 'param');
      logger.debug('debug', 'param');
      logger.info('info', 'param');
      logger.warn('warn', 'param');
      logger.error('error', 'param');
      logger.group('group');
      logger.groupCollapsed('groupCollapsed');
      logger.groupEnd();
      logger.time('time');
      logger.timeEnd('time');

      expect(console.log).toHaveBeenCalledWith('log', 'param');
      expect(console.debug).toHaveBeenCalledWith('debug', 'param');
      expect(console.info).toHaveBeenCalledWith('info', 'param');
      expect(console.warn).toHaveBeenCalledWith('warn', 'param');
      expect(console.error).toHaveBeenCalledWith('error', 'param');
      expect(console.group).toHaveBeenCalledWith('group');
      expect(console.groupCollapsed).toHaveBeenCalledWith('groupCollapsed');
      expect(console.groupEnd).toHaveBeenCalled();
      expect(console.time).toHaveBeenCalledWith('time');
      expect(console.timeEnd).toHaveBeenCalledWith('time');
    }));
  });

  describe('with default UiLogLevel', () => {
    beforeEach(() => {
      TestBed.configureTestingModule({ imports: [UiLoggerModule.withLogLevel()] });
    });

    it('should have UiLogLevel LOG', inject([UiLoggerService], (logger: UiLoggerService) => {
      expect(logger.level).toBe(UiLogLevel.LOG);

      logger.log('log', 'param');
      logger.debug('debug', 'param');
      logger.info('info', 'param');
      logger.warn('warn', 'param');
      logger.error('error', 'param');
      logger.group('group');
      logger.groupCollapsed('groupCollapsed');
      logger.groupEnd();
      logger.time('time');
      logger.timeEnd('time');

      expect(console.log).toHaveBeenCalledWith('log', 'param');
      expect(console.debug).toHaveBeenCalledWith('debug', 'param');
      expect(console.info).toHaveBeenCalledWith('info', 'param');
      expect(console.warn).toHaveBeenCalledWith('warn', 'param');
      expect(console.error).toHaveBeenCalledWith('error', 'param');
      expect(console.group).toHaveBeenCalledWith('group');
      expect(console.groupCollapsed).toHaveBeenCalledWith('groupCollapsed');
      expect(console.groupEnd).toHaveBeenCalled();
      expect(console.time).toHaveBeenCalledWith('time');
      expect(console.timeEnd).toHaveBeenCalledWith('time');
    }));
  });
});
