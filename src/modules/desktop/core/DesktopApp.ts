import { CleanupController } from "@/modules/sync-store/CleanupController";
import { assertDefined } from "@/modules/assert";
import { Desktop as DesktopCore } from "../core/Desktop";
import { panListener } from "@/modules/desktop/core/util/event/panListener";

export class DesktopApp {

  private cleanupController = new CleanupController();
  private root: HTMLElement | undefined;
  private options: DesktopApp.Options;
  private listeners = {
    focus: new Set<Function>(),
    close: new Set<Function>(),
    minimize: new Set<Function>(),
    maximize: new Set<Function>(),
  }

  public constructor({
    desktop,
    initialWidth = 600,
    initialHeight = 400,
    initialX,
    initialY,
    ...options
  }: DesktopApp.ConstructorArgs) {
    this.options = {
      ...options,
      desktop,
      initialWidth,
      initialHeight,
      initialX: initialX ?? ((desktop.rect.width / 2) - (initialWidth / 2)),
      initialY: initialY ?? ((desktop.rect.height / 2) - (initialHeight / 2)),
    }
  }

  get rootEl(): HTMLElement {
    const root = this.root;
    assertDefined(root);
    return root;
  }

  get rect(): DOMRect {
    return this.rootEl.getBoundingClientRect();
  }

  get focused(): boolean {
    return this.rootEl.getAttribute("data-desktop-app-focus") === "true";
  }

  private setRoot(root: HTMLElement) {
    this.root = root;
    root.setAttribute("data-desktop", "app");
    root.setAttribute("tabindex", "0");
    this.setPos(this.options.initialX, this.options.initialY);
    this.setSize(this.options.initialWidth, this.options.initialHeight);
    this.toggleVisibility(true);

    this.cleanupController.add(() => {
      root.removeAttribute("data-desktop");
      this.root = undefined;
    });
  }

  private setupListeners() {
    const root = this.rootEl;

    // Focus
    root.addEventListener("focusin", () => {
      this.focus();
    }, { signal: this.cleanupController.signal });

    // Blur
    root.addEventListener("focusout", () => {
      this.blur();
    }, { signal: this.cleanupController.signal });

    // Action
    root.addEventListener("click", (ev) => {
      if (ev.button !== 0) return;
      ev.preventDefault();
      if (!this.focused) {
        root.focus();
      }
      const target = ev.target as HTMLElement;
      const actionEl = target.closest(`[data-desktop-app-action]`);
      if (actionEl) {
        const action = actionEl.getAttribute("data-desktop-app-action");
        switch (action) {
          case "close": {
            this.notify("close");
            break;
          }
          case "minimize": {
            this.toggleVisibility(false);
            this.notify("minimize");
            break;
          }
          case "maximize": {
            const desktopRect = this.options.desktop.rect;
            this.setPos(0, 0);
            this.setSize(desktopRect.width, desktopRect.height)
            this.notify("maximize");
            break;
          }
        }
      }
    }, { signal: this.cleanupController.signal });

    // Pan
    panListener(
      root,
      ({ x, y }) => this.setPos(x, y),
      {
        onMouseDown: (ev) => {
          if (ev.button !== 0) {
            ev.preventDefault();
            return;
          }
          const target = ev.target as HTMLElement;
          const panEl = target.closest(`[data-desktop-app="pan"]`);
          if (!panEl) {
            ev.preventDefault();
            return;
          }
          document.body.style.userSelect = "none";
        },
        onMouseUp: () => {
          document.body.style.userSelect = "";
        },
        signal: this.cleanupController.signal,
      }
    );

  }

  public setPos(x: number, y: number) {
    const root = this.rootEl;
    root.style.setProperty("--desktop-app-x", `${x}px`);
    root.style.setProperty("--desktop-app-y", `${y}px`);
  }

  public setSize(width: number, height: number) {
    const root = this.rootEl;
    root.style.setProperty("--desktop-app-width", `${width}px`);
    root.style.setProperty("--desktop-app-height", `${height}px`);
  }

  public focus() {
    this.rootEl.setAttribute("data-desktop-app-focus", "true");
    this.options.desktop.focusApp(this);
    this.notify("focus");
  }

  public blur() {
    this.rootEl.setAttribute("data-desktop-app-focus", "false");
    this.options.desktop.blurApp(this);
  }

  public toggleVisibility(visible?: boolean) {
    if (visible === undefined) {
      visible = this.rootEl.getAttribute("data-desktop-app-visibility") === "minimized";
    }
    this.rootEl.setAttribute("data-desktop-app-visibility", visible ? "visible" : "minimized");
  }

  public init(root: HTMLElement) {
    this.setRoot(root);
    this.setupListeners();
    const unregisterApp = this.options.desktop.registerApp(this);
    this.cleanupController.add(unregisterApp);
    return () => this.deinit();
  }

  public deinit() {
    this.cleanupController.cleanup();
  }

  private getListenersFor(event: "focus" | "close" | "minimize" | "maximize"): Set<Function> {
    return this.listeners[event];
  }

  public on(event: "focus" | "close" | "minimize" | "maximize", cb: () => void) {
    this.getListenersFor(event).add(cb);
  }

  public off(event: "focus" | "close" | "minimize" | "maximize", cb: () => void) {
    this.getListenersFor(event).delete(cb);
  }

  private notify(event: "focus" | "close" | "minimize" | "maximize") {
    for (const handle of Array.from(this.getListenersFor(event))) {
      handle();
    }
  }

}

export namespace DesktopApp {

  export type Options = {
    desktop: DesktopCore;
    initialWidth: number;
    initialHeight: number;
    initialX: number;
    initialY: number;
  }

  export type ConstructorArgs = Pick<Options, "desktop"> & Partial<Omit<Options, "desktop">>;

}