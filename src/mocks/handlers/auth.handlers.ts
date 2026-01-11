import { http, HttpResponse, delay } from "msw";
import { mockLoginResponse, mockRegisterResponse, mockUser, mockCredentials } from "../data";

export const authHandlers = [
  /** POST /api/auth/login */
  http.post("/api/auth/login", async ({ request }) => {
    await delay(500);

    // Clone the request to read the body
    const clonedRequest = request.clone();
    let body: { email?: string; password?: string };

    try {
      body = (await clonedRequest.json()) as { email?: string; password?: string };
    } catch {
      return HttpResponse.json(
        { message: "Invalid request body", code: "PARSE_ERROR" },
        { status: 400 }
      );
    }

    // Validate required fields
    if (!body.email || !body.password) {
      return HttpResponse.json(
        { message: "Email and password are required", code: "VALIDATION_ERROR" },
        { status: 400 }
      );
    }

    // Check against mock credentials
    if (body.email !== mockCredentials.email || body.password !== mockCredentials.password) {
      return HttpResponse.json(
        { message: "Invalid email or password", code: "INVALID_CREDENTIALS" },
        { status: 401 }
      );
    }

    // Return success with mock user data
    return HttpResponse.json(mockLoginResponse);
  }),

  /** POST /api/auth/register */
  http.post("/api/auth/register", async ({ request }) => {
    await delay(500);

    const clonedRequest = request.clone();
    let body: { name?: string; email?: string; password?: string };

    try {
      body = (await clonedRequest.json()) as { name?: string; email?: string; password?: string };
    } catch {
      return HttpResponse.json(
        { message: "Invalid request body", code: "PARSE_ERROR" },
        { status: 400 }
      );
    }

    // Validate required fields
    if (!body.name || !body.email || !body.password) {
      return HttpResponse.json(
        { message: "All fields are required", code: "VALIDATION_ERROR" },
        { status: 400 }
      );
    }

    // Return success with new user data
    return HttpResponse.json({
      ...mockRegisterResponse,
      user: { ...mockUser, email: body.email, name: body.name },
    });
  }),

  /** GET /api/auth/me */
  http.get("/api/auth/me", async ({ request }) => {
    await delay(200);

    const authHeader = request.headers.get("Authorization");

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return HttpResponse.json({ message: "Unauthorized", code: "UNAUTHORIZED" }, { status: 401 });
    }

    return HttpResponse.json(mockUser);
  }),

  /** POST /api/auth/logout */
  http.post("/api/auth/logout", async () => {
    await delay(200);
    return HttpResponse.json({ success: true });
  }),
];
