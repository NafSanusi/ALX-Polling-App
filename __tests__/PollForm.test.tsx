import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { PollForm } from "@/app/create-poll/PollForm";

// Mock the router
jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}));

describe("PollForm Component", () => {
  it("should display an error if the question is empty", async () => {
    render(<PollForm />);

    // Fill in options but not the question
    const optionInputs = screen.getAllByPlaceholderText(/Option/);
    fireEvent.change(optionInputs[0], { target: { value: "Option 1" } });
    fireEvent.change(optionInputs[1], { target: { value: "Option 2" } });

    // Submit the form
    fireEvent.click(screen.getByText("Create Poll"));

    // Wait for and assert that the error message appears
    const errorMessage = await screen.findByText("Question cannot be empty.");
    expect(errorMessage).toBeInTheDocument();
  });

  it("should display an error if less than two options are provided", async () => {
    render(<PollForm />);

    // Fill in the question but only one option
    const questionInput = screen.getByPlaceholderText("Enter your question");
    fireEvent.change(questionInput, {
      target: { value: "What is your favorite color?" },
    });
    const optionInputs = screen.getAllByPlaceholderText(/Option/);
    fireEvent.change(optionInputs[0], { target: { value: "Red" } });

    // Submit the form
    fireEvent.click(screen.getByText("Create Poll"));

    // Wait for and assert that the error message appears
    const errorMessage = await screen.findByText(
      "At least two options are required."
    );
    expect(errorMessage).toBeInTheDocument();
  });
});
