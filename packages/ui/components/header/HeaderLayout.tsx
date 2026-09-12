import React from "react";
export const HeaderLayout = ({ children }: { children: React.ReactNode }) => (
  <header className="journal-header">
    <div className="journal-shell">{children}</div>
  </header>
);
