import '../sass/index.scss';
import { Client, LoggerNetwork } from '@jscriptlogger/client';
import Logger, { LogLevel } from '@jscriptlogger/lib';
import { createRoot } from 'react-dom/client';
import {
  CreatePage,
  GetFirstPageFromTitle
} from '@jscriptlogger/schema/src/app/page';
import App from './App';
import { StrictMode } from 'react';
import { LoggerContext } from './LoggerContext';

document.addEventListener('DOMContentLoaded', () => {
  const client = new Client({
    url: 'ws://localhost:3333/ws',
    textDecoder: new TextDecoder(),
    textEncoder: new TextEncoder(),
    WebSocket,
    getRandomValues(value) {
      return crypto.getRandomValues(value);
    },
    logger: new Logger(['ClientLogger'], {
      console,
      logLevel: LogLevel.Debug,
      root: null
    })
  });
  const logger = new LoggerNetwork(['App'], {
    console,
    root: null,
    client,
    pageId: (async (title) => {
      const existingPageId = await client.sendMessage(
        GetFirstPageFromTitle({
          title
        })
      );
      if (
        existingPageId._name !== 'app.page.getFirstPageFromTitleResult' ||
        existingPageId.id === null
      ) {
        const newPageId = await client.sendMessage(
          CreatePage({
            title
          })
        );
        if (newPageId._name !== 'app.page.createPageResult') {
          return null;
        }
        return newPageId.id;
      }
      console.log('using existing page: %o', existingPageId);
      return existingPageId.id;
    })(`landing page: ${navigator.userAgent}`)
  });
  const rootEl = document.getElementById('root');
  if (rootEl === null) {
    logger.error('failed to get root element: %s', document.body.innerHTML);
    return;
  }
  const root = createRoot(rootEl);
  root.render(
    <StrictMode>
      <LoggerContext.Provider value={logger}>
        <App />
      </LoggerContext.Provider>
    </StrictMode>
  );
});
