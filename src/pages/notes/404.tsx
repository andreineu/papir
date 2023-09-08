import { FileX } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="flex items-center justify-center gap-4 text-5xl text-neutral-200  ">
      <FileX size="64" /> <span>Not found</span>
    </div>
  );
}
