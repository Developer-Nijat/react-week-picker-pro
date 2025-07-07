// Main entry point for the npm package - NO CSS import here
import WeekPicker from './components/WeekPicker/WeekPicker';

// Default export for default import
export default WeekPicker;

// Named export for named import
export { WeekPicker };

// Export utility functions for advanced usage
export {
  getISOWeekNumber,
  getWeekStart,
  getWeekEnd,
  formatDate,
  isSameWeek,
  getMonthDays
} from './utils/dateUtils';

// Export version
export const version = '1.0.5';