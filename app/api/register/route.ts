import { Database } from "@/types";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const requestUrl = new URL(request.url);
    const { email, password, firstName, lastName } = await request.json();
    const cookieStore = cookies();

    const supabase = createRouteHandlerClient<Database>({
      cookies: () => cookieStore,
    });

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { firstName, lastName }, // store profile fields in user_metadata
        emailRedirectTo: `${requestUrl.origin}/auth/callback`,
      },
    });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json(
      { message: "Check email to verify account", user: data.user },
      { status: 200 }
    );
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
