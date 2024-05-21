"use client";

import { Terminal } from "@xterm/xterm";
import "@xterm/xterm/css/xterm.css"
import { useEffect, useRef, useState } from "react";

export type XtermProps = {
  className?: string;
}

export function Xterm({ className }: XtermProps) {
  const [terminal] = useState(() => {
    return new Xterm.MyTerminal({
      allowTransparency: true,
      theme: {
        background: "transparent",
        foreground: "transparent",
      },
      fontSize: 12,
    });
  })
  const divRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const div = divRef.current;
    if (!div || terminal.element) return;
    terminal.init(div);
  }, [terminal]);

  return (
    <div className={className} ref={divRef}/>
  )
}

export namespace Xterm {

  export class MyTerminal extends Terminal {

    public init(element: HTMLElement) {
      this.open(element);
      this.writeln("Welcome to my website!");
      this.writeln("This is still a work in progress.");
      this.write(">");

      this.onKey((ev) => {
        if (ev.key === "\r") {
          this.writeln("");
           this.write(">");
          return;
        }
        this.write(ev.key);
      });
    }

  }

}