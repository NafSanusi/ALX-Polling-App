import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

export async function POST(req: Request) {
  const { pollId, question } = await req.json();

  // More specific validation
  if (!pollId) {
    return NextResponse.json(
      { error: "Poll ID is required." },
      { status: 400 }
    );
  }

  // Trim the question to ensure it's not just whitespace
  if (!question || typeof question !== "string" || question.trim() === "") {
    return NextResponse.json(
      { error: "Poll ID and question are required." },
      { status: 400 }
    );
  }

  const cookieStore = cookies();
  const supabase = createRouteHandlerClient({ cookies: () => cookieStore });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json(
      { error: "You must be logged in." },
      { status: 401 }
    );
  }

  // Update the poll question. RLS policies should ensure
  // that only the creator of the poll can update it.
  const { error } = await supabase
    .from("polls")
    .update({ question: question.trim() })
    .eq("id", pollId)
    .eq("created_by", user.id);

  if (error) {
    return NextResponse.json(
      { error: `Failed to update poll: ${error.message}` },
      { status: 500 }
    );
  }

  // Revalidate the path to ensure the UI updates with the new question
  revalidatePath("/polls");

  return NextResponse.json({ success: true }, { status: 200 });
}
