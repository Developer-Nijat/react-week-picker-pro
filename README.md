# React Week Picker Pro 📅

[![npm version](https://badge.fury.io/js/react-week-picker-pro.svg)](https://badge.fury.io/js/react-week-picker-pro)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Bundle Size](https://img.shields.io/bundlephobia/minzip/react-week-picker-pro)](https://bundlephobia.com/package/react-week-picker-pro)
[![Downloads](https://img.shields.io/npm/dm/react-week-picker-pro.svg)](https://npmjs.com/package/react-week-picker-pro)

> A modern, lightweight React component for selecting weeks with comprehensive features and zero dependencies.

## ✨ Features

- 🗓️ **Week-only selection** - Select entire weeks, not individual days
- 📊 **ISO Week numbers** - Standards-compliant week numbering system
- 📅 **Date range display** - Shows selected week's start and end dates
- 🚫 **Date restrictions** - Min/max date constraints support
- 🌍 **Flexible configuration** - Sunday or Monday week start
- 🎨 **Custom formatting** - Configurable date display formats
- 📱 **Mobile responsive** - Perfect on all screen sizes
- ♿ **Accessible** - WCAG compliant with keyboard navigation
- 🎯 **Lightweight** - Under 6KB gzipped
- 📦 **Tree-shakeable** - Import only what you need
- 💪 **TypeScript ready** - Full type definitions included
- ⚡ **Vite powered** - Modern build system
- 🎨 **Customizable styling** - Easy to theme and customize

## 🚀 Installation

```bash
npm install react-week-picker-pro prop-types
```

Or with yarn:

```bash
yarn add react-week-picker-pro prop-types
```

**Note**: `prop-types` is a peer dependency.

## 📖 Quick Start

```jsx
import React, { useState } from 'react';
import WeekPicker from 'react-week-picker-pro';
import 'react-week-picker-pro/dist/style.css';

function App() {
  const [selectedWeek, setSelectedWeek] = useState();

  const handleWeekSelect = (weekStart, weekEnd, weekNumber) => {
    setSelectedWeek(weekStart);
    console.log(`Selected Week ${weekNumber}: ${weekStart.toDateString()} - ${weekEnd.toDateString()}`);
  };

  return (
    <div>
      <h1>Select a Week</h1>
      <WeekPicker
        selectedWeek={selectedWeek}
        onWeekSelect={handleWeekSelect}
      />
    </div>
  );
}

export default App;
```

## 🎯 Live Demo

Check out the [interactive demo](https://github.com/Developer-Nijat/react-week-picker-pro) to see all features in action!

## 📋 API Reference

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `selectedWeek` | `Date` | `undefined` | Currently selected week |
| `onWeekSelect` | `function` | `undefined` | Callback when a week is selected |
| `minDate` | `Date` | `undefined` | Minimum selectable date |
| `maxDate` | `Date` | `undefined` | Maximum selectable date |
| `className` | `string` | `''` | Additional CSS class name |
| `dateFormat` | `string` | `'MMM dd, yyyy'` | Date format for display |
| `showWeekNumbers` | `boolean` | `true` | Whether to show week numbers |
| `firstDayOfWeek` | `0 \| 1` | `1` | First day of week (0=Sunday, 1=Monday) |

### Callback Parameters

The `onWeekSelect` callback receives three parameters:

```jsx
const handleWeekSelect = (weekStart, weekEnd, weekNumber) => {
  // weekStart: Date - Start of the selected week
  // weekEnd: Date - End of the selected week  
  // weekNumber: number - ISO week number
};
```

## 🎨 Examples

### Basic Usage

```jsx
import WeekPicker from 'react-week-picker-pro';
import 'react-week-picker-pro/dist/style.css';

<WeekPicker
  selectedWeek={selectedWeek}
  onWeekSelect={handleWeekSelect}
/>
```

### With Date Restrictions

```jsx
<WeekPicker
  selectedWeek={selectedWeek}
  onWeekSelect={handleWeekSelect}
  minDate={new Date(2024, 0, 1)} // From Jan 1, 2024
  maxDate={new Date(2024, 11, 31)} // Until Dec 31, 2024
/>
```

### Custom Date Format

```jsx
<WeekPicker
  selectedWeek={selectedWeek}
  onWeekSelect={handleWeekSelect}
  dateFormat="yyyy-MM-dd" // ISO format
/>
```

### Sunday First Week

```jsx
<WeekPicker
  selectedWeek={selectedWeek}
  onWeekSelect={handleWeekSelect}
  firstDayOfWeek={0} // Sunday first
/>
```

### Without Week Numbers

```jsx
<WeekPicker
  selectedWeek={selectedWeek}
  onWeekSelect={handleWeekSelect}
  showWeekNumbers={false}
/>
```

### Controlled Component

```jsx
const [selectedWeek, setSelectedWeek] = useState();

const selectCurrentWeek = () => {
  setSelectedWeek(new Date());
};

const clearSelection = () => {
  setSelectedWeek(undefined);
};

return (
  <div>
    <button onClick={selectCurrentWeek}>Select This Week</button>
    <button onClick={clearSelection}>Clear</button>
    <WeekPicker
      selectedWeek={selectedWeek}
      onWeekSelect={(start) => setSelectedWeek(start)}
    />
  </div>
);
```

## 🛠️ Utility Functions

The library also exports useful utility functions:

```jsx
import { 
  getISOWeekNumber, 
  getWeekStart, 
  getWeekEnd,
  formatDate,
  isSameWeek 
} from 'react-week-picker-pro';

// Get ISO week number for any date
const weekNum = getISOWeekNumber(new Date()); // e.g., 27

// Get week boundaries
const weekStart = getWeekStart(new Date(), 1); // Monday first
const weekEnd = getWeekEnd(new Date(), 1);

// Format dates
const formatted = formatDate(new Date(), 'yyyy-MM-dd'); // "2025-07-07"

// Compare weeks
const sameWeek = isSameWeek(date1, date2, 1); // boolean
```

## 🎨 Styling & Customization

### CSS Classes

The component uses BEM-style CSS classes for easy customization:

```css
.week-picker { /* Main container */ }
.week-picker__header { /* Month/year header */ }
.week-picker__nav-button { /* Navigation buttons */ }
.week-picker__calendar { /* Calendar grid */ }
.week-picker__week-row { /* Week rows */ }
.week-picker__week-row--selected { /* Selected week */ }
.week-picker__day { /* Individual days */ }
.week-picker__day--today { /* Today highlight */ }
```

### Custom Styling Example

```css
/* Custom theme */
.week-picker {
  --primary-color: #3b82f6;
  --selected-bg: #dbeafe;
  --hover-bg: #f9fafb;
}

.week-picker__week-row--selected {
  background: var(--selected-bg);
  border-color: var(--primary-color);
}

.week-picker__nav-button:hover {
  background: var(--hover-bg);
}
```

### Dark Mode Support

The component includes built-in dark mode support via CSS media queries:

```css
@media (prefers-color-scheme: dark) {
  .week-picker {
    background: #1f2937;
    color: #f9fafb;
  }
}
```

## 📱 Responsive Design

The component is fully responsive and adapts to different screen sizes:

- **Desktop**: Full-featured layout with hover effects
- **Tablet**: Optimized spacing and touch targets
- **Mobile**: Compact layout with larger touch areas

## ♿ Accessibility

- **Keyboard Navigation**: Full keyboard support
- **Screen Readers**: ARIA labels and semantic HTML
- **Focus Management**: Clear focus indicators
- **WCAG Compliance**: Meets accessibility standards

### Keyboard Shortcuts

- `Arrow Keys`: Navigate between months
- `Enter/Space`: Select week
- `Tab`: Navigate between interactive elements

## 🌐 Browser Support

- Chrome 60+
- Firefox 60+
- Safari 12+
- Edge 79+

## 📦 Bundle Size

- **Minified**: ~8KB
- **Gzipped**: ~3KB
- **Zero dependencies** (except peer dependencies)

## 🧪 Testing

The library includes comprehensive tests:

```bash
# Run tests
npm test

# Run tests with coverage
npm run test:coverage

# Run tests in watch mode
npm run test:watch
```

## 🔧 Development

### Prerequisites

- Node.js 18+
- npm or yarn

### Setup

```bash
# Clone the repository
git clone https://github.com/Developer-Nijat/react-week-picker-pro.git
cd react-week-picker-pro

# Install dependencies
npm install

# Start development server
npm run dev

# Build library
npm run build

# Run tests
npm test
```

### Project Structure

```
react-week-picker-pro/
├── lib/                     # Library source code
│   ├── components/          # React components
│   ├── utils/              # Utility functions
│   └── styles/             # CSS styles
├── src/                    # Demo application
├── tests/                  # Test files
├── dist/                   # Built library
└── docs/                   # Documentation
```

## 🤝 Contributing

Contributions are welcome! Please read our [Contributing Guide](CONTRIBUTING.md) for details.

### Development Workflow

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new features
5. Ensure all tests pass
6. Submit a pull request

## 📝 Changelog

See [CHANGELOG.md](CHANGELOG.md) for a detailed list of changes.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Nijat Aliyev**
- GitHub: [Developer-Nijat](https://github.com/Developer-Nijat)
- npm: [developer.nijat](https://www.npmjs.com/~developer.nijat)

## 🙏 Acknowledgments

- Built with [Vite](https://vitejs.dev/) for lightning-fast development
- Styled with modern CSS for beautiful, accessible design
- Tested with [Vitest](https://vitest.dev/) for reliable functionality
- Inspired by modern date picker libraries

## 🔗 Related Projects

- [react-datepicker](https://github.com/Hacker0x01/react-datepicker) - Full date picker
- [react-day-picker](https://github.com/gpbl/react-day-picker) - Flexible date picker
- [react-calendar](https://github.com/wojtekmaj/react-calendar) - Calendar component

---

<div align="center">

**[⬆ Back to Top](#react-week-picker-pro-)**

Made with ❤️ by [@developer.nijat](https://github.com/Developer-Nijat)

</div>