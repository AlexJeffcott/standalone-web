/**
 * Copyright 2018 Google Inc. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *     http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import { h, Component, Fragment, createContext, createRef, render, hydrate } from "preact";
import { useEffect, useLayoutEffect, useRef, useMemo, useCallback, useContext, useErrorBoundary } from "preact/hooks";
import { computed, effect, untracked, useComputed, useSignal, useSignalEffect, signal } from "@preact/signals";
import { For, Show, useSignalRef } from "@preact/signals/utils";
import { createElement, PureComponent, memo, forwardRef, lazy, Suspense, StrictMode, startTransition, useDeferredValue, useTransition, useId, createPortal } from "preact/compat";
declare const html: (strings: TemplateStringsArray, ...values: any[]) => import("preact").VNode<import("preact").Attributes> | import("preact").VNode<import("preact").Attributes>[];
export { h, html, render, hydrate, Component, Fragment, createContext, createRef, useEffect, useLayoutEffect, useRef, useMemo, useCallback, useContext, useErrorBoundary, computed, effect, untracked, useComputed, useSignal, useSignalEffect, signal, For, Show, useSignalRef, createElement, PureComponent, memo, forwardRef, lazy, Suspense, StrictMode, startTransition, useDeferredValue, useTransition, useId, createPortal, };
//# sourceMappingURL=compat.d.ts.map