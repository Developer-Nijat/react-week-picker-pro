import React, { useState } from "react";
import WeekPicker from "../lib/components/WeekPicker/WeekPicker";
import "./App.css";

function App() {
  const [selectedWeek1, setSelectedWeek1] = useState();
  const [selectedWeek2, setSelectedWeek2] = useState();
  const [selectedWeek3, setSelectedWeek3] = useState();

  const handleWeekSelect1 = (weekStart, weekEnd, weekNumber) => {
    setSelectedWeek1(weekStart);
    console.log("Week selected:", { weekStart, weekEnd, weekNumber });
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

  return (
    <div className="app">
      <header className="app-header">
        <h1>🗓️ React Week Picker Pro</h1>
        <p>A modern, functional React component for selecting weeks</p>
        <div className="badges">
          <span className="badge">⚡ Vite Powered</span>
          <span className="badge">📦 Zero Dependencies</span>
          <span className="badge">🎨 Customizable</span>
          <span className="badge">📱 Mobile Ready</span>
        </div>
      </header>

      <main className="examples">
        <section className="example-section">
          <h2>✨ Live Examples</h2>

          <div className="examples-grid">
            {/* Basic Example */}
            <div className="example-card">
              <h3>🗓️ Basic Week Picker</h3>
              <p>Standard week picker with all default settings</p>
              <WeekPicker
                selectedWeek={selectedWeek1}
                onWeekSelect={handleWeekSelect1}
              />
              {selectedWeek1 && (
                <div className="selected-info">
                  <strong>Selected:</strong> {selectedWeek1.toDateString()}
                </div>
              )}
            </div>

            {/* Date Restrictions */}
            <div className="example-card">
              <h3>🚫 With Date Restrictions</h3>
              <p>Limited to current month with custom format</p>
              <WeekPicker
                selectedWeek={selectedWeek2}
                onWeekSelect={handleWeekSelect2}
                minDate={
                  new Date(new Date().getFullYear(), new Date().getMonth(), 1)
                }
                maxDate={
                  new Date(
                    new Date().getFullYear(),
                    new Date().getMonth() + 1,
                    0
                  )
                }
                dateFormat="dd/MM/yyyy"
              />
            </div>

            {/* Custom Configuration */}
            <div className="example-card">
              <h3>⚙️ Custom Configuration</h3>
              <p>Sunday first, no week numbers, compact format</p>
              <WeekPicker
                selectedWeek={selectedWeek3}
                onWeekSelect={handleWeekSelect3}
                firstDayOfWeek={0}
                showWeekNumbers={false}
                dateFormat="MMM dd"
              />
            </div>

            {/* Controlled Example */}
            <div className="example-card">
              <h3>🎛️ Controlled Component</h3>
              <p>Programmatic control with buttons</p>
              <div className="button-group">
                <button
                  onClick={() => setSelectedWeek1(new Date())}
                  className="btn btn-primary"
                >
                  Select This Week
                </button>
                <button
                  onClick={() => setSelectedWeek1(undefined)}
                  className="btn btn-secondary"
                >
                  Clear
                </button>
              </div>
              <WeekPicker
                selectedWeek={selectedWeek1}
                onWeekSelect={handleWeekSelect1}
                dateFormat="yyyy-MM-dd"
              />
            </div>
          </div>
        </section>

        <section className="code-section">
          <h2>📝 Usage Examples</h2>

          <div className="code-example">
            <h3>Installation</h3>
            <pre>
              <code>{`npm install react-week-picker-pro`}</code>
            </pre>
          </div>

          <div className="code-example">
            <h3>Basic Usage</h3>
            <pre>
              <code>{`import WeekPicker from 'react-week-picker-pro'
import 'react-week-picker-pro/dist/style.css'

function App() {
  const [selectedWeek, setSelectedWeek] = useState()
  
  const handleWeekSelect = (weekStart, weekEnd, weekNumber) => {
    setSelectedWeek(weekStart)
    console.log('Week', weekNumber, 'selected')
  }
  
  return (
    <WeekPicker
      selectedWeek={selectedWeek}
      onWeekSelect={handleWeekSelect}
    />
  )
}`}</code>
            </pre>
          </div>

          <div className="code-example">
            <h3>Advanced Configuration</h3>
            <pre>
              <code>{`<WeekPicker
  firstDayOfWeek={0}          // Sunday first
  dateFormat="dd/MM/yyyy"     // European format
  showWeekNumbers={false}     // Hide week numbers
  minDate={new Date()}        // Future weeks only
  onWeekSelect={handleWeekSelect}
/>`}</code>
            </pre>
          </div>
        </section>

        <section className="features-section">
          <h2>🌟 Features</h2>
          <div className="features-grid">
            <div className="feature">
              <span className="feature-icon">📅</span>
              <h4>Week-Only Selection</h4>
              <p>Select entire weeks, not individual days</p>
            </div>
            <div className="feature">
              <span className="feature-icon">📊</span>
              <h4>ISO Week Numbers</h4>
              <p>Standards-compliant week numbering</p>
            </div>
            <div className="feature">
              <span className="feature-icon">🎨</span>
              <h4>Customizable</h4>
              <p>Flexible styling and configuration</p>
            </div>
            <div className="feature">
              <span className="feature-icon">📱</span>
              <h4>Mobile Ready</h4>
              <p>Responsive design for all devices</p>
            </div>
            <div className="feature">
              <span className="feature-icon">⚡</span>
              <h4>Zero Dependencies</h4>
              <p>Lightweight with no external deps</p>
            </div>
            <div className="feature">
              <span className="feature-icon">♿</span>
              <h4>Accessible</h4>
              <p>WCAG compliant with keyboard support</p>
            </div>
          </div>
        </section>
      </main>

      <footer className="app-footer">
        <p>
          Made with ❤️ by{" "}
          <a
            href="https://github.com/Developer-Nijat"
            target="_blank"
            rel="noopener noreferrer"
          >
            @developer.nijat
          </a>
        </p>
        <p>
          <a
            href="https://github.com/Developer-Nijat/react-week-picker-pro"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </a>
          {" | "}
          <a
            href="https://www.npmjs.com/package/react-week-picker-pro"
            target="_blank"
            rel="noopener noreferrer"
          >
            npm
          </a>
        </p>
      </footer>
    </div>
  );
}

export default App;
