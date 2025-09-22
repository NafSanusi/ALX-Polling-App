"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";
import { EditPollModal } from "./EditPollModal";

type Poll = {
  id: string;
  question: string;
  created_by: string;
  created_at: string;
  poll_options: { count: number }[];
  votes: { count: number }[];
};

interface PollListProps {
  polls: Poll[];
  currentUserId?: string;
}

export default function PollList({ polls, currentUserId }: PollListProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPoll, setSelectedPoll] = useState<Poll | null>(null);
  const router = useRouter();

  const handleDelete = async (pollId: string) => {
    if (confirm("Are you sure you want to delete this poll?")) {
      // Here you would call an API route to delete the poll
      alert(`Deleting poll ${pollId}`);
      const response = await fetch("/api/polls/delete", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ pollId }),
      });

      if (response.ok) {
        // Refresh the page to show the updated list of polls
        router.refresh();
      } else {
        const result = await response.json();
        alert(`Error: ${result.error || "Failed to delete poll."}`);
      }
    }
  };

  const handleEditClick = (poll: any) => {
    setSelectedPoll(poll);
    setIsModalOpen(true);
  };

  if (polls?.length === 0) {
    return <p>No polls found. Create one to get started!</p>;
  }

  console.log(polls, "the polls");
  return (
    <div className="space-y-4">
      {polls?.map((poll) => {
        const pollForModal = { id: poll.id, question: poll.question };
        return (
          <div
            key={poll.id}
            className="p-4 border rounded-lg flex justify-between items-center"
          >
            <div>
              <Link
                href={`/polls/${poll.id}`}
                className="text-lg font-semibold hover:underline"
              >
                {poll.question}
              </Link>
              <p className="text-sm text-gray-500">
                {poll.votes[0]?.count ?? 0} votes
              </p>
            </div>
            {currentUserId === poll.created_by && (
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleEditClick(pollForModal)}
                >
                  Edit
                </Button>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => handleDelete(poll.id)}
                >
                  Delete
                </Button>
              </div>
            )}
          </div>
        );
      })}
      <EditPollModal
        poll={selectedPoll}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={() => router.refresh()}
      />
    </div>
  );
}
