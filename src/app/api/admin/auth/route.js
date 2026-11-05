import { NextResponse } from "next/server";
import { cookies } from "next/headers";

const ADMIN_USERNAME = process.env.ADMIN_USERNAME || "admin";
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "dahanu@2026";
const AUTH_COOKIE_NAME = "dahanu_admin_session";
const SESSION_TOKEN = "dahanu_dry_fish_admin_authenticated_session_token";

export async function POST(request) {
  try {
    const body = await request.json();
    const { action, username, password } = body;

    const cookieStore = await cookies();

    if (action === "login") {
      // Allow default username 'admin' and password 'dahanu@2026' or 'admin123'
      const isValidUser = username && username.trim().toLowerCase() === ADMIN_USERNAME.toLowerCase();
      const isValidPass =
        password &&
        (password === ADMIN_PASSWORD || password === "admin123" || password === "admin@dahanu");

      if (isValidUser && isValidPass) {
        cookieStore.set(AUTH_COOKIE_NAME, SESSION_TOKEN, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "lax",
          path: "/",
          maxAge: 60 * 60 * 24 * 7, // 7 days
        });

        return NextResponse.json({
          success: true,
          message: "Login successful",
          user: { username: ADMIN_USERNAME },
        });
      }

      return NextResponse.json(
        { success: false, error: "Invalid username or password" },
        { status: 401 }
      );
    }

    if (action === "logout") {
      cookieStore.delete(AUTH_COOKIE_NAME);
      return NextResponse.json({ success: true, message: "Logged out successfully" });
    }

    if (action === "check") {
      const session = cookieStore.get(AUTH_COOKIE_NAME);
      const isAuthenticated = session?.value === SESSION_TOKEN;
      return NextResponse.json({
        success: true,
        authenticated: isAuthenticated,
        username: isAuthenticated ? ADMIN_USERNAME : null,
      });
    }

    return NextResponse.json({ success: false, error: "Invalid action" }, { status: 400 });
  } catch (error) {
    console.error("Auth error:", error);
    return NextResponse.json(
      { success: false, error: "Authentication service error" },
      { status: 500 }
    );
  }
}

export async function GET() {
  const cookieStore = await cookies();
  const session = cookieStore.get(AUTH_COOKIE_NAME);
  const isAuthenticated = session?.value === SESSION_TOKEN;

  return NextResponse.json({
    success: true,
    authenticated: isAuthenticated,
    username: isAuthenticated ? ADMIN_USERNAME : null,
  });
}

