import { Suspense } from "react";
import EventDetails from "@/components/EventDetails";

const EventDetailPage = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  return (
    <main>
      <Suspense fallback={<div>Loading...</div>}>
        <EventDetails params={params} />
      </Suspense>
    </main>
  );
};

export default EventDetailPage;
