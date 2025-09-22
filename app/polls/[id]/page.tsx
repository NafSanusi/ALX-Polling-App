import PollDetails from "@/components/PollDetails";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";

export default async function PollDetailsPage({
  params,
}: {
  params: { id: string };
}) {
  const cookieStore = cookies();
  const supabase = createServerComponentClient({ cookies: () => cookieStore });

  const { data: pollData, error } = await supabase
    .from("polls")
    .select(
      `
    id,
    question,
    poll_options (
      id,
      option_text,
      votes!votes_poll_option_id_fkey (*)
    )
  `
    )
    .eq("id", params.id) // filter by poll id
    .single();

  if (error || !pollData) {
    notFound();
  }

  // Transform the data to fit the PollDetails component props
  const poll = {
    id: pollData.id,
    question: pollData.question,
    options: pollData.poll_options.map((opt) => opt.option_text),
    votes: pollData.poll_options.map((opt) => opt.votes[0]?.count ?? 0),
  };

  return (
    <main className="p-8">
      <PollDetails
        question={poll.question}
        options={poll.options}
        votes={poll.votes}
      />
    </main>
  );
}
