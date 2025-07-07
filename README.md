# React Week Picker Pro 📅

[![npm version](https://badge.fury.io/js/react-week-picker-pro.svg)](https://badge.fury.io/js/react-week-picker-pro)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Bundle Size](https://img.shields.io/bundlephobia/minzip/react-week-picker-pro)](https://bundlephobia.com/package/react-week-picker-pro)

A modern, lightweight React component for selecting weeks with comprehensive features and zero dependencies.

## ✨ Features

- 🗓️ **Week-only selection** - Select entire weeks, not individual days
- 📊 **ISO Week numbers** - Standards-compliant week numbering
- 📅 **Date range display** - Shows selected week's start and end dates
- 🚫 **Date restrictions** - Min/max date constraints
- 🌍 **Flexible configuration** - Sunday or Monday week start
- 🎨 **Custom formatting** - Configurable date display formats
- 📱 **Mobile responsive** - Works perfectly on all devices
- ♿ **Accessible** - WCAG compliant with keyboard navigation
- 🎯 **Zero dependencies** - Only requires React
- 📦 **Lightweight** - Less than 20KB minified
- 🌳 **Tree-shakeable** - Import only what you need
- 💪 **TypeScript ready** - Full type definitions included

## 🚀 Installation

```bash
npm install react-week-picker-pro
```

```bash
yarn add react-week-picker-pro
```

```bash
pnpm add react-week-picker-pro
```

## 📖 Quick Start

```jsx
import React, { useState } from 'react';
import WeekPicker from 'react-week-picker-pro';

function App() {
  const [selectedWeek, setSelectedWeek] = useState();

  const handleWeekSelect = (weekStart, weekEnd, weekNumber) => {
    setSelectedWeek(weekStart);
    console.log(`Selected Week ${weekNumber}: ${weekStart} - ${weekEnd}`);
  };

  return (
    <WeekPicker
      selectedWeek={selectedWeek}
      onWeekSelect={handleWeekSelect}
    />
  );
}
```

## 🎯 Examples

### Basic Usage

```jsx
import WeekPicker from 'react-week-picker-pro';

<WeekPicker
  onWeekSelect={(start, end, weekNum) => {
    console.log('Week selected:', weekNum);
  }}
/>
```

### With Date Restrictions

```jsx
// Only allow current month
const now = new Date();
const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
const monthEnd = new Date(now.getFullYear(), now.getMonth() + 1, 0);

<WeekPicker
  minDate={monthStart}
  maxDate={monthEnd}
  onWeekSelect={handleWeekSelect}
/>
```

### Custom Configuration

```jsx
<WeekPicker
  firstDayOfWeek={0}          // Sunday first
  dateFormat="dd/MM/yyyy"     // European format
  showWeekNumbers={false}     // Hide week numbers
  className="custom-picker"   // Custom styling
  onWeekSelect={handleWeekSelect}
/>
```

### Controlled Component

```jsx
const [selectedWeek, setSelectedWeek] = useState();

// Programmatic control
const selectCurrentWeek = () => setSelectedWeek(new Date());
const clearSelection = () => setSelectedWeek(undefined);

<WeekPicker
  selectedWeek={selectedWeek}
  onWeekSelect={(start) => setSelectedWeek(start)}
/>
```

## 📋 API Reference

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `selectedWeek` | `Date` | `undefined` | Currently selected week |
| `onWeekSelect` | `function` | `undefined` | Callback: `(weekStart, weekEnd, weekNumber) => void` |
| `minDate` | `Date` | `undefined` | Minimum selectable date |
| `maxDate` | `Date` | `undefined` | Maximum selectable date |
| `className` | `string` | `''` | Additional CSS class |
| `dateFormat` | `string` | `'MMM dd, yyyy'` | Date display format |
| `showWeekNumbers` | `boolean` | `true` | Show ISO week numbers |
| `firstDayOfWeek` | `0 \| 1` | `1` | Week start (0=Sunday, 1=Monday) |

### Date Format Options

- `'MMM dd, yyyy'` → "Jul 07, 2025"
- `'dd/MM/yyyy'` → "07/07/2025"
- `'yyyy-MM-dd'` → "2025-07-07"
- `'MMM dd'` → "Jul 07"
- `'dd MMM'` → "07 Jul"

### Utility Functions

```jsx
import { 
  getISOWeekNumber, 
  getWeekStart, 
  getWeekEnd,
  formatDate,
  isSameWeek 
} from 'react-week-picker-pro';

// Get week number for any date
const weekNum = getISOWeekNumber(new Date()); // 28

// Get week boundaries
const start = getWeekStart(new Date());
const end = getWeekEnd(new Date());

// Format dates
const formatted = formatDate(new Date(), 'dd/MM/yyyy');

// Compare weeks
const sameWeek = isSameWeek(date1, date2);
```

## 🎨 Styling

### Default Styles
The component comes with beautiful default styles that work out of the box.

### Custom CSS
```css
.my-week-picker {
  border: 2px solid #3b82f6;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.15);
}

.my-week-picker .week-row:hover {
  background: #f0f9ff;
}
```

### CSS Modules
```jsx
import styles from './MyWeekPicker.module.css';

<WeekPicker className={styles.customPicker} />
```

### Styled Components
```jsx
import styled from 'styled-components';

const StyledWeekPicker = styled(WeekPicker)`
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;
```

## 🌍 Browser Support

- Chrome 60+
- Firefox 55+
- Safari 11+
- Edge 79+

## 📦 Bundle Size

- **Minified**: ~15KB
- **Minified + Gzipped**: ~6KB
- **Tree-shakeable**: Import only what you need

## 🧪 Testing

```bash
# Run tests
npm test

# Watch mode
npm run test:watch

# Coverage report
npm run test:coverage
```

## 🛠️ Development

```bash
# Clone repository
git clone https://github.com/nicatasa/react-week-picker-pro.git

# Install dependencies
npm install

# Start development
npm run dev

# Build library
npm run build

# Run Storybook
npm run storybook
```

## 📄 Changelog

See [CHANGELOG.md](CHANGELOG.md) for version history.

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built with ❤️ by [nicatasa](https://github.com/nicatasa)
- Inspired by the need for a simple, functional week picker
- Thanks to all contributors and users

## 🔗 Links

- [GitHub Repository](https://github.com/nicatasa/react-week-picker-pro)
- [npm Package](https://www.npmjs.com/package/react-week-picker-pro)
- [Issue Tracker](https://github.com/nicatasa/react-week-picker-pro/issues)
- [Discussions](https://github.com/nicatasa/react-week-picker-pro/discussions)

---

**Made with ❤️ for the React community**