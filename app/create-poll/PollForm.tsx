"use client";

import { useState } from "react";
import { createPoll } from "../api/create-poll/route";

export function PollForm() {
  const [options, setOptions] = useState(["", ""]); // Start with two empty options
  const [error, setError] = useState<string | null>(null);

  const handleAddOption = () => {
    setOptions([...options, ""]);
  };

  const handleOptionChange = (index: number, value: string) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const handleSubmit = async (formData: FormData) => {
    const result = await createPoll(formData);
    if (result?.error) {
      setError(result.error);
    }
  };

  return (
    <form action={handleSubmit} className="space-y-4">
      <div>
        <label
          htmlFor="question"
          className="block text-sm font-medium text-gray-700"
        >
          Poll Question
        </label>
        <input
          type="text"
          name="question"
          id="question"
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Options
        </label>
        <div className="space-y-2 mt-1">
          {options.map((option, index) => (
            <input
              key={index}
              type="text"
              name="option"
              value={option}
              onChange={(e) => handleOptionChange(index, e.target.value)}
              placeholder={`Option ${index + 1}`}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2"
            />
          ))}
        </div>
        <button
          type="button"
          onClick={handleAddOption}
          className="mt-2 text-sm text-indigo-600 hover:text-indigo-800"
        >
          + Add Option
        </button>
      </div>

      {error && <p className="text-red-500">{error}</p>}

      <button
        type="submit"
        className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
      >
        Create Poll
      </button>
    </form>
  );
}
