const fs = require("fs");
const path = require("path");
const dayjs = require("dayjs");

// Define major US holidays for 2024
const holidays2024 = [
  "2024-01-01", // New Year's Day
  "2024-01-15", // Martin Luther King Jr. Day
  "2024-02-19", // Presidents' Day
  "2024-05-27", // Memorial Day
  "2024-06-19", // Juneteenth
  "2024-07-04", // Independence Day
  "2024-09-02", // Labor Day
  "2024-10-14", // Columbus Day
  "2024-11-11", // Veterans Day
  "2024-11-28", // Thanksgiving
  "2024-12-25", // Christmas Day
].map((date) => dayjs(date));

// Helper function to get the first Monday of the given year
function getFirstMondayOfYear(year) {
  let date = dayjs(`${year}-01-01`);
  while (date.day() !== 1) { // 1 = Monday
    date = date.add(1, "day");
  }
  return date;
}

// Check if a date is a holiday
function isHoliday(date) {
  return holidays2024.some((holiday) => holiday.isSame(date, "day"));
}

// Adjust start and end dates for holidays
function adjustForHoliday(date, direction) {
  while (isHoliday(date)) {
    date =
      direction === "forward" ? date.add(1, "day") : date.subtract(1, "day");
  }
  return date;
}

// Function to generate weekly sprints with holiday adjustments
function generateWeeklySprints(year) {
  const sprints = [];
  let startDate = getFirstMondayOfYear(year);
  const christmasWeekStart = dayjs(`${year}-12-23`);
  let sprintCount = 0;

  while (startDate.isBefore(christmasWeekStart)) {
    // Set initial endDate to Friday of the same week
    let endDate = startDate.add(4, "day");

    // Adjust startDate if it's a holiday
    if (isHoliday(startDate)) {
      startDate = adjustForHoliday(startDate, "forward");
    }

    // Adjust endDate if it's a holiday
    if (isHoliday(endDate)) {
      endDate = adjustForHoliday(endDate, "backward");
    }

    // Add the sprint to the list
    sprints.push({
      startDate: startDate.format("YYYY-MM-DD"),
      endDate: endDate.format("YYYY-MM-DD"),
      workDays: 5, // Each sprint is considered 5 workdays (Monday to Friday)
    });

    // Move startDate to the next Monday
    startDate = endDate.add(3, "day"); // Skip to the next Monday
    sprintCount++;
  }

  console.log(`${sprintCount} sprints for ${year} written to sprints.json`);
  return sprints;
}

// Generate sprints for 2024 and write to sprints.json
const year = 2024;
const sprints = generateWeeklySprints(year);
const filePath = path.join(__dirname, "sprints.json");
fs.writeFileSync(filePath, JSON.stringify(sprints, null, 2));
