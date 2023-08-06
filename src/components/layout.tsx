import { type FC } from 'react';

import { Sidebar } from './Sidebar';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <Sidebar />
      <main className="ml-48 min-h-screen">{children}</main>
    </>
  );
};
