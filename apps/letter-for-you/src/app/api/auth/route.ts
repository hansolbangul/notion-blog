import { NextRequest, NextResponse } from "next/server";
import { serverAccount, serverClient } from "@/app/node-appwrite";

export async function POST(req: NextRequest) {
  try {
    const { jwt } = await req.json();

    if (!jwt) {
      return NextResponse.json({ error: "JWT is required" }, { status: 400 });
    }

    serverClient.setJWT(jwt);

    const session = await serverAccount.get();
    console.log("Authenticated Session:", session);

    const response = NextResponse.json({
      message: "Authentication successful",
    });
    response.cookies.set("jwt", jwt, {
      httpOnly: true,
      secure: true,
      path: "/",
      sameSite: "strict",
    });

    return response;
  } catch (error) {
    console.error("Authentication failed:", error);
    return NextResponse.json(
      { error: "Authentication failed" },
      { status: 500 },
    );
  }
}
