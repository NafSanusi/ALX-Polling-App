import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import Link from "next/link";

// Dummy data for demonstration
const polls = [
  { id: 1, question: "What's your favorite color?" },
  { id: 2, question: "Which programming language do you prefer?" },
  { id: 3, question: "Do you like remote work?" },
];

export function PollList() {
  return (
    <div className="space-y-4">
      {polls.map((poll) => (
        <Link key={poll.id} href={`/polls/${poll.id}`}>
          <Card className="cursor-pointer hover:shadow-lg transition">
            <CardHeader>
              <CardTitle>{poll.question}</CardTitle>
            </CardHeader>
            <CardContent>
              <span className="text-sm text-gray-500">View & Vote</span>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  );
}

export default PollList;
