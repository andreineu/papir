import { useSession } from 'next-auth/react';
import Link from 'next/link';

import { Button } from './ui/button';

export const Sidebar = () => {
  const { data: session } = useSession();

  return (
    <div className="fixed inset-y-0 left-0 bg-neutral-900 p-4">
      {!session ? (
        <Button asChild variant="default" className="text-2xl font-bold">
          <Link href="/api/auth/signin" target="_blank">
            <h3>Sign in</h3>
          </Link>
        </Button>
      ) : (
        <Link
          className="flex max-w-xs flex-col gap-4 rounded-xl bg-white/10 p-4 text-white hover:bg-white/20"
          href="/api/auth/signout"
          target="_blank"
        >
          <h3 className="text-2xl font-bold">Sign out</h3>
        </Link>
      )}
    </div>
  );
};
