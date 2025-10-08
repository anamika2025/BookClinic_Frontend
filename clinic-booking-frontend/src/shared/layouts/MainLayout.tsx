import type { ReactNode } from 'react';

type Props = {
  children: ReactNode
}

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
  )
}
