"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

type PollDetailsProps = {
  question: string;
  options: string[];
  votes?: number[];
  onVote?: (optionIndex: number) => void;
};
export function PollDetails({
  question,
  options,
  votes = [],
  onVote,
}: PollDetailsProps) {
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [hasVoted, setHasVoted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onVote && selectedOption !== null) {
      onVote(selectedOption);
      setHasVoted(true);
    }
  };

  const totalVotes = votes.reduce((sum, current) => sum + current, 0);

  return (
    <Card>
      <CardHeader>
        <CardTitle>{question}</CardTitle>
      </CardHeader>
      <CardContent>
        {hasVoted ? (
          <div>
            <h3 className="text-lg font-semibold mb-2">
              Thank you for voting!
            </h3>
            <p className="text-sm text-gray-600 mb-4">
              Here are the results so far:
            </p>
            <ul className="space-y-2">
              {options.map((opt, idx) => (
                <li key={idx} className="flex justify-between items-center">
                  <span>{opt}</span>
                  <span className="font-semibold">
                    {votes[idx] ?? 0} votes (
                    {totalVotes > 0
                      ? Math.round(((votes[idx] ?? 0) / totalVotes) * 100)
                      : 0}
                    %)
                  </span>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <fieldset className="space-y-2">
              {options.map((opt, idx) => (
                <label
                  key={idx}
                  className="flex items-center p-3 border rounded-md cursor-pointer has-[:checked]:bg-gray-100"
                >
                  <input
                    type="radio"
                    name="poll-option"
                    value={idx}
                    onChange={() => setSelectedOption(idx)}
                    className="mr-2"
                  />
                  {opt}
                </label>
              ))}
            </fieldset>
            <Button
              type="submit"
              className="w-full mt-4"
              disabled={selectedOption === null}
            >
              Submit Vote
            </Button>
          </form>
        )}
      </CardContent>
    </Card>
  );
}

export default PollDetails;
