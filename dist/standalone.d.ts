// Type definitions for standalone Preact + HTM + Signals bundle
// Generated for standalone@0.0.16

declare module 'standalone' {
  // Preact Core Types
  export import ComponentType = preact.ComponentType;
  export import ComponentClass = preact.ComponentClass;
  export import FunctionComponent = preact.FunctionComponent;
  export import FunctionalComponent = preact.FunctionalComponent;
  export import Component = preact.Component;
  export import ComponentConstructor = preact.ComponentConstructor;
  export import ComponentFactory = preact.ComponentFactory;
  export import VNode = preact.VNode;
  export import ComponentChildren = preact.ComponentChildren;
  export import ComponentChild = preact.ComponentChild;
  export import Attributes = preact.Attributes;
  export import ClassAttributes = preact.ClassAttributes;
  export import PreactDOMAttributes = preact.PreactDOMAttributes;
  export import JSX = preact.JSX;
  export import Context = preact.Context;
  export import Provider = preact.Provider;
  export import Consumer = preact.Consumer;
  export import Ref = preact.Ref;
  export import RefObject = preact.RefObject;
  export import RefCallback = preact.RefCallback;

  // Preact Functions
  export function h<P>(
    type: string,
    props: Attributes & P | null,
    ...children: ComponentChildren[]
  ): VNode<any>;
  export function h<P>(
    type: ComponentType<P>,
    props: Attributes & P | null,
    ...children: ComponentChildren[]
  ): VNode<any>;
  export function h(
    type: string,
    props: null,
    ...children: ComponentChildren[]
  ): VNode<any>;

  export function render(
    vnode: ComponentChild,
    parent: Element | Document | ShadowRoot | DocumentFragment,
    replaceNode?: Element | Text
  ): void;

  export function createContext<T>(defaultValue: T): Context<T>;
  export function createRef<T = any>(): RefObject<T>;

  // Hooks

  export function useEffect(effect: () => (void | (() => void)), deps?: any[]): void;
  export function useLayoutEffect(effect: () => (void | (() => void)), deps?: any[]): void;
  export function useRef<T = undefined>(): RefObject<T | undefined>;
  export function useRef<T>(initialValue: T): RefObject<T>;
  export function useMemo<T>(factory: () => T, deps: any[]): T;
  export function useCallback<T extends Function>(callback: T, deps: any[]): T;
  export function useContext<T>(context: Context<T>): T;
  export function useErrorBoundary(cb?: (error: any, errorInfo: any) => Promise<void> | void): [any, () => void];

  // HTM
  export const html: any;

  // Signals Types
  export interface Signal<T = any> {
    value: T;
    peek(): T;
    subscribe(fn: (value: T) => void): () => void;
    valueOf(): T;
    toString(): string;
    toJSON(): T;
    brand: 'Signal';
  }

  export interface ReadonlySignal<T = any> extends Omit<Signal<T>, 'value'> {
    readonly value: T;
    brand: 'Signal';
  }

  export interface Computed<T = any> extends ReadonlySignal<T> {
    brand: 'Computed';
  }

  export interface Effect {
    (): void;
    brand: 'Effect';
  }

  // Signals Functions
  export function signal<T>(value: T): Signal<T>;
  export function computed<T>(compute: () => T): Computed<T>;
  export function effect(fn: () => void | (() => void)): Effect;

  // Signal Hooks
  export function useSignal<T>(value: T): Signal<T>;
  export function useComputed<T>(compute: () => T): Computed<T>;
}

// Re-export preact and signals types for convenience
declare namespace preact {
  type Key = string | number | any;

  interface Attributes {
    key?: Key | undefined;
    jsx?: boolean | undefined;
  }

  interface ClassAttributes<T> extends Attributes {
    ref?: Ref<T> | undefined;
  }

  interface PreactDOMAttributes {
    children?: ComponentChildren;
    dangerouslySetInnerHTML?: {
      __html: string;
    } | undefined;
  }

