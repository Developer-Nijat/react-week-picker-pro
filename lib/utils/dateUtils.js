/**
 * Date utility functions for the WeekPicker component
 */

/**
 * Get the ISO week number for a given date
 * @param {Date} date - The date to get week number for
 * @returns {number} ISO week number
 */
export const getISOWeekNumber = (date) => {
  const d = new Date(
    Date.UTC(date.getFullYear(), date.getMonth(), date.getDate())
  );
  const dayNum = d.getUTCDay() || 7;
  d.setUTCDate(d.getUTCDate() + 4 - dayNum);
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  return Math.ceil(((d.getTime() - yearStart.getTime()) / 86400000 + 1) / 7);
};

/**
 * Get the start of the week for a given date
 * @param {Date} date - The date to get week start for
 * @param {number} firstDayOfWeek - 0 for Sunday, 1 for Monday
 * @returns {Date} Start of the week
 */
export const getWeekStart = (date, firstDayOfWeek = 1) => {
  const d = new Date(date);
  const day = d.getDay();
  const diff =
    d.getDate() - day + (firstDayOfWeek === 1 ? (day === 0 ? -6 : 1) : 0);
  return new Date(d.setDate(diff));
};

/**
 * Get the end of the week for a given date
 * @param {Date} date - The date to get week end for
 * @param {number} firstDayOfWeek - 0 for Sunday, 1 for Monday
 * @returns {Date} End of the week
 */
export const getWeekEnd = (date, firstDayOfWeek = 1) => {
  const weekStart = getWeekStart(date, firstDayOfWeek);
  const weekEnd = new Date(weekStart);
  weekEnd.setDate(weekStart.getDate() + 6);
  return weekEnd;
};

/**
 * Format date to string
 * @param {Date} date - Date to format
 * @param {string} format - Format string
 * @returns {string} Formatted date string
 */
export const formatDate = (date, format = "MMM dd, yyyy") => {
  const options = {};

  if (format.includes("MMM")) {
    options.month = "short";
  } else if (format.includes("MM")) {
    options.month = "2-digit";
  }

  if (format.includes("dd")) {
    options.day = "2-digit";
  } else if (format.includes("d")) {
    options.day = "numeric";
  }

  if (format.includes("yyyy")) {
    options.year = "numeric";
  } else if (format.includes("yy")) {
    options.year = "2-digit";
  }

  return new Intl.DateTimeFormat("en-US", options).format(date);
};

/**
 * Check if two dates are in the same week
 * @param {Date} date1 - First date
 * @param {Date} date2 - Second date
 * @param {number} firstDayOfWeek - 0 for Sunday, 1 for Monday
 * @returns {boolean} True if dates are in same week
 */
export const isSameWeek = (date1, date2, firstDayOfWeek = 1) => {
  const week1Start = getWeekStart(date1, firstDayOfWeek);
  const week2Start = getWeekStart(date2, firstDayOfWeek);
  return week1Start.getTime() === week2Start.getTime();
};

/**
 * Get all days in a month with week information
 * @param {number} year - Year
 * @param {number} month - Month (0-11)
 * @param {number} firstDayOfWeek - 0 for Sunday, 1 for Monday
 * @returns {Array} Array of day objects
 */
export const getMonthDays = (year, month, firstDayOfWeek = 1) => {
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const today = new Date();

  const days = [];

  // Add days from previous month to fill the first week
  const firstWeekStart = getWeekStart(firstDay, firstDayOfWeek);
  let currentDate = new Date(firstWeekStart);

  // Generate calendar days
  while (currentDate <= lastDay || currentDate.getDay() !== firstDayOfWeek) {
    const isCurrentMonth = currentDate.getMonth() === month;
    const isToday = currentDate.toDateString() === today.toDateString();
    const weekNumber = getISOWeekNumber(currentDate);

    days.push({
      date: new Date(currentDate),
      isCurrentMonth,
      isToday,
      weekNumber,
      isSelected: false,
    });

    currentDate.setDate(currentDate.getDate() + 1);

    // Break if we've filled complete weeks and passed the last day of month
    if (currentDate > lastDay && currentDate.getDay() === firstDayOfWeek) {
      break;
    }
  }

  return days;
};
