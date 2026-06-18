import { NextRequest, NextResponse } from "next/server";

type Role = "artist" | "collector";

export async function POST(req: NextRequest) {
  let email: string | undefined;
  let role: Role | undefined;

  // ---------------------------
  // Parse body safely
  // ---------------------------
  try {
    const body = (await req.json()) as {
      email?: string;
      role?: Role;
    };

    email = body.email;
    role = body.role;
  } catch {
    return NextResponse.json(
      { error: "Invalid request body" },
      { status: 400 },
    );
  }

  // ---------------------------
  // Validation
  // ---------------------------
  if (!email || !email.includes("@")) {
    return NextResponse.json({ error: "Invalid email" }, { status: 400 });
  }

  if (!role) {
    return NextResponse.json({ error: "Role is required" }, { status: 400 });
  }

  const apiKey = process.env.MAILERLITE_API_KEY;

  // 👇 separate groups
  const artistGroupId = process.env.MAILERLITE_ARTIST_GROUP_ID;
  const collectorGroupId = process.env.MAILERLITE_COLLECTOR_GROUP_ID;

  if (!apiKey || !artistGroupId || !collectorGroupId) {
    return NextResponse.json(
      { error: "Email service not configured" },
      { status: 500 },
    );
  }

  // pick group based on role
  const groupId = role === "artist" ? artistGroupId : collectorGroupId;

  // ---------------------------
  // MailerLite request
  // ---------------------------
  try {
    const mailerRes = await fetch(
      "https://connect.mailerlite.com/api/subscribers",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          email,
          groups: [groupId],
          fields: {
            role,
          },
        }),
      },
    );

    if (!mailerRes.ok) {
      const err = (await mailerRes.json()) as { message?: string };

      return NextResponse.json(
        { error: err?.message ?? "Subscription failed" },
        { status: 500 },
      );
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
