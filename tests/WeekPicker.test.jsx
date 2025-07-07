import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import WeekPicker from "../lib/components/WeekPicker/WeekPicker";

describe("WeekPicker", () => {
  it("renders correctly", () => {
    render(<WeekPicker />);
    expect(screen.getByRole("heading")).toBeInTheDocument();
  });

  it("calls onWeekSelect when a week is clicked", () => {
    const mockOnWeekSelect = vi.fn();
    render(<WeekPicker onWeekSelect={mockOnWeekSelect} />);

    const weekRows = screen.getAllByRole("button");
    if (weekRows.length > 0) {
      fireEvent.click(weekRows[0]);
      expect(mockOnWeekSelect).toHaveBeenCalled();
    }
  });

  it("shows week numbers by default", () => {
    render(<WeekPicker />);
    expect(screen.getByText("Wk")).toBeInTheDocument();
  });

  it("hides week numbers when showWeekNumbers is false", () => {
    render(<WeekPicker showWeekNumbers={false} />);
    expect(screen.queryByText("Wk")).not.toBeInTheDocument();
  });
});
