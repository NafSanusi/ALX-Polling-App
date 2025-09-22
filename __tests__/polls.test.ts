/**
 * @jest-environment node
 */

import { POST as createPollHandler } from "@/app/api/create-poll/route";

import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";

// Mock the auth-helpers-nextjs library
jest.mock("@supabase/auth-helpers-nextjs", () => ({
  createRouteHandlerClient: jest.fn(),
}));

describe("Polls API Routes", () => {
  let mockSupabase: any;

  beforeEach(() => {
    // Reset mocks before each test
    mockSupabase = {
      auth: {
        getUser: jest.fn(),
      },
      from: jest.fn(() => mockSupabase),
      insert: jest.fn(() => mockSupabase),
      select: jest.fn(() => mockSupabase),
      update: jest.fn(() => mockSupabase),
      delete: jest.fn(() => mockSupabase),
      eq: jest.fn(() => mockSupabase),
      single: jest.fn(),
    };
    (createRouteHandlerClient as jest.Mock).mockReturnValue(mockSupabase);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("POST /api/polls/create", () => {
    it("should return 401 if user is not authenticated", async () => {
      mockSupabase.auth.getUser.mockResolvedValue({ data: { user: null } });

      const request = new Request("http://localhost/api/polls/create", {
        method: "POST",
        body: JSON.stringify({
          question: "New question?",
          options: ["Opt 1", "Opt 2"],
        }),
      });

      const response = await createPollHandler(request);
      expect(response.status).toBe(401);
    });

    it("should return 400 if question or options are missing", async () => {
      mockSupabase.auth.getUser.mockResolvedValue({
        data: { user: { id: "user-123" } },
      });

      const request = new Request("http://localhost/api/polls/create", {
        method: "POST",
        body: JSON.stringify({ question: "Only a question" }),
      });

      const response = await createPollHandler(request);
      expect(response.status).toBe(400);
    });

    it("should create a poll successfully", async () => {
      mockSupabase.auth.getUser.mockResolvedValue({
        data: { user: { id: "user-123" } },
      });
      mockSupabase.single.mockResolvedValue({
        data: { id: "poll-abc" },
        error: null,
      });
      mockSupabase.insert.mockResolvedValue({ error: null });

      const request = new Request("http://localhost/api/polls/create", {
        method: "POST",
        body: JSON.stringify({
          question: "A valid question?",
          options: ["Option A", "Option B"],
        }),
      });

      const response = await createPollHandler(request);
      const body = await response.json();

      expect(response.status).toBe(201);
      expect(body.success).toBe(true);
      expect(body.pollId).toBe("poll-abc");
    });
  });

  //   describe("POST /api/polls/delete", () => {
  //     it("should delete a poll successfully", async () => {
  //       mockSupabase.auth.getUser.mockResolvedValue({
  //         data: { user: { id: "user-123" } },
  //       });
  //       mockSupabase.delete.mockResolvedValue({ error: null });

  //       const request = new Request("http://localhost/api/polls/delete", {
  //         method: "POST",
  //         body: JSON.stringify({ pollId: "poll-to-delete" }),
  //       });

  //       const response = await deletePollHandler(request);
  //       expect(response.status).toBe(200);
  //     });
  //   });

  // Add similar tests for the update route
});
