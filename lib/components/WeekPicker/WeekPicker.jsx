import React, { useState, useMemo } from "react";
import PropTypes from "prop-types";
import {
  getISOWeekNumber,
  getWeekStart,
  getWeekEnd,
  formatDate,
  isSameWeek,
  getMonthDays,
} from "../../utils/dateUtils";
import styles from "./WeekPicker.module.css";

const WeekPicker = ({
  selectedWeek,
  onWeekSelect,
  minDate,
  maxDate,
  className,
  dateFormat,
  showWeekNumbers,
  firstDayOfWeek,
}) => {
  const [currentDate, setCurrentDate] = useState(selectedWeek || new Date());
  const [selectedWeekStart, setSelectedWeekStart] = useState(
    selectedWeek ? getWeekStart(selectedWeek, firstDayOfWeek) : null
  );

  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();

  // Get weekday headers
  const weekDayHeaders = useMemo(() => {
    const headers = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    if (firstDayOfWeek === 1) {
      return [...headers.slice(1), headers[0]]; // Move Sunday to end
    }
    return headers;
  }, [firstDayOfWeek]);

  // Get calendar days grouped by weeks
  const calendarWeeks = useMemo(() => {
    const days = getMonthDays(currentYear, currentMonth, firstDayOfWeek);
    const weeks = [];

    for (let i = 0; i < days.length; i += 7) {
      const week = days.slice(i, i + 7);
      weeks.push(week);
    }

    return weeks;
  }, [currentYear, currentMonth, firstDayOfWeek]);

  // Handle week selection
  const handleWeekSelect = (weekStart) => {
    const weekEnd = getWeekEnd(weekStart, firstDayOfWeek);
    const weekNumber = getISOWeekNumber(weekStart);

    // Check if week is within allowed range
    if (minDate && weekEnd < minDate) return;
    if (maxDate && weekStart > maxDate) return;

    setSelectedWeekStart(weekStart);

    if (onWeekSelect) {
      onWeekSelect(weekStart, weekEnd, weekNumber);
    }
  };

  // Navigation functions
  const goToPreviousMonth = () => {
    setCurrentDate(new Date(currentYear, currentMonth - 1, 1));
  };

  const goToNextMonth = () => {
    setCurrentDate(new Date(currentYear, currentMonth + 1, 1));
  };

  // Check if navigation should be disabled
  const isPreviousDisabled = useMemo(() => {
    if (!minDate) return false;
    const firstOfCurrentMonth = new Date(currentYear, currentMonth, 1);
    return firstOfCurrentMonth <= minDate;
  }, [minDate, currentYear, currentMonth]);

  const isNextDisabled = useMemo(() => {
    if (!maxDate) return false;
    const lastOfCurrentMonth = new Date(currentYear, currentMonth + 1, 0);
    return lastOfCurrentMonth >= maxDate;
  }, [maxDate, currentYear, currentMonth]);

  // Format selected week info
  const selectedWeekInfo = useMemo(() => {
    if (!selectedWeekStart) return null;

    const weekEnd = getWeekEnd(selectedWeekStart, firstDayOfWeek);
    const weekNumber = getISOWeekNumber(selectedWeekStart);

    return {
      start: formatDate(selectedWeekStart, dateFormat),
      end: formatDate(weekEnd, dateFormat),
      weekNumber,
    };
  }, [selectedWeekStart, dateFormat, firstDayOfWeek]);

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  return (
    <div className={`${styles.weekPicker} ${className}`}>
      {/* Header */}
      <div className={styles.header}>
        <button
          className={styles.navButton}
          onClick={goToPreviousMonth}
          disabled={isPreviousDisabled}
          aria-label="Previous month"
        >
          ‹
        </button>

        <h2 className={styles.monthYear}>
          {monthNames[currentMonth]} {currentYear}
        </h2>

        <button
          className={styles.navButton}
          onClick={goToNextMonth}
          disabled={isNextDisabled}
          aria-label="Next month"
        >
          ›
        </button>
      </div>

      {/* Selected week info */}
      {selectedWeekInfo && (
        <div className={styles.selectedWeekInfo}>
          <p className={styles.selectedWeekText}>
            Week {selectedWeekInfo.weekNumber}: {selectedWeekInfo.start} -{" "}
            {selectedWeekInfo.end}
          </p>
        </div>
      )}

      {/* Calendar */}
      <div className={styles.calendar}>
        {/* Week day headers */}
        <div className={styles.weekDayHeaders}>
          {showWeekNumbers && <div className={styles.weekNumberHeader}>Wk</div>}
          <div className={styles.weekDayHeadersContainer}>
            {weekDayHeaders.map((day) => (
              <div key={day} className={styles.weekDayHeader}>
                {day}
              </div>
            ))}
          </div>
        </div>

        {/* Calendar weeks */}
        {calendarWeeks.map((week, weekIndex) => {
          const weekStart = getWeekStart(week[0].date, firstDayOfWeek);
          const isSelected =
            selectedWeekStart &&
            isSameWeek(weekStart, selectedWeekStart, firstDayOfWeek);
          const weekNumber = getISOWeekNumber(weekStart);

          // Check if week is selectable
          const weekEnd = getWeekEnd(weekStart, firstDayOfWeek);
          const isSelectable = !(
            (minDate && weekEnd < minDate) ||
            (maxDate && weekStart > maxDate)
          );

          return (
            <div
              key={weekIndex}
              className={`${styles.weekRow} ${isSelected ? styles.selected : ""} ${!isSelectable ? styles.disabled : ""}`}
              onClick={() => isSelectable && handleWeekSelect(weekStart)}
              style={{
                cursor: isSelectable ? "pointer" : "not-allowed",
              }}
            >
              {showWeekNumbers && (
                <div className={styles.weekNumber}>{weekNumber}</div>
              )}

              <div className={styles.daysContainer}>
                {week.map((day, dayIndex) => (
                  <div
                    key={dayIndex}
                    className={`${styles.day} ${
                      day.isCurrentMonth
                        ? styles.currentMonth
                        : styles.otherMonth
                    } ${day.isToday ? styles.today : ""}`}
                  >
                    {day.date.getDate()}
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

WeekPicker.propTypes = {
  /** Currently selected week */
  selectedWeek: PropTypes.instanceOf(Date),
  /** Callback function when a week is selected */
  onWeekSelect: PropTypes.func,
  /** Minimum selectable date */
  minDate: PropTypes.instanceOf(Date),
  /** Maximum selectable date */
  maxDate: PropTypes.instanceOf(Date),
  /** Additional CSS class name */
  className: PropTypes.string,
  /** Date format string for display */
  dateFormat: PropTypes.string,
  /** Whether to show week numbers */
  showWeekNumbers: PropTypes.bool,
  /** First day of week: 0 = Sunday, 1 = Monday */
  firstDayOfWeek: PropTypes.oneOf([0, 1]),
};

WeekPicker.defaultProps = {
  selectedWeek: undefined,
  onWeekSelect: undefined,
  minDate: undefined,
  maxDate: undefined,
  className: "",
  dateFormat: "MMM dd, yyyy",
  showWeekNumbers: true,
  firstDayOfWeek: 1,
};

export default WeekPicker;
