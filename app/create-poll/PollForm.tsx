"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export function PollForm() {
  const [options, setOptions] = useState(["", ""]); // Start with two empty options
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errors, setErrors] = useState<{
    question?: string;
    options?: (string | undefined)[];
    general?: string;
  }>({});
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleAddOption = () => {
    setOptions([...options, ""]);
  };

  const handleOptionChange = (index: number, value: string) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const handleRemoveOption = (index: number) => {
    const newOptions = options.filter((_, i) => i !== index);
    setOptions(newOptions);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrors({});
    setSuccessMessage(null);

    const formData = new FormData(e.currentTarget);
    const question = formData.get("question") as string;
    const rawOptions = formData.getAll("option") as string[];

    // --- Validation Logic ---
    const newErrors: {
      question?: string;
      options?: (string | undefined)[];
    } = {};
    if (!question.trim()) {
      newErrors.question = "Question cannot be empty.";
    }

    const optionErrors = rawOptions.map((opt) =>
      !opt.trim() ? "Option cannot be empty." : undefined
    );

    if (optionErrors.some((e) => e)) {
      newErrors.options = optionErrors;
    }

    if (rawOptions.filter((opt) => opt.trim()).length < 2) {
      if (!newErrors.options) newErrors.options = [];
      newErrors.options[1] =
        newErrors.options[1] || "At least two options are required.";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    // --- End Validation ---

    setLoading(true);
    const response = await fetch("/api/create-poll", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ question, options: rawOptions }),
    });

    const result = await response.json();
    setLoading(false);

    if (!response.ok) {
      setErrors({ general: result.error || "Failed to create poll." });
    } else {
      setSuccessMessage("Poll created successfully! Redirecting...");
      setTimeout(() => {
        router.push("/polls");
      }, 1500);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 max-w-[400px] mx-auto border border-gray-200 rounded-md p-4"
    >
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
          placeholder="Enter your question"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2"
        />
        {errors.question && (
          <p className="text-red-500 text-sm mt-1">{errors.question}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Options
        </label>
        <div className="space-y-2 mt-1">
          {options.map((option, index) => (
            <div key={index} className="flex items-center gap-2">
              <input
                type="text"
                name="option"
                value={option}
                onChange={(e) => handleOptionChange(index, e.target.value)}
                placeholder={`Option ${index + 1}`}
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2"
              />
              {options.length > 2 ? (
                <button
                  type="button"
                  onClick={() => handleRemoveOption(index)}
                  className="px-2 py-1 bg-red-500 text-sm text-white rounded-md hover:bg-red-600 cursor-pointer"
                >
                  Remove
                </button>
              ) : null}
            </div>
          ))}
        </div>
        <button
          type="button"
          onClick={handleAddOption}
          className="mt-2 cursor-pointer text-sm text-indigo-600 hover:text-indigo-800"
        >
          + Add Option
        </button>
      </div>

      {errors.general && (
        <p className="text-red-500 text-sm">{errors.general}</p>
      )}

      {successMessage && <p className="text-green-600">{successMessage}</p>}

      <button
        type="submit"
        className={`w-full px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 ${
          loading ? "cursor-not-allowed opacity-70" : "cursor-pointer"
        }`}
        disabled={loading}
      >
        {loading ? "Creating..." : "Create Poll"}
      </button>
    </form>
  );
}
