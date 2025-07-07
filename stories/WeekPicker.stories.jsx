import WeekPicker from "../src/components/WeekPicker/WeekPicker";

export default {
  title: "WeekPicker",
  component: WeekPicker,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    onWeekSelect: { action: "week-selected" },
    dateFormat: {
      control: {
        type: "select",
        options: [
          "MMM dd, yyyy",
          "dd/MM/yyyy",
          "yyyy-MM-dd",
          "MMM dd",
          "dd MMM",
        ],
      },
    },
    firstDayOfWeek: {
      control: {
        type: "select",
        options: [0, 1],
      },
    },
  },
};

export const Default = {
  args: {
    showWeekNumbers: true,
    firstDayOfWeek: 1,
    dateFormat: "MMM dd, yyyy",
  },
};

export const SundayFirst = {
  args: {
    firstDayOfWeek: 0,
    showWeekNumbers: true,
  },
};

export const NoWeekNumbers = {
  args: {
    showWeekNumbers: false,
    firstDayOfWeek: 1,
  },
};

export const WithDateRestrictions = {
  args: {
    minDate: new Date(),
    maxDate: new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0),
    dateFormat: "dd/MM/yyyy",
  },
};

export const CustomFormat = {
  args: {
    dateFormat: "yyyy-MM-dd",
    showWeekNumbers: true,
  },
};