  type ComponentChild =
    | VNode<any>
    | object
    | string
    | number
    | bigint
    | boolean
    | null
    | undefined;
  type ComponentChildren = ComponentChild[] | ComponentChild;

  interface FunctionComponent<P = {}> {
    (props: P & { children?: ComponentChildren }, context?: any): VNode<any> | null;
    displayName?: string | undefined;
    defaultProps?: Partial<P> | undefined;
  }

  interface FunctionalComponent<P = {}> extends FunctionComponent<P> {}

  type ComponentType<P = {}> = ComponentConstructor<P> | FunctionComponent<P>;

  type ComponentFactory<P = {}> = ComponentType<P>;

  type ComponentConstructor<P = {}, S = {}> = new (
    props: P & { children?: ComponentChildren },
    context?: any
  ) => Component<P, S>;

  abstract class Component<P = {}, S = {}> {
    constructor(props?: P & { children?: ComponentChildren }, context?: any);
    
    static displayName?: string;
    static defaultProps?: any;
    static contextType?: Context<any>;
    
    state: Readonly<S>;
    props: Readonly<P & { children?: ComponentChildren }>;
    context: any;
    base?: Element | Text;
    
    setState<K extends keyof S>(
      state: ((prevState: Readonly<S>, props: Readonly<P>) => Pick<S, K> | S | null) | (Pick<S, K> | S | null),
      callback?: () => void
    ): void;
    
    forceUpdate(callback?: () => void): void;
    
    abstract render(
      props?: Readonly<P & { children?: ComponentChildren }>,
      state?: Readonly<S>,
      context?: any
    ): ComponentChild;
    
    getSnapshotBeforeUpdate?(oldProps: Readonly<P>, oldState: Readonly<S>): any;
    componentDidCatch?(error: any, errorInfo: any): void;
    componentDidMount?(): void;
    componentDidUpdate?(oldProps: Readonly<P>, oldState: Readonly<S>, snapshot?: any): void;
    componentWillMount?(): void;
    componentWillReceiveProps?(nextProps: Readonly<P>, nextContext: any): void;
    componentWillUpdate?(nextProps: Readonly<P>, nextState: Readonly<S>, nextContext: any): void;
    componentWillUnmount?(): void;
  }

  interface VNode<P = {}> {
    type: ComponentType<P> | string;
    props: P & { children: ComponentChildren };
    key: Key;
    ref?: Ref<any> | null | undefined;
    startTime?: number | undefined;
    endTime?: number | undefined;
  }

  type Ref<T> = RefCallback<T> | RefObject<T> | null;
  type RefCallback<T> = (instance: T | null) => void;
  interface RefObject<T> {
    readonly current: T | null;
  }

  interface Context<T> {
    Consumer: Consumer<T>;
    Provider: Provider<T>;
    displayName?: string | undefined;
  }

  interface Provider<T> extends FunctionComponent<ProviderProps<T>> {
    displayName?: string | undefined;
  }

  interface Consumer<T> extends FunctionComponent<ConsumerProps<T>> {
    displayName?: string | undefined;
  }

  interface ProviderProps<T> {
    value: T;
    children?: ComponentChildren;
  }

  interface ConsumerProps<T> {
    children: (value: T) => ComponentChild;
  }

  namespace JSX {
    type Element = VNode<any>;
    interface ElementClass extends Component<any, any> {
      render(): ComponentChild;
    }
    interface ElementAttributesProperty {
      props: any;
    }
    interface ElementChildrenAttribute {
      children: any;
    }
    type LibraryManagedAttributes<C, P> = C extends ComponentType<infer T>
      ? T extends {}
        ? P & T
        : P
      : P;
    interface IntrinsicAttributes extends Attributes {}
    interface IntrinsicClassAttributes<T> extends ClassAttributes<T> {}
    interface IntrinsicElements {
      [elemName: string]: any;
    }
  }
}

export = standalone;
export as namespace standalone;