import PollForm from "@/components/PollForm";
import { supabase } from "@/lib/supabaseClient";
import { redirect } from "next/navigation";

const CreatePollPage = async () => {
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
};

export default CreatePollPage;
