import { http, HttpResponse, delay } from "msw";
import { mockAddOnServices } from "../data";

export const addOnServicesHandlers = [
  /** GET /api/add-on-services */
  http.get("/api/add-on-services", async ({ request }) => {
    await delay(400);

    const authHeader = request.headers.get("Authorization");

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return HttpResponse.json(
        { message: "Unauthorized", code: "UNAUTHORIZED", status: 401 },
        { status: 401 }
      );
    }

    return HttpResponse.json(mockAddOnServices);
  }),
];
