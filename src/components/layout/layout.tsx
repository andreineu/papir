import { type FC, useState } from 'react';

import { cn } from '@src/lib/utils';

import { INITIAL_SIDEBAR_IS_OPEN } from './constants';
import { Sidebar } from './sidebar';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: FC<LayoutProps> = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(INITIAL_SIDEBAR_IS_OPEN);

  return (
    <div className="h-full w-full overflow-hidden">
      <Sidebar onOpenChange={() => setIsSidebarOpen(!isSidebarOpen)} />
      <main
        className={cn(
          'transition-margin-left duration-300',
          isSidebarOpen ? 'ml-[260px]' : 'ml-0',
        )}
      >
        <div className="container mx-auto flex h-screen flex-col items-center gap-4 pt-20 lg:max-w-[1024px]">
          {children}
        </div>
      </main>
    </div>
  );
};
