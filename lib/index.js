// Main entry point for the npm package
export { default as WeekPicker } from "./components/WeekPicker/WeekPicker";

// Export utility functions for advanced usage
export {
  getISOWeekNumber,
  getWeekStart,
  getWeekEnd,
  formatDate,
  isSameWeek,
  getMonthDays,
} from "./utils/dateUtils";

// Export version
export const version = "1.0.0";
