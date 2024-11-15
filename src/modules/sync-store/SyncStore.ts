import { SyncStoreConsumer } from "@/modules/sync-store/types";
import { useSyncStore } from "@/modules/sync-store/hooks";

export abstract class SyncStore<TSnapshot> implements SyncStoreConsumer<TSnapshot> {

  private subscribers: Set<SyncStoreConsumer.StoreChangeCallback>;

  public constructor() {
    this.subscribers = new Set();
    this.subscribe.bind(this);
    this.unsubscribe.bind(this);
    this.buildSnapshot.bind(this);
    this.getSnapshot.bind(this);
    this.onMount.bind(this);
    this.onUnmount.bind(this);
  }

  public subscribe(onStoreChange: SyncStoreConsumer.StoreChangeCallback) {
    const count = this.subscribers.size;
    this.subscribers.add(onStoreChange);
    if (count === 0) {
      this.onMount();
    }
    return () => this.unsubscribe(onStoreChange);
  }

  public unsubscribe(onStoreChange: SyncStoreConsumer.StoreChangeCallback) {
    this.subscribers.delete(onStoreChange);
    if (this.subscribers.size === 0) {
      this.onUnmount();
    }
  }

  protected onMount() {
    // Silence is golden
  }

  protected onUnmount() {
    // Silence is golden
  }

  protected abstract buildSnapshot(): TSnapshot;

  private __getSnapshot__cache: TSnapshot | undefined;
  public getSnapshot(): TSnapshot {
    if (!this.__getSnapshot__cache) {
      this.__getSnapshot__cache = this.buildSnapshot();
    }
    return this.__getSnapshot__cache;
  }

  private notify() {
    for (const onStoreChange of Array.from(this.subscribers)) {
      onStoreChange();
    }
  }

  protected update() {
    this.__getSnapshot__cache = undefined;
    this.notify();
  }

}

export namespace SyncStore {

  export const use = useSyncStore;

}