import { type FC } from 'react';

import { Sidebar } from './Sidebar';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <Sidebar />
      <main className="ml-48 min-h-screen">
        <div className="mx-auto flex h-screen flex-col items-center gap-4 pt-16 md:max-w-[576px] lg:max-w-[768px] xl:max-w-[1024px]">
          {children}
        </div>
      </main>
    </>
  );
};
