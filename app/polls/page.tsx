import PollList from "@/components/PollList";
import { PollsSkeleton } from "@/components/PollsSkeleton";
import { Button } from "@/components/ui/button";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import Link from "next/link";
import { Suspense } from "react";

export default async function PollsPage() {
  const cookieStore = cookies();
  const supabase = createServerComponentClient({ cookies: () => cookieStore });

  // Fetch the current user
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Fetch all polls
  const { data: polls, error } = await supabase
    .from("polls")
    .select(`*, poll_options(count), votes(count)`)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching polls:", error);
    // Handle error state appropriately
  }

  return (
    <main className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Polls Dashboard</h1>
        <Button asChild>
          <Link href="/create-poll">Create Poll</Link>
        </Button>
      </div>
      <Suspense fallback={<PollsSkeleton />}>
        <PollList polls={polls ?? []} currentUserId={user?.id} />
      </Suspense>
    </main>
  );
}
