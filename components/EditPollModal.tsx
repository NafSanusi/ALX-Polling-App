"use client";

import { useState, useEffect } from "react";
import { Button } from "./ui/button";

type Poll = {
  id: string;
  question: string;
};

interface EditPollModalProps {
  poll: Poll | null;
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export function EditPollModal({
  poll,
  isOpen,
  onClose,
  onSuccess,
}: EditPollModalProps) {
  const [question, setQuestion] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (poll) {
      setQuestion(poll.question);
    }
  }, [poll]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!poll) return;

    setLoading(true);
    setError(null);

    const response = await fetch("/api/polls/update", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ pollId: poll.id, question }),
    });

    setLoading(false);

    if (response.ok) {
      onSuccess();
      onClose();
    } else {
      const result = await response.json();
      setError(result.error || "Failed to update poll.");
    }
  };

  if (!isOpen || !poll) return null;

  return (
    <div className="fixed inset-0 bg-gray-300 bg-opacity-1 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Edit Poll</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="question"
              className="block text-sm font-medium text-gray-700"
            >
              Poll Question
            </label>
            <input
              id="question"
              type="text"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2"
              required
            />
          </div>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
