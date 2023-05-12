import path from 'path';
import express from 'express';
import { getArgument, getInteger, getNamedArgument } from 'cli-argument-helper';
import { spawn } from './shell';

function webpackDev({ watch }: { watch: boolean }) {
  return spawn(
    'npx',
    [
      'webpack',
      ...(watch ? ['--watch'] : []),
      '--config',
      path.resolve(__dirname, 'webpack/webpack.development.config.ts')
    ],
    {
      env: {
        TS_NODE_PROJECT: path.resolve(__dirname, 'tsconfig.json'),
        NODE_OPTIONS: '--require ts-node/register'
      }
    }
  );
}

async function dev({ port }: { port: number }) {
  /**
   * compile the app one time
   */
  await webpackDev({
    watch: false
  }).wait();

  const outDir = path.resolve(__dirname, '../public');
  const app = express();
  app.use(
    express.static(outDir, {
      cacheControl: false,
      etag: false
    })
  );
  app.listen(port, () => {
    console.log('listening on port: %d', port);
  });

  // const sass = spawn('npx', [
  //   'sass',
  //   path.resolve(__dirname, '../sass/index.scss'),
  //   path.resolve(outDir, 'index.css'),
  //   '-w',
  // ]);

  /**
   * start webpack in watch mode
   */
  const webpack = webpackDev({
    watch: true
  });
  await Promise.all([webpack.wait()]);
}

(async () => {
  const args = Array.from(process.argv);
  console.log(args);
  const port = getNamedArgument(args, '--port', getInteger) ?? 8080;
  if (getArgument(args, '--dev') !== null) {
    await dev({
      port
    });
  }
})().catch((reason) => {
  process.exitCode = 1;
  console.error(reason);
});
