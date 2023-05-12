import child_process from 'node:child_process';

export class Exception {}

export class ProcessException extends Exception {}

export class InvalidExitCode extends ProcessException {
  public constructor(public readonly code: number | null) {
    super();
  }
}

export async function waitProcess(cp: child_process.ChildProcess) {
  return new Promise<void>((resolve, reject) => {
    cp.on('exit', (code) => {
      if (code !== 0) {
        reject(new InvalidExitCode(code));
      } else {
        resolve();
      }
    });
  });
}

export function spawn(
  cmd: string,
  args: string[],
  options: child_process.SpawnOptions = {}
) {
  options = {
    detached: false,
    stdio: 'inherit',
    ...options,
  };
  if (typeof options.env !== 'undefined') {
    options = {
      ...options,
      env: {
        ...process.env,
        ...options.env,
      },
    };
  }
  const value = child_process.spawn(cmd, args, options);
  console.log('$ %s %s', cmd, args.map((a) => `"${a}"`).join(' '));
  return {
    value,
    wait: () => waitProcess(value),
  };
}
