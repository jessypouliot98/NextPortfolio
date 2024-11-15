export function panListener(
  el: HTMLElement,
  handler: panListener.Handler,
  options?: panListener.Options
) {
  el.addEventListener("mousedown", (mouseDownEvent) => {
    options?.onMouseDown?.(mouseDownEvent);
    if (mouseDownEvent.defaultPrevented) {
      return;
    }
    const initialRect = el.getBoundingClientRect();
    let lastPos = { x: initialRect.x, y: initialRect.y };

    const panMoveHandler = (mouseMoveEvent: MouseEvent) => {
      const deltaX = mouseMoveEvent.clientX - mouseDownEvent.clientX;
      const deltaY = mouseMoveEvent.clientY - mouseDownEvent.clientY;
      lastPos.x = initialRect.x + deltaX;
      lastPos.y = initialRect.y + deltaY;
      handler(
        {
          startX: initialRect.x,
          startY: initialRect.y,
          x: lastPos.x,
          y: lastPos.y,
          deltaX,
          deltaY,
        },
        mouseMoveEvent,
      );
    }

    window.addEventListener("mousemove", panMoveHandler);

    window.addEventListener("mouseup", (mouseUpEvent) => {
      options?.onMouseUp?.(mouseUpEvent);
      window.removeEventListener("mousemove", panMoveHandler);
    }, { once: true, signal: options?.signal });

  }, { signal: options?.signal });
}

export namespace panListener {

  export type Options = {
    signal: AbortSignal;
    onMouseDown?: (ev: MouseEvent) => void;
    onMouseUp?: (ev: MouseEvent) => void;
  };
  export type Data = {
    startX: number;
    startY: number;
    x: number;
    y: number;
    deltaX: number;
    deltaY: number;
  };
  export type Handler = (data: Data, event: MouseEvent) => void;

}