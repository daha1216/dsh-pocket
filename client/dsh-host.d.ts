// Ambient host & vendor module declarations for standalone `tsc --noEmit`.
// Must NOT contain top-level `import` / `export` statements so TypeScript treats
// every `declare module` below as an ambient module declaration.

declare module '@deepseek-ai/dsh-client-ui-slots' {
  export interface LocaleNamespaceMap {
    pocket: string
  }

  export type TranslateNS<N extends keyof LocaleNamespaceMap> = (
    key: LocaleNamespaceMap[N],
    params?: Record<string, unknown>,
  ) => string

  export interface PropsLocale<N extends keyof LocaleNamespaceMap> {
    t: TranslateNS<N>
  }

  export interface SlotMap {
    'conversation.session.header.actions': { kind: 'list'; scope?: string }
    'conversation.input.left': {
      kind: 'list'
      scope?: string
      runtime: {
        useInput: <R>(selector: (state: { phase: string }) => R) => R
        useSession: <R>(selector: (state: { subagent: unknown }) => R) => R
      }
    }
    'settings.section': { kind: 'list' }
  }

  export type PropsRuntime<S extends keyof SlotMap> = S extends keyof SlotMap
    ? SlotMap[S] extends { runtime: infer R }
      ? R
      : Record<never, never>
    : Record<never, never>

  export interface SlotRegisterSpec<N extends string = string> {
    name: N
    id: string
    order?: number
    locale?: string
    label?: () => string
    inject?: () => object
  }

  export interface SlotsService {
    inject(name: string, setup: () => (() => void) | void): () => void
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    register<P = any>(
      spec: SlotRegisterSpec,
      component: (props: P) => import('react').ReactElement | null,
    ): () => void
  }
}

declare module '@deepseek-ai/dsh-client-runtime/client' {
  export interface ClientLocaleService {
    register<N extends string>(
      ns: N,
      tables: Record<string, Record<string, string>>,
    ): () => void
    bind<
      N extends keyof import('@deepseek-ai/dsh-client-ui-slots').LocaleNamespaceMap,
    >(
      ns: N,
    ): import('@deepseek-ai/dsh-client-ui-slots').TranslateNS<N>
    bind(ns: string): (key: string, params?: Record<string, unknown>) => string
  }

  export interface ClientConnectionService {
    isLoopback?: boolean
    rpc: {
      call(
        channel: string,
        endpoint: string,
        payload?: unknown,
        signal?: AbortSignal,
      ): Promise<unknown>
    }
    reconnect?(): unknown
    generation?: {
      getSnapshot?(): unknown
      subscribe?(listener: () => void): () => void
    }
    state?: {
      getSnapshot?(): unknown
      subscribe?(listener: () => void): () => void
    }
  }

  export interface ClientLayoutService {
    toggleSidebar(): void
    selectPanel?(id: string | null): void
    openDetails?(): void
    closeDetails?(): void
  }

  export interface ClientSessionsService {
    list: {
      getSnapshot(): {
        current?: string
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        byId: Record<string, any>
      }
      subscribe(listener: () => void): () => void
    }
    selected?: unknown
    open(id: string): void
    clear(): void
    refresh?(): Promise<void>
    manager?: {
      get?(id: string): unknown
    }
  }

  export interface ClientContext {
    effect(fn: () => (() => void) | void, label?: string): () => void
    inject(
      deps: readonly string[],
      callback: (scope: ClientContext) => void,
    ): () => void
    get(service: string): unknown
    slots: import('@deepseek-ai/dsh-client-ui-slots').SlotsService
    locale: ClientLocaleService
    layout: ClientLayoutService
    connection: ClientConnectionService
    sessions: ClientSessionsService
    sessionLogDownload: {
      download(sessionId: string): void
    }
  }
}

declare module '@deepseek-ai/dsh-client-ui-layout/client' {}
declare module '@deepseek-ai/dsh-client-ui-conversation/client' {}
declare module '@deepseek-ai/dsh-client-ui-sidebar/client' {}
declare module '@deepseek-ai/dsh-client-ui-settings/client' {}
declare module '@deepseek-ai/dsh-client-locale/client' {}
declare module '@deepseek-ai/dsh-session-log-export/client' {}

declare module 'qrcode' {
  export function create(
    text: string,
    options?: Record<string, unknown>,
  ): {
    modules: {
      size: number
      data: Uint8Array | boolean[]
      get?: (row: number, col: number) => number | boolean
    }
  }
  export function toDataURL(
    text: string,
    options?: Record<string, unknown>,
  ): Promise<string>
  export function toString(
    text: string,
    options?: Record<string, unknown>,
  ): Promise<string>
}
