import { Inject, Injectable, InjectionToken } from '@angular/core';
import { UiLogLevel } from './levels.const';

/**
 * The token to provide the log {@link UiLogLevel}.
 */
export const UI_LOGGER_LEVEL = new InjectionToken<UiLogLevel>('LOGGER_LEVEL');

// eslint-disable-next-line @typescript-eslint/no-empty-function
const noop = () => {};

/**
 * A logger service that provide the same functions as {@link console}.
 * The logger is bound to the console, so the Web Console shows the correct file and line number of the original call.
 */
@Injectable()
export class UiLoggerService {
  /**
   * The log level.
   */
  private readonly _level: UiLogLevel;

  /**
   * Outputs a message to the Web Console.
   * @param message A JavaScript string containing zero or more substitution strings.
   * @param optionalParams A list of JavaScript objects to output
   *                       OR JavaScript objects with which to replace substitution strings within message.
   */
  log: (message?: any, ...optionalParams: any[]) => void;

  /**
   * Outputs a debugging message to the Web Console.
   * @param message A JavaScript string containing zero or more substitution strings.
   * @param optionalParams A list of JavaScript objects to output
   *                       OR JavaScript objects with which to replace substitution strings within message.
   */
  debug: (message?: any, ...optionalParams: any[]) => void;

  /**
   * Outputs an informational message to the Web Console.
   * @param message A JavaScript string containing zero or more substitution strings.
   * @param optionalParams A list of JavaScript objects to output
   *                       OR JavaScript objects with which to replace substitution strings within message.
   */
  info: (message?: any, ...optionalParams: any[]) => void;

  /**
   * Outputs a warning message to the Web Console.
   * @param message A JavaScript string containing zero or more substitution strings.
   * @param optionalParams A list of JavaScript objects to output
   *                       OR JavaScript objects with which to replace substitution strings within message.
   */
  warn: (message?: any, ...optionalParams: any[]) => void;

  /**
   * Outputs an error message to the Web Console.
   * @param message A JavaScript string containing zero or more substitution strings.
   * @param optionalParams A list of JavaScript objects to output
   *                       OR JavaScript objects with which to replace substitution strings within message.
   */
  error: (message?: any, ...optionalParams: any[]) => void;

  /**
   * Creates a new inline group in the Web Console log.
   * @param groupTitle An optional title for the group.
   */
  group: (groupTitle?: string) => void;

  /**
   * Creates a new inline group in the Web Console log that is initially collapsed.
   * @param groupTitle An optional title for the group.
   */
  groupCollapsed: (groupTitle?: string) => void;

  /**
   * Exits the current inline group in the Web Console.
   */
  groupEnd: () => void;

  /**
   * Starts a timer you can use to track how long an operation takes.
   * It works only with log {@link UiLogLevel} equal or higher than DEBUG.
   *
   * @param timerName The name to give the new timer. This will identify the timer.
   */
  time: (timerName?: string) => void;

  /**
   * Stops a timer that was previously started by calling {@link UiLoggerService.time}.
   * It works only with log {@link UiLogLevel} equal or higher than DEBUG.
   *
   * @param timerName The name of the timer to stop. Once stopped, the elapsed time is automatically displayed in the Web Console.
   */
  timeEnd: (timerName?: string) => void;

  /**
   * Returns the log level.
   */
  get level(): UiLogLevel {
    return this._level;
  }

  constructor(@Inject(UI_LOGGER_LEVEL) level: UiLogLevel) {
    this._level = level;

    if (this._level >= UiLogLevel.LOG && console && console.log) {
      this.log = console.log.bind(console);
    } else {
      this.log = noop;
    }

    if (this._level >= UiLogLevel.DEBUG && console && console.debug) {
      this.debug = console.debug.bind(console);
    } else {
      this.debug = noop;
    }

    if (this._level >= UiLogLevel.INFO && console && console.info) {
      this.info = console.info.bind(console);
    } else {
      this.info = noop;
    }

    if (this._level >= UiLogLevel.WARN && console && console.warn) {
      this.warn = console.warn.bind(console);
    } else {
      this.warn = noop;
    }

    if (this._level >= UiLogLevel.ERROR && console && console.error) {
      this.error = console.error.bind(console);
    } else {
      this.error = noop;
    }

    if (this._level > UiLogLevel.OFF && console && console.group) {
      this.group = console.group.bind(console);
    } else {
      this.group = noop;
    }

    if (this._level > UiLogLevel.OFF && console && console.groupCollapsed) {
      this.groupCollapsed = console.groupCollapsed.bind(console);
    } else {
      this.groupCollapsed = noop;
    }

    if (this._level > UiLogLevel.OFF && console && console.groupEnd) {
      this.groupEnd = console.groupEnd.bind(console);
    } else {
      this.groupEnd = noop;
    }

    if (this._level >= UiLogLevel.DEBUG && console && console.time) {
      this.time = console.time.bind(console);
    } else {
      this.time = noop;
    }

    if (this._level >= UiLogLevel.DEBUG && console && console.timeEnd) {
      this.timeEnd = console.timeEnd.bind(console);
    } else {
      this.timeEnd = noop;
    }
  }
}
