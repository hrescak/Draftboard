import { Suspense } from "react";
import { FeedView } from "~/components/feed/FeedView";
import { FeedSkeleton } from "~/components/feed/FeedSkeleton";

export default function HomePage() {
  return (
    <div className="space-y-6">
      <Suspense fallback={<FeedSkeleton />}>
        <FeedView />
      </Suspense>
    </div>
  );
}
