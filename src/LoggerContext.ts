import Logger, { ILogger, LogLevel } from '@jscriptlogger/lib';
import { createContext, useContext } from 'react';

export const LoggerContext = createContext<ILogger>(
  new Logger(['app'], {
    console,
    logLevel: LogLevel.Debug,
    root: null
  })
);

export function useLogger() {
  return useContext(LoggerContext);
}
