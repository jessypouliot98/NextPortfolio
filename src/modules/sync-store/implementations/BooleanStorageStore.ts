import { SyncStorageStore } from "@/modules/sync-store/implementations/SyncStorageStore";
import { useSyncStore } from "@/modules/sync-store/hooks";

export class BooleanStorageStore extends SyncStorageStore<BooleanStorageStore.StorageValue, BooleanStorageStore.StorageValue> {

  public constructor(args: BooleanStorageStore.ConstructorArgs) {
    super({
      key: args.key,
      storage: args.storage,
      fallback: args.initialValue ? "on" : "off",
    });
  }

  public toggleValue() {
    const prevValue = this.getValue();
    this.setValue(prevValue === "on" ? "off" : "on");
  }

}

export namespace BooleanStorageStore {

  export type ConstructorArgs = {
    key: string;
    storage?: Storage;
    initialValue: StorageValue;
  }

  export type StorageValue = "on" | "off";

  export function useValue(store: BooleanStorageStore) {
    const value = useSyncStore(store);
    return value === "on";
  }

}