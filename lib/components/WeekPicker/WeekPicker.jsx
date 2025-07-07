import { useState, useMemo } from "react";
import {
  getISOWeekNumber,
  getWeekStart,
  getWeekEnd,
  formatDate,
  isSameWeek,
  getMonthDays,
} from "../../utils/dateUtils";

const WeekPicker = ({
  selectedWeek,
  onWeekSelect,
  minDate,
  maxDate,
  className = "",
  dateFormat = "MMM dd, yyyy",
  showWeekNumbers = true,
  firstDayOfWeek = 1,
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
    <div className={`week-picker ${className}`}>
      {/* Header */}
      <div className="week-picker__header">
        <button
          className="week-picker__nav-button"
          onClick={goToPreviousMonth}
          disabled={isPreviousDisabled}
          aria-label="Previous month"
        >
          ‹
        </button>

        <h2 className="week-picker__month-year">
          {monthNames[currentMonth]} {currentYear}
        </h2>

        <button
          className="week-picker__nav-button"
          onClick={goToNextMonth}
          disabled={isNextDisabled}
          aria-label="Next month"
        >
          ›
        </button>
      </div>

      {/* Selected week info */}
      {selectedWeekInfo && (
        <div className="week-picker__selected-week-info">
          <p className="week-picker__selected-week-text">
            Week {selectedWeekInfo.weekNumber}: {selectedWeekInfo.start} -{" "}
            {selectedWeekInfo.end}
          </p>
        </div>
      )}

      {/* Calendar */}
      <div className="week-picker__calendar">
        {/* Week day headers */}
        <div className="week-picker__week-day-headers">
          {showWeekNumbers && (
            <div className="week-picker__week-number-header">Wk</div>
          )}
          <div className="week-picker__week-day-headers-container">
            {weekDayHeaders.map((day) => (
              <div key={day} className="week-picker__week-day-header">
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

          const weekRowClasses = [
            "week-picker__week-row",
            isSelected ? "week-picker__week-row--selected" : "",
            !isSelectable ? "week-picker__week-row--disabled" : "",
          ]
            .filter(Boolean)
            .join(" ");

          return (
            <div
              key={weekIndex}
              className={weekRowClasses}
              onClick={() => isSelectable && handleWeekSelect(weekStart)}
              style={{
                cursor: isSelectable ? "pointer" : "not-allowed",
              }}
            >
              {showWeekNumbers && (
                <div className="week-picker__week-number">{weekNumber}</div>
              )}

              <div className="week-picker__days-container">
                {week.map((day, dayIndex) => {
                  const dayClasses = [
                    "week-picker__day",
                    day.isCurrentMonth
                      ? "week-picker__day--current-month"
                      : "week-picker__day--other-month",
                    day.isToday ? "week-picker__day--today" : "",
                  ]
                    .filter(Boolean)
                    .join(" ");

                  return (
                    <div key={dayIndex} className={dayClasses}>
                      {day.date.getDate()}
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default WeekPicker;
