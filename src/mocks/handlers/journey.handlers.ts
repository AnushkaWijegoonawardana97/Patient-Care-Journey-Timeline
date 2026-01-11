import { http, HttpResponse, delay } from "msw";
import { mockPatientJourney } from "../data";

export const journeyHandlers = [
  /** GET /api/journey */
  http.get("/api/journey", async ({ request }) => {
    await delay(500);

    const authHeader = request.headers.get("Authorization");

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return HttpResponse.json(
        { message: "Unauthorized", code: "UNAUTHORIZED", status: 401 },
        { status: 401 }
      );
    }

    return HttpResponse.json(mockPatientJourney);
  }),

  /** GET /api/journey/visits/:id */
  http.get("/api/journey/visits/:id", async ({ request, params }) => {
    await delay(300);

    const authHeader = request.headers.get("Authorization");

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return HttpResponse.json(
        { message: "Unauthorized", code: "UNAUTHORIZED", status: 401 },
        { status: 401 }
      );
    }

    const { id } = params;
    const visit = mockPatientJourney.visits.find((v) => v.id === id);

    if (!visit) {
      return HttpResponse.json(
        { message: "Visit not found", code: "NOT_FOUND", status: 404 },
        { status: 404 }
      );
    }

    return HttpResponse.json(visit);
  }),
];
