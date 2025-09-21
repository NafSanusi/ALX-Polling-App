import PollList from "@/components/PollList";

export default function PollsPage() {
  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold mb-6">Polls Dashboard</h1>
      <PollList />
    </main>
  );
}
