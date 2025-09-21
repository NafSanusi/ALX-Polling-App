import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "./ui/button";

export function PollForm() {
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState(["", ""]);

  const handleOptionChange = (idx: number, value: string) => {
    const newOptions = [...options];
    newOptions[idx] = value;
    setOptions(newOptions);
  };

  const addOption = () => setOptions([...options, ""]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle poll creation logic here
    alert(`Question: ${question}\nOptions: ${options.join(", ")}`);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto">
      <label className="block font-medium mb-1">Poll Question</label>
      <Input
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        placeholder="Enter your poll question"
        required
      />

      <label className="block font-medium mb-1">Options</label>
      {options.map((opt, idx) => (
        <Input
          key={idx}
          value={opt}
          onChange={(e) => handleOptionChange(idx, e.target.value)}
          placeholder={`Option ${idx + 1}`}
          required
          className="mb-2"
        />
      ))}

      <Button type="button" variant="outline" onClick={addOption}>
        Add Option
      </Button>

      <Textarea className="mt-4" placeholder="Optional description" />

      <Button type="submit" className="w-full mt-4">
        Create Poll
      </Button>
    </form>
  );
}

export default PollForm;
