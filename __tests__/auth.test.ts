/**
 * @jest-environment node
 */

import { POST as registerHandler } from "@/app/api/register/route";
import { POST as loginHandler } from "@/app/api/login/route";
import { supabase } from "@/lib/supabaseClient";

jest.mock("@/lib/supabaseClient", () => ({
  supabase: {
    from: jest.fn().mockReturnThis(),
    select: jest.fn().mockReturnThis(),
    eq: jest.fn().mockReturnThis(),
    single: jest.fn(),
    auth: {
      signUp: jest.fn(),
      signInWithPassword: jest.fn(),
    },
  },
}));

describe("Authentication API Routes", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("POST /api/register", () => {
    it("should return 409 if user already exists", async () => {
      (
        supabase.from("users").select().eq("email", "test@example.com")
          .single as jest.Mock
      ).mockResolvedValueOnce({
        data: { id: "some-user-id" },
        error: null,
      });

      const request = new Request("http://localhost/api/register", {
        method: "POST",
        body: JSON.stringify({
          email: "test@example.com",
          password: "password123",
        }),
      });

      const response = await registerHandler(request);
      const body = await response.json();

      expect(response.status).toBe(409);
      expect(body.error).toBe("User with this email already exists.");
    });

    it("should return 200 on successful registration", async () => {
      (
        supabase.from("users").select().eq().single as jest.Mock
      ).mockResolvedValueOnce({
        data: null,
        error: null,
      });
      (supabase.auth.signUp as jest.Mock).mockResolvedValueOnce({
        data: { user: { id: "new-user-id" } },
        error: null,
      });

      const request = new Request("http://localhost/api/register", {
        method: "POST",
        body: JSON.stringify({
          email: "new@example.com",
          password: "password123",
          firstName: "John",
          lastName: "Doe",
        }),
      });

      const response = await registerHandler(request);
      const body = await response.json();

      expect(response.status).toBe(200);
      expect(body.message).toBe("Check email to verify account");
      expect(body.user.id).toBe("new-user-id");
    });

    it("should return 400 if email or password are missing", async () => {
      const request = new Request("http://localhost/api/register", {
        method: "POST",
        body: JSON.stringify({ email: "test@example.com" }),
      });

      const response = await registerHandler(request);
      expect(response.status).toBe(400);
    });
  });

  describe("POST /api/login", () => {
    it("should return 401 for invalid credentials", async () => {
      (supabase.auth.signInWithPassword as jest.Mock).mockResolvedValueOnce({
        error: { message: "Invalid login credentials" },
      });

      const request = new Request("http://localhost/api/login", {
        method: "POST",
        body: JSON.stringify({
          email: "wrong@example.com",
          password: "wrongpassword",
        }),
      });

      const response = await loginHandler(request);
      const body = await response.json();

      expect(response.status).toBe(401);
      expect(body.error).toBe("Invalid login credentials");
    });

    it("should return 200 on successful login", async () => {
      (supabase.auth.signInWithPassword as jest.Mock).mockResolvedValueOnce({
        error: null,
      });

      const request = new Request("http://localhost/api/login", {
        method: "POST",
        body: JSON.stringify({
          email: "test@example.com",
          password: "password123",
        }),
      });

      const response = await loginHandler(request);
      const body = await response.json();

      expect(response.status).toBe(200);
      expect(body.success).toBe(true);
    });

    it("should return 400 if email or password are missing", async () => {
      const request = new Request("http://localhost/api/login", {
        method: "POST",
        body: JSON.stringify({ email: "test@example.com" }),
      });
      const response = await loginHandler(request);
      expect(response.status).toBe(400);
    });
  });
});
