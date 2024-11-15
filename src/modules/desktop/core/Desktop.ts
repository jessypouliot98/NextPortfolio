import { CleanupController } from "@/modules/sync-store/CleanupController";
import { assertDefined } from "@/modules/assert";
import { SyncStore } from "@/modules/sync-store/SyncStore";
import { DesktopApp } from "@/modules/desktop/core/DesktopApp";

export class Desktop extends SyncStore<Desktop.Snapshot>{

  private cleanupController = new CleanupController();
  private root: HTMLElement | undefined;
  private container: HTMLElement | undefined;
  private apps: DesktopApp[] = [];
  private weakAppSet = new WeakSet<DesktopApp>();
  private weakNodeAppMap = new WeakMap<Element, DesktopApp>();
  private focusedApp: DesktopApp | undefined;

  get rootEl(): HTMLElement {
    const root = this.root;
    assertDefined(root);
    return root;
  }

  get containerEl(): HTMLElement {
    const container = this.container;
    assertDefined(container);
    return container;
  }

  get isInitialized(): boolean {
    return !!this.root;
  }

  get rect(): DOMRect {
    return this.containerEl.getBoundingClientRect();
  }

  private setupListeners() {
    const observer = new ResizeObserver(() => this.update());
    observer.observe(this.containerEl);
    this.cleanupController.add(() => observer.disconnect());
  }

  private createContainer() {
    const container = document.createElement("div");
    container.setAttribute("data-desktop", "container");
    return container;
  }

  private setRoot(root: HTMLElement) {
    this.root = root;
    root.setAttribute("data-desktop", "root");
    this.setAppsOpenedAttribute(this.apps.length);
    const container = this.createContainer();
    root.appendChild(container);
    this.container = container;

    this.cleanupController.add(() => {
      root.removeChild(container);
      this.container = undefined;
      root.removeAttribute("data-desktop");
      this.root = undefined;
    });
  }

  public init(root: HTMLElement) {
    this.setRoot(root);
    this.setupListeners();
    return () => this.deinit();
  }

  public deinit() {
    this.onUnmount();
  }

  private setAppsOpenedAttribute(appsOpened: number) {
    this.rootEl.setAttribute("data-desktop-root-apps-opened", String(appsOpened));
  }

  public registerApp(app: DesktopApp) {
    this.apps.push(app);
    this.weakAppSet.add(app);
    this.weakNodeAppMap.set(app.rootEl, app);
    this.setAppsOpenedAttribute(this.apps.length);

    const cleanup = () => this.unregisterApp(app);
    this.cleanupController.add(cleanup);
    return cleanup;
  }

  public unregisterApp(app: DesktopApp) {
    this.apps.splice(this.apps.indexOf(app), 1);
    this.weakAppSet.delete(app);
    this.setAppsOpenedAttribute(this.apps.length);
  }

  public focusApp(app: DesktopApp) {
    if (this.focusedApp !== app) {
      this.focusedApp?.blur();
      this.focusedApp = app;
    }
  }

  public blurApp(app: DesktopApp) {
    if (this.focusedApp === app) {
      this.focusedApp = undefined;
    }
  }

  protected onUnmount() {
    super.onUnmount();
    this.cleanupController.cleanup();
  }

  protected buildSnapshot(): Desktop.Snapshot {
    return {
      rect: this.rect,
    };
  }

}

export namespace Desktop {

  export type Snapshot = {
    rect: DOMRect;
  }

}