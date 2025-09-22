// "use server";

// import { supabase } from "@/lib/supabaseClient";
// import { revalidatePath } from "next/cache";
// import { redirect } from "next/navigation";
// import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
// import { cookies } from "next/headers";

// export async function createPoll(formData: FormData) {
//   const cookieStore = cookies();
//   const supabase = createRouteHandlerClient({ cookies: () => cookieStore });

//   // 1. Get User
//   const {
//     data: { user },
//   } = await supabase.auth.getUser();

//   if (!user) {
//     return { error: "You must be logged in to create a poll." };
//   }

//   // 2. Get Form Data
//   const question = formData.get("question") as string;
//   const options = formData.getAll("option") as string[];
//   const filteredOptions = options.filter((option) => option.trim() !== "");

//   if (!question || filteredOptions.length < 2) {
//     return { error: "A poll must have a question and at least two options." };
//   }

//   // 3. Insert Poll
//   const { data: poll, error: pollError } = await supabase
//     .from("polls")
//     .insert({ question, created_by: user.id })
//     .select("id")
//     .single();

//   if (pollError || !poll) {
//     return { error: `Failed to create poll: ${pollError?.message}` };
//   }

//   // 4. Insert Poll Options
//   const optionsToInsert = filteredOptions.map((option) => ({
//     poll_id: poll.id,
//     option_text: option,
//   }));

//   const { error: optionsError } = await supabase
//     .from("poll_options")
//     .insert(optionsToInsert);

//   if (optionsError) {
//     // In a real app, you might want to delete the poll we just created
//     return { error: `Failed to create poll options: ${optionsError.message}` };
//   }

//   // 5. Revalidate and Redirect
//   revalidatePath("/"); // Revalidate the home page to show the new poll
//   redirect(`/poll/${poll.id}`); // Redirect to the new poll's page
// }

import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST(req: Request) {
  const cookieStore = cookies();
  const supabase = createRouteHandlerClient({ cookies: () => cookieStore });

  // 1. Get User
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json(
      { error: "You must be logged in to create a poll." },
      { status: 401 }
    );
  }

  // 2. Parse JSON body
  const { question, options } = await req.json();

  if (!question || !options || options.length < 2) {
    return NextResponse.json(
      { error: "A poll must have a question and at least two options." },
      { status: 400 }
    );
  }

  // 3. Insert Poll
  const { data: poll, error: pollError } = await supabase
    .from("polls")
    .insert({ question, created_by: user.id })
    .select("id")
    .single();

  if (pollError || !poll) {
    return NextResponse.json(
      { error: pollError?.message || "Failed to create poll" },
      { status: 500 }
    );
  }

  // 4. Insert Options
  const optionsToInsert = options.map((option: string) => ({
    poll_id: poll.id,
    option_text: option,
  }));

  const { error: optionsError } = await supabase
    .from("poll_options")
    .insert(optionsToInsert);

  if (optionsError) {
    return NextResponse.json({ error: optionsError.message }, { status: 500 });
  }

  // 5. Success response
  return NextResponse.json({ success: true, pollId: poll.id }, { status: 200 });
}
