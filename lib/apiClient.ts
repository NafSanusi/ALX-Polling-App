// Type definitions based on the api-spec.md

interface CreatePollBody {
  question: string;
  options: string[];
}

interface CreatePollResponse {
  success: boolean;
  pollId: string;
}

interface VoteBody {
  pollId: string;
  optionId: string;
}

interface VoteResponse {
  success: boolean;
}

interface PollOption {
  id: string;
  option_text: string;
  votes: number;
}

interface GetPollResponse {
  id: string;
  question: string;
  options: PollOption[];
}

/**
 * A helper function to handle fetch requests and errors.
 * @param url The URL to fetch.
 * @param options The fetch options.
 * @returns The JSON response.
 * @throws An error if the fetch request fails or the response is not ok.
 */
const fetcher = async <T>(url: string, options?: RequestInit): Promise<T> => {
  try {
    const response = await fetch(url, options);

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({
        error: `HTTP error! Status: ${response.status}`,
      }));
      throw new Error(errorData.error || "An unknown API error occurred.");
    }

    return response.json();
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error("A network error occurred. Please try again.");
  }
};

/**
 * Creates a new poll.
 * Corresponds to: POST /api/create-poll
 */
export const createPoll = (
  body: CreatePollBody
): Promise<CreatePollResponse> => {
  return fetcher<CreatePollResponse>("/api/create-poll", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
};

/**
 * Casts a vote on a poll.
 * Corresponds to: POST /api/vote
 */
export const castVote = (body: VoteBody): Promise<VoteResponse> => {
  return fetcher<VoteResponse>("/api/vote", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
};

/**
 * Fetches the details of a single poll.
 * Corresponds to: GET /api/poll/:id
 */
export const getPoll = (pollId: string): Promise<GetPollResponse> => {
  return fetcher<GetPollResponse>(`/api/poll/${pollId}`);
};
