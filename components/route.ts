import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { pollId, question } = await req.json();

  if (!pollId || !question) {
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
    .update({ question })
    .eq("id", pollId)
    .eq("created_by", user.id);

  if (error) {
    return NextResponse.json(
      { error: `Failed to update poll: ${error.message}` },
      { status: 500 }
    );
  }

  return NextResponse.json({ success: true }, { status: 200 });
}
