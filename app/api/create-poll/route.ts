"use server";

import { supabase } from "@/lib/supabaseClient";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createPoll(formData: FormData) {
  // 1. Get User
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { error: "You must be logged in to create a poll." };
  }

  // 2. Get Form Data
  const question = formData.get("question") as string;
  const options = formData.getAll("option") as string[];
  const filteredOptions = options.filter((option) => option.trim() !== "");

  if (!question || filteredOptions.length < 2) {
    return { error: "A poll must have a question and at least two options." };
  }

  // 3. Insert Poll
  const { data: poll, error: pollError } = await supabase
    .from("polls")
    .insert({ question, created_by: user.id })
    .select("id")
    .single();

  if (pollError || !poll) {
    return { error: `Failed to create poll: ${pollError?.message}` };
  }

  // 4. Insert Poll Options
  const optionsToInsert = filteredOptions.map((option) => ({
    poll_id: poll.id,
    option_text: option,
  }));

  const { error: optionsError } = await supabase
    .from("poll_options")
    .insert(optionsToInsert);

  if (optionsError) {
    // In a real app, you might want to delete the poll we just created
    return { error: `Failed to create poll options: ${optionsError.message}` };
  }

  // 5. Revalidate and Redirect
  revalidatePath("/"); // Revalidate the home page to show the new poll
  redirect(`/poll/${poll.id}`); // Redirect to the new poll's page
}
