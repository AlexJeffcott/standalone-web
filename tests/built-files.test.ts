import { beforeAll, describe, expect, test } from 'bun:test';
import { existsSync } from 'node:fs';
import { resolve } from 'node:path';

// Expected exports for the main bundle
const expectedMainExports = [
  // Core Preact
  'h',
  'html',
  'render',
  'hydrate',
  'Component',
  'Fragment',
  'createContext',
  'createRef',
  // Hooks
  'useEffect',
  'useLayoutEffect',
  'useRef',
  'useMemo',
  'useCallback',
  'useContext',
  'useErrorBoundary',
  // Signals
  'computed',
  'effect',
  'untracked',
  'useComputed',
  'useSignal',
  'useSignalEffect',
  'signal',
  // Signals Utils
  'For',
  'Show',
  'useSignalRef',
];

// Additional exports for the React compat bundle
const expectedCompatExports = [
  ...expectedMainExports,
  // React compatibility
  'createElement',
  'PureComponent',
  'memo',
  'forwardRef',
  'lazy',
  'Suspense',
  'StrictMode',
  'startTransition',
  'useDeferredValue',
  'useTransition',
  'useId',
  'createPortal',
];

describe('Built Files', () => {
  beforeAll(() => {
    const mainFile = resolve('./dist/index.js');
    const compatFile = resolve('./dist/compat.js');
    const typesFile = resolve('./dist/index.d.ts');
    const compatTypesFile = resolve('./dist/compat.d.ts');

    if (!existsSync(mainFile)) {
      throw new Error(
        "Main bundle file does not exist. Run 'bun run build' first."
      );
    }
    if (!existsSync(compatFile)) {
      throw new Error(
        "Compat bundle file does not exist. Run 'bun run build' first."
      );
    }
    if (!existsSync(typesFile)) {
      throw new Error("Types file does not exist. Run 'bun run build' first.");
    }
    if (!existsSync(compatTypesFile)) {
      throw new Error(
        "Compat Types file does not exist. Run 'bun run build' first."
      );
    }
  });

  test('main bundle exports all expected methods', async () => {
    const mainBundle = (await import('../dist/index.js')) as Record<
      string,
      unknown
    >;

    for (const exportName of expectedMainExports) {
      expect(mainBundle[exportName]).toBeDefined();
      expect(typeof mainBundle[exportName]).not.toBe('undefined');
    }
  });

  test('compat bundle exports all expected methods', async () => {
    const compatBundle = (await import('../dist/compat.js')) as Record<
      string,
      unknown
    >;

    for (const exportName of expectedCompatExports) {
      expect(compatBundle[exportName]).toBeDefined();
      expect(typeof compatBundle[exportName]).not.toBe('undefined');
    }
  });

  test('main bundle has correct types for core functions', async () => {
    const mainBundle = (await import('../dist/index.js')) as Record<
      string,
      unknown
    >;

    // Test that core functions are functions
    expect(typeof mainBundle.h).toBe('function');
    expect(typeof mainBundle.html).toBe('function');
    expect(typeof mainBundle.render).toBe('function');
    expect(typeof mainBundle.hydrate).toBe('function');
    expect(typeof mainBundle.Component).toBe('function');
    expect(typeof mainBundle.createContext).toBe('function');
    expect(typeof mainBundle.createRef).toBe('function');

    // Test hooks are functions
    expect(typeof mainBundle.useEffect).toBe('function');
    expect(typeof mainBundle.useRef).toBe('function');
    expect(typeof mainBundle.useMemo).toBe('function');
    expect(typeof mainBundle.useCallback).toBe('function');

    // Test signals are functions
    expect(typeof mainBundle.signal).toBe('function');
    expect(typeof mainBundle.computed).toBe('function');
    expect(typeof mainBundle.effect).toBe('function');
    expect(typeof mainBundle.useSignal).toBe('function');
    expect(typeof mainBundle.useComputed).toBe('function');
  });

  test('compat bundle has correct types for React compatibility', async () => {
    const compatBundle = (await import('../dist/compat.js')) as Record<
      string,
      unknown
    >;

    // Test React compat functions
    expect(typeof compatBundle.createElement).toBe('function');
    expect(typeof compatBundle.memo).toBe('function');
    expect(typeof compatBundle.forwardRef).toBe('function');
    expect(typeof compatBundle.lazy).toBe('function');
    expect(typeof compatBundle.createPortal).toBe('function');
    expect(typeof compatBundle.useId).toBe('function');
    expect(typeof compatBundle.useTransition).toBe('function');
  });

  test("bundles don't export undefined values", async () => {
    const mainBundle = (await import('../dist/index.js')) as Record<
      string,
      unknown
    >;
    const compatBundle = (await import('../dist/compat.js')) as Record<
      string,
      unknown
    >;

    // Check main bundle
    for (const exportName of expectedMainExports) {
      expect(mainBundle[exportName]).not.toBe(undefined);
    }

    // Check compat bundle
    for (const exportName of expectedCompatExports) {
      expect(compatBundle[exportName]).not.toBe(undefined);
    }
  });
});
