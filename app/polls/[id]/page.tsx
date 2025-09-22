"use client";

import { use } from "react";
import PollDetails from "@/components/PollDetails";

// Dummy data for demonstration
const polls = [
  {
    id: "1",
    question: "What's your favorite color?",
    options: ["Red", "Blue", "Green"],
    votes: [5, 3, 2],
  },
  {
    id: "2",
    question: "Which programming language do you prefer?",
    options: ["JavaScript", "Python", "Go"],
    votes: [7, 4, 1],
  },
  {
    id: "3",
    question: "Do you like remote work?",
    options: ["Yes", "No"],
    votes: [8, 2],
  },
];

export default function PollDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = use(params);
  const poll = polls.find((p) => p.id === resolvedParams.id);

  if (!poll) {
    return (
      <main className="p-8">
        <h1 className="text-2xl font-bold mb-6">Poll Not Found</h1>
      </main>
    );
  }

  const handleVote = (optionIndex: number) => {
    alert(`You voted for: ${poll.options[optionIndex]}`);
    // Implement vote logic here
  };

  return (
    <main className="p-8">
      <PollDetails
        question={poll.question}
        options={poll.options}
        votes={poll.votes}
        onVote={handleVote}
      />
    </main>
  );
}
