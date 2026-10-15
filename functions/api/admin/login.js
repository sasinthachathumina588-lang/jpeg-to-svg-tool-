
export async function onRequestPost({ request, env }) {
  const headers = {
    "Content-Type": "application/json",
    "Cache-Control": "no-store"
  };

  if (!env.ADMIN_USERNAME || !env.ADMIN_PASSWORD) {
    return new Response(JSON.stringify({
      success: false,
      message: "Admin credentials are not configured."
    }), { status: 503, headers });
  }

  try {
    const body = await request.json();
    const { username, password } = body;

    if (
      typeof username !== "string" ||
      typeof password !== "string" ||
      username !== env.ADMIN_USERNAME ||
      password !== env.ADMIN_PASSWORD
    ) {
      return new Response(JSON.stringify({
        success: false,
        message: "Invalid username or password."
      }), { status: 401, headers });
    }

    return new Response(JSON.stringify({
      success: true,
      message: "Login accepted."
    }), { status: 200, headers });
  } catch {
    return new Response(JSON.stringify({
      success: false,
      message: "Invalid request."
    }), { status: 400, headers });
  }
}
