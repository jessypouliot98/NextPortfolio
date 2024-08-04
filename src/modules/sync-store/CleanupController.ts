export class CleanupController {

  private cleanupFns: Set<CleanupController.CleanupFn> = new Set();
  private abortController: AbortController | undefined;

  public get signal(): AbortSignal {
    if (!this.abortController) {
      this.abortController = new AbortController();
    }
    return this.abortController.signal;
  }

  public cleanup() {
    for (const cleanupFn of Array.from(this.cleanupFns)) {
      cleanupFn();
    }
    this.cleanupFns.clear();
    if (this.abortController) {
      this.abortController.abort();
      this.abortController = undefined;
    }
  }

}

export namespace CleanupController {

  export type CleanupFn = () => void;

}