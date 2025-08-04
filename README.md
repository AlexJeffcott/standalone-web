# Standalone Preact + HTM + Signals

A single, standalone version of [Preact](https://github.com/preactjs/preact), [HTM](https://github.com/developit/htm) and [Preact Signals](https://github.com/preactjs/signals). No external dependencies, just one single file.

**Latest versions included:**
- Preact: 10.27.0
- @preact/signals: 2.2.1  
- HTM: 3.1.1

Available as a single file for CDN usage or local vendoring.

## Usage

### Via esm.sh CDN (Recommended)

```html
<div id="app"></div>
<script type="module">
  import {
    html,
    render,
    signal,
  } from "https://esm.sh/standalone";

  const count = signal(0);

  function App() {
    return html`
      <div>
        <h1>Hello World!</h1>
        <button onClick=${() => (count.value += 1)}>
          Increment with signal
        </button>
        <p>Counter: ${count}</p>
      </div>
    `;
  }

  render(html`<${App} />`, document.getElementById("app"));
</script>
```

### TypeScript Support

When using TypeScript with esm.sh, type definitions are automatically provided:

```typescript
import { html, render, signal, useSignal } from "https://esm.sh/standalone";

const count = signal<number>(0);

function Counter() {
  const localCount = useSignal(0);
  
  return html`
    <div>
      <p>Global: ${count}</p>
      <p>Local: ${localCount}</p>
      <button onClick=${() => localCount.value++}>+</button>
    </div>
  `;
}
```

### React Compatibility Version

For use with React component libraries:

```html
<script type="module">
  import {
    html,
    render,
    signal,
    Fragment,
    memo,
    forwardRef
  } from "https://esm.sh/standalone/dist/standalone-react-compat.js";

  // Now compatible with React ecosystem libraries
</script>
```

### Via npm (not recommended)

I don't recommend installing this package via NPM. It's best to install [Preact](https://github.com/preactjs/preact), [HTM](https://github.com/developit/htm) and [Preact Signals](https://github.com/preactjs/signals) separately:

```sh
npm install preact htm @preact/signals
# or yarn
yarn add preact htm @preact/signals
# or pnpm
pnpm install preact htm @preact/signals
```

## Motivation and goals

My main motivation is to be able to download the entirety of Preact + HTM + Preact Signals offline in a single file.

You can absolutely use separate packages via CDN (and it works fine):

```html
<script type="module">
  import { h, render } from "https://esm.sh/preact";
  import htm from "https://esm.sh/htm";
  import { signal } from "https://esm.sh/@preact/signals";
  const html = htm.bind(h);
</script>
```

or use the combined HTM/Preact export:

```html
<script type="module">
  import { html, render } from "https://esm.sh/htm/preact";
  import { signal } from "https://esm.sh/@preact/signals";
</script>
```

However, due to my work limitations (i.e. my internal Preact apps run on restricted corp intranet), having a downloadable, offline version is required, hence the need for a prebundled, no-dependency, single script that I can easily download and use offline.

Simply put, the ideal situation is:

```html
<script type="module">
  // Use via esm.sh CDN with automatic TypeScript support
  import { html, render, signal } from "https://esm.sh/standalone";
  
  // OR download locally for offline use
  import { html, render, signal } from "./standalone.js";
</script>
```

Inspired by the [standalone version of Preact + HTM](https://github.com/developit/htm#installation).

All rights belong to [Preact](https://github.com/preactjs/preact), [HTM](https://github.com/developit/htm) and [Preact Signals](https://github.com/preactjs/signals) owners/maintainers.

## Building from source

Install and bundle using [Bun](https://bun.sh):

```sh
git clone https://github.com/alexjeffcott/standalone.git
cd standalone
bun install
bun run bundle        # Creates dist/standalone.js
bun run bundle:compat # Creates dist/standalone-react-compat.js
```

## Files Generated

- `dist/standalone.js` - Main bundle (23.8 KB minified)
- `dist/standalone-react-compat.js` - React compatibility version (30.5 KB minified)  
- `dist/standalone.d.ts` - TypeScript definitions
