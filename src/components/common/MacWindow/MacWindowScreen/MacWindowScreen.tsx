import React from "react";

export function MacWindowScreen({ children }: React.PropsWithChildren) {
  return (
    <div className="z-10 fixed inset-0 flex pointer-events-none">
      <div className="flex-1 relative">
        {children}
      </div>
    </div>
  )
}