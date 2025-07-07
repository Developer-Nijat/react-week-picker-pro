import React, { useState } from "react";
import { WeekPicker } from "../WeekPicker";

const WeekPickerExamples = () => {
  const [selectedWeek1, setSelectedWeek1] = useState();
  const [selectedWeek2, setSelectedWeek2] = useState();
  const [selectedWeek3, setSelectedWeek3] = useState();
  const [selectedWeek4, setSelectedWeek4] = useState();

  const handleWeekSelect1 = (weekStart, weekEnd, weekNumber) => {
    setSelectedWeek1(weekStart);
    console.log("Selected week:", { weekStart, weekEnd, weekNumber });
  };

  const handleWeekSelect2 = (weekStart, weekEnd, weekNumber) => {
    setSelectedWeek2(weekStart);
    alert(
      `Selected Week ${weekNumber}: ${weekStart.toDateString()} - ${weekEnd.toDateString()}`
    );
  };

  const handleWeekSelect3 = (weekStart, weekEnd, weekNumber) => {
    setSelectedWeek3(weekStart);
  };

  const handleWeekSelect4 = (weekStart, weekEnd, weekNumber) => {
    setSelectedWeek4(weekStart);
  };

  const exampleContainerStyle = {
    padding: "20px",
    maxWidth: "1200px",
    margin: "0 auto",
  };

  const gridStyle = {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(400px, 1fr))",
    gap: "40px",
    marginTop: "30px",
  };

  const selectedInfoStyle = {
    marginTop: "10px",
    padding: "10px",
    background: "#f0f9ff",
    borderRadius: "4px",
  };

  const buttonStyle = {
    marginRight: "10px",
    padding: "8px 16px",
    backgroundColor: "#3b82f6",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  };

  const clearButtonStyle = {
    ...buttonStyle,
    backgroundColor: "#ef4444",
  };

  const codeBlockStyle = {
    background: "#f8f9fa",
    padding: "15px",
    borderRadius: "6px",
    overflow: "auto",
    fontSize: "14px",
    fontFamily: "monospace",
    whiteSpace: "pre-wrap",
  };

  return (
    <div style={exampleContainerStyle}>
      <h1>Week Picker Examples</h1>
      <p>
        A modern, functional React component for selecting weeks with various
        configurations.
      </p>

      <div style={gridStyle}>
        {/* Example 1: Basic Usage */}
        <div>
          <h2>🗓️ Basic Week Picker</h2>
          <p>
            Standard week picker with all default settings. Shows week numbers
            and Monday as first day.
          </p>
          <WeekPicker
            selectedWeek={selectedWeek1}
            onWeekSelect={handleWeekSelect1}
          />
          {selectedWeek1 && (
            <div style={selectedInfoStyle}>
              <strong>Selected:</strong> {selectedWeek1.toDateString()}
            </div>
          )}
        </div>

        {/* Example 2: With Date Restrictions */}
        <div>
          <h2>🚫 With Date Restrictions</h2>
          <p>
            Limited to current month only with custom date format (dd/MM/yyyy).
          </p>
          <WeekPicker
            selectedWeek={selectedWeek2}
            onWeekSelect={handleWeekSelect2}
            minDate={
              new Date(new Date().getFullYear(), new Date().getMonth(), 1)
            }
            maxDate={
              new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0)
            }
            dateFormat="dd/MM/yyyy"
          />
        </div>

        {/* Example 3: Sunday First + No Week Numbers */}
        <div>
          <h2>📅 Sunday First + Compact</h2>
          <p>
            Week starts on Sunday, no week numbers shown, compact date format.
          </p>
          <WeekPicker
            selectedWeek={selectedWeek3}
            onWeekSelect={handleWeekSelect3}
            firstDayOfWeek={0}
            showWeekNumbers={false}
            dateFormat="MMM dd"
          />
        </div>

        {/* Example 4: Controlled Component */}
        <div>
          <h2>🎛️ Controlled Component</h2>
          <p>Externally controlled selection with action buttons.</p>
          <div style={{ marginBottom: "10px" }}>
            <button
              onClick={() => setSelectedWeek1(new Date())}
              style={buttonStyle}
            >
              Select This Week
            </button>
            <button
              onClick={() => setSelectedWeek1(undefined)}
              style={clearButtonStyle}
            >
              Clear Selection
            </button>
          </div>
          <WeekPicker
            selectedWeek={selectedWeek1}
            onWeekSelect={handleWeekSelect1}
            dateFormat="yyyy-MM-dd"
          />
        </div>

        {/* Example 5: Future Weeks Only */}
        <div>
          <h2>⏭️ Future Weeks Only</h2>
          <p>Only allows selection of current and future weeks.</p>
          <WeekPicker
            selectedWeek={selectedWeek4}
            onWeekSelect={handleWeekSelect4}
            minDate={new Date()}
          />
        </div>

        {/* Example 6: Past Month Only */}
        <div>
          <h2>⏮️ Past Month Only</h2>
          <p>Only allows selection from the previous month.</p>
          <WeekPicker
            onWeekSelect={(start, end, num) => {
              console.log(`Past week ${num} selected:`, start, end);
            }}
            minDate={
              new Date(new Date().getFullYear(), new Date().getMonth() - 1, 1)
            }
            maxDate={
              new Date(new Date().getFullYear(), new Date().getMonth(), 0)
            }
            dateFormat="dd MMM"
          />
        </div>
      </div>

      {/* Usage Code Examples */}
      <div style={{ marginTop: "50px" }}>
        <h2>📝 Code Examples</h2>

        <h3>Basic Usage</h3>
        <pre style={codeBlockStyle}>
          {`import { WeekPicker } from './components/WeekPicker';

const MyComponent = () => {
  const [selectedWeek, setSelectedWeek] = useState();

  const handleWeekSelect = (weekStart, weekEnd, weekNumber) => {
    setSelectedWeek(weekStart);
    console.log('Selected Week:', weekNumber);
    console.log('Range:', weekStart, 'to', weekEnd);
  };

  return (
    <WeekPicker
      selectedWeek={selectedWeek}
      onWeekSelect={handleWeekSelect}
    />
  );
};`}
        </pre>

        <h3>With Date Restrictions</h3>
        <pre style={codeBlockStyle}>
          {`// Only allow selection from current month
const currentMonth = new Date().getMonth();
const currentYear = new Date().getFullYear();

<WeekPicker
  minDate={new Date(currentYear, currentMonth, 1)}
  maxDate={new Date(currentYear, currentMonth + 1, 0)}
  onWeekSelect={(start, end, weekNum) => {
    console.log('Week', weekNum, 'selected');
  }}
/>`}
        </pre>

        <h3>Sunday First Day + Custom Format</h3>
        <pre style={codeBlockStyle}>
          {`<WeekPicker
  firstDayOfWeek={0}  // Sunday first
  dateFormat="dd/MM/yyyy"
  showWeekNumbers={false}
  onWeekSelect={(start, end, weekNum) => {
    // Handle selection
  }}
/>`}
        </pre>

        <h3>Controlled Component</h3>
        <pre style={codeBlockStyle}>
          {`const [selectedWeek, setSelectedWeek] = useState();

// Programmatically select current week
const selectCurrentWeek = () => {
  setSelectedWeek(new Date());
};

// Clear selection
const clearSelection = () => {
  setSelectedWeek(undefined);
};

<WeekPicker
  selectedWeek={selectedWeek}
  onWeekSelect={(start) => setSelectedWeek(start)}
/>`}
        </pre>
      </div>

      {/* Features List */}
      <div style={{ marginTop: "40px" }}>
        <h2>✨ Features</h2>
        <ul style={{ lineHeight: "1.6", fontSize: "16px" }}>
          <li>
            <strong>Week-only selection:</strong> Users can only select entire
            weeks, not individual days
          </li>
          <li>
            <strong>ISO Week numbers:</strong> Shows standardized week numbers
            for easy reference
          </li>
          <li>
            <strong>Selected week range:</strong> Displays start and end dates
            of selected week
          </li>
          <li>
            <strong>Date restrictions:</strong> Optional min/max date limits
          </li>
          <li>
            <strong>Flexible first day:</strong> Choose Sunday or Monday as week
            start
          </li>
          <li>
            <strong>Custom date formats:</strong> Configurable date display
            format
          </li>
          <li>
            <strong>Modern UI:</strong> Clean, responsive design with hover
            effects
          </li>
          <li>
            <strong>Keyboard accessible:</strong> Proper ARIA labels and
            keyboard navigation
          </li>
          <li>
            <strong>Mobile friendly:</strong> Responsive design for all screen
            sizes
          </li>
          <li>
            <strong>No dependencies:</strong> Pure React with native Date
            handling
          </li>
        </ul>
      </div>

      {/* Props Documentation */}
      <div style={{ marginTop: "40px" }}>
        <h2>⚙️ Props</h2>
        <div style={codeBlockStyle}>
          {`WeekPicker.propTypes = {
  selectedWeek: PropTypes.instanceOf(Date),    // Currently selected week
  onWeekSelect: PropTypes.func,                // Callback: (weekStart, weekEnd, weekNumber) => {}
  minDate: PropTypes.instanceOf(Date),         // Minimum selectable date
  maxDate: PropTypes.instanceOf(Date),         // Maximum selectable date
  className: PropTypes.string,                 // Additional CSS class
  dateFormat: PropTypes.string,                // Date format string (default: 'MMM dd, yyyy')
  showWeekNumbers: PropTypes.bool,             // Show week numbers (default: true)
  firstDayOfWeek: PropTypes.oneOf([0, 1]),     // 0=Sunday, 1=Monday (default: 1)
};`}
        </div>
      </div>
    </div>
  );
};

export default WeekPickerExamples;
