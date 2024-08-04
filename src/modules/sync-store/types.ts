export interface SyncStoreConsumer<TSnapshot> {

  subscribe(...params: Parameters<SyncStoreConsumer.SubscribeFn>): ReturnType<SyncStoreConsumer.SubscribeFn>;
  unsubscribe(...params: Parameters<SyncStoreConsumer.UnsubscribeFn>): ReturnType<SyncStoreConsumer.UnsubscribeFn>;
  getSnapshot(): TSnapshot;

}

export namespace SyncStoreConsumer {

  export type StoreChangeCallback = () => void;
  export type UnsubscribeListenerFn = () => void;
  export type SubscribeFn = (onStoreChange: StoreChangeCallback) => UnsubscribeListenerFn;
  export type UnsubscribeFn = (onStoreChange: StoreChangeCallback) => void;

}