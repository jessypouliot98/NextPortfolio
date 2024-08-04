import { SyncStore } from "@/modules/sync-store/SyncStore";
import { CleanupController } from "@/modules/sync-store/CleanupController";

export class SyncStorageStore<TValue extends string, TFallback extends TValue | null = null> extends SyncStore<TValue | TFallback> {

  private key: string;
  private storage: Storage;
  private fallback: TFallback;
  protected cleanupController = new CleanupController();

  public constructor(args: SyncStorageStore.ContructorArgs<TFallback>) {
    super();

    this.key = args.key;
    this.storage = args.storage ?? window.localStorage;
    this.fallback = (args.fallback ?? null) as TFallback;

    this.setValue.bind(this);
    this.deleteValue.bind(this);
    this.getValue.bind(this);
  }

  public getValue() {
    return (this.storage.getItem(this.key) ?? this.fallback) as TValue | TFallback;
  }

  public setValue(newValue: TValue): void {
    const oldValue = this.getValue();
    this.storage.setItem(this.key, newValue);
    this.update();
    this.dispatchStorageEvent(oldValue, newValue)
  }

  public deleteValue() {
    this.storage.removeItem(this.key);
    this.update();
  }

  protected buildSnapshot() {
    return this.getValue();
  }

  /**
   * StorageEvent not firing in same browser tab hack
   * https://stackoverflow.com/questions/35865481/storage-event-not-firing
   */
  private dispatchStorageEvent(oldValue: TValue | TFallback, newValue: TValue) {
    return window.dispatchEvent(
      new StorageEvent("storage", {
        storageArea: this.storage,
        key: this.key,
        oldValue,
        newValue,
      })
    )
  }

  protected onMount() {
    super.onMount();

    const value = this.getValue();
    if (value) {
      this.setValue(value)
    }

    window.addEventListener("storage", (ev) => {
      if (
        ev.storageArea !== this.storage ||
        ev.key !== this.key ||
        ev.oldValue === ev.newValue
      ) {
        return;
      }
      this.update();
    }, { signal: this.cleanupController.signal });
  }

  protected onUnmount() {
    this.cleanupController.cleanup();
  }

}

export namespace SyncStorageStore {

  export type ContructorArgs<TFallback extends string | null> = {
    key: string;
    storage?: Storage;
    fallback?: TFallback;
  }

  export function createServerMockedStorage(): Storage {
    const store: Map<string, string | null> = new Map();
    return {
      getItem(key) {
        return store.get(key) ?? null
      },
      setItem(key, value) {
        store.set(key, value);
      },
      removeItem(key) {
        store.delete(key);
      },
      key(index) {
        return Array.from(store.keys()).at(index) ?? null;
      },
      get length() {
        return store.size;
      },
      clear() {
        store.clear();
      }
    }
  }

  let serverStorage: Storage | undefined;
  export function withServerStorage(getStorage: () => Storage) {
    if (typeof window === "undefined") {
      if (!serverStorage) {
        serverStorage = createServerMockedStorage();
      }
      return serverStorage;
    }
    return getStorage();
  }

}