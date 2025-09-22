import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { PollForm } from "./PollForm";

export default async function CreatePollPage() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold mb-6">Create a New Poll</h1>
      <PollForm />
    </main>
  );
}
