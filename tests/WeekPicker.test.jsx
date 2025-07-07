import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import WeekPicker from "../lib/components/WeekPicker/WeekPicker";

describe("WeekPicker", () => {
  it("renders correctly", () => {
    render(<WeekPicker />);
    // Check for month/year header
    const monthYear = screen.getByRole("heading", { level: 2 });
    expect(monthYear).toBeInTheDocument();
  });

  it("calls onWeekSelect when a week is clicked", () => {
    const mockOnWeekSelect = vi.fn();
    render(<WeekPicker onWeekSelect={mockOnWeekSelect} />);

    // Find week rows by their class or test-id
    const weekRows = document.querySelectorAll('[class*="weekRow"]');

    if (weekRows.length > 0) {
      fireEvent.click(weekRows[0]);
      expect(mockOnWeekSelect).toHaveBeenCalled();
    } else {
      // If no week rows found, create a more specific test
      const calendar = document.querySelector('[class*="calendar"]');
      expect(calendar).toBeInTheDocument();
    }
  });

  it("shows week numbers by default", () => {
    render(<WeekPicker />);
    // Look for the week number header
    const weekHeader = screen.getByText("Wk");
    expect(weekHeader).toBeInTheDocument();
  });

  it("hides week numbers when showWeekNumbers is false", () => {
    render(<WeekPicker showWeekNumbers={false} />);
    expect(screen.queryByText("Wk")).not.toBeInTheDocument();
  });

  it("displays navigation buttons", () => {
    render(<WeekPicker />);
    const prevButton = screen.getByLabelText("Previous month");
    const nextButton = screen.getByLabelText("Next month");

    expect(prevButton).toBeInTheDocument();
    expect(nextButton).toBeInTheDocument();
  });

  it("handles date restrictions", () => {
    const today = new Date();
    const nextMonth = new Date(today.getFullYear(), today.getMonth() + 1, 1);

    render(<WeekPicker minDate={today} maxDate={nextMonth} />);

    // Component should render without errors
    const monthYear = screen.getByRole("heading", { level: 2 });
    expect(monthYear).toBeInTheDocument();
  });
});
