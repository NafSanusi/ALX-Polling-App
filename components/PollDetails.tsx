import { useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
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
  const [hasVoted, setHasVoted] = useState(false);

  const handleVote = (idx: number) => {
    if (onVote && !hasVoted) {
      onVote(idx);
      setHasVoted(true);
    }
  };

  return (
    <Card className="max-w-md mx-auto my-8">
      <CardHeader>
        <CardTitle>{question}</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2">
          {options.map((opt, idx) => (
            <li key={idx} className="flex items-center justify-between">
              <span>{opt}</span>
              <span className="text-xs text-gray-500">
                {votes[idx] !== undefined ? `${votes[idx]} votes` : ""}
              </span>
              {onVote && (
                <Button
                  size="sm"
                  className="ml-2"
                  onClick={() => handleVote(idx)}
                  disabled={hasVoted}
                >
                  Vote
                </Button>
              )}
            </li>
          ))}
        </ul>
      </CardContent>
      {onVote && (
        <CardFooter>
          <span className="text-sm text-gray-500">
            {hasVoted ? "You have voted." : "Choose an option to vote"}
          </span>
        </CardFooter>
      )}
    </Card>
  );
}

export default PollDetails;
