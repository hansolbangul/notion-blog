import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { action, name, value, options } = await req.json();

  if (!name) {
    return NextResponse.json(
      { message: "Cookie name is required" },
      { status: 400 },
    );
  }

  if (action === "set") {
    const response = NextResponse.json({
      message: "Cookie set successfully",
    });

    response.cookies.set(name, value, {
      path: options?.path || "/",
      httpOnly: true,
      secure: options?.secure ?? true,
    });

    return response;
  }

  if (action === "clear") {
    const response = NextResponse.json({
      message: "Cookie cleared successfully",
    });

    response.cookies.set(name, "", {
      path: options?.path || "/",
      maxAge: 0,
    });

    return response;
  }

  return NextResponse.json({ message: "Invalid action" }, { status: 400 });
}

export async function GET(req: NextRequest) {
  const cookieName = req.nextUrl.searchParams.get("name");

  if (!cookieName) {
    return NextResponse.json(
      { message: "Cookie name is required" },
      { status: 400 },
    );
  }

  const cookieValue = req.cookies.get(cookieName)?.value || null;

  if (!cookieValue) {
    return NextResponse.json({ message: "No cookies found" }, { status: 404 });
  }

  return NextResponse.json({ value: cookieValue });
}
