import { SyncStoreConsumer } from "@/modules/sync-store/types";
import { useSyncExternalStore } from "react";

export function useSyncStore<T>(store: SyncStoreConsumer<T>) {
  return useSyncExternalStore(
    (onStoreChange) => store.subscribe(onStoreChange),
    () => store.getSnapshot(),
    () => store.getSnapshot(),
  );
}