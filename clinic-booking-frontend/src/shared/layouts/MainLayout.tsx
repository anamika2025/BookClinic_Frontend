import type { ReactNode } from "react";
import "primereact/resources/themes/lara-light-indigo/theme.css"; // Theme
import "primereact/resources/primereact.css"; // Core CSS
import "primeicons/primeicons.css"; // Icons
import "primeflex/primeflex.css";

type Props = {
  children: ReactNode;
};

export default function MainLayout({ children }: Props) {
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Content area */}
      <div className="flex flex-col flex-1">
        {/* Topbar with search and city */}

        {/* Main content */}
        <main className="p-6 max-w-7xl mx-auto w-full">{children}</main>
      </div>
    </div>
  );
}
