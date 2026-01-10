// can be run frontend (in browser) or backend (bun/node); if no errors raised, then all tests passed

import * as ausHolidays from './ausHolidays.js';

var today = new Date();
var year = today.getFullYear();

function testDate(date1, date2) {
    if (date1.getTime() != date2.getTime()) {
        throw new Error(`Test failed: ${date1} != ${date2}`);
    }
}

// month Jan-Dec is number 0-11 

testDate(ausHolidays.adjustWeekendToMonday(new Date(2026, 2, 7)), new Date(2026, 2, 9));
testDate(ausHolidays.adjustWeekendToMonday(new Date(2026, 2, 8)), new Date(2026, 2, 9));
testDate(ausHolidays.adjustSundayToMonday(new Date(2026, 2, 7)), new Date(2026, 2, 7));
testDate(ausHolidays.adjustSundayToMonday(new Date(2026, 2, 8)), new Date(2026, 2, 9));

// test labour day
testDate(ausHolidays.getLabourDay(2026, "QLD"), new Date(2026, 4, 4));
testDate(ausHolidays.getLabourDay(2029, "QLD"), new Date(2029, 4, 7));
testDate(ausHolidays.getLabourDay(2027, "WA"), new Date(2027, 2, 1));
testDate(ausHolidays.getLabourDay(2029, "WA"), new Date(2029, 2, 5));
testDate(ausHolidays.getLabourDay(2026, "VIC"), new Date(2026, 2, 9));
testDate(ausHolidays.getLabourDay(2027, "VIC"), new Date(2027, 2, 8));

// test new years
testDate(ausHolidays.getNewYearsDay(2030), new Date(2030,0,1));

// test anzac day
testDate(ausHolidays.getAnzacDay(2025, "NT"), new Date(2025, 3, 25));
testDate(ausHolidays.getAnzacDay(2026, "QLD"), new Date(2026, 3, 25));
testDate(ausHolidays.getAnzacDay(2026, "NT"), new Date(2026, 3, 27));
testDate(ausHolidays.getAnzacDay(2026, "NSW"), new Date(2026, 3, 25));

// Australia Day
testDate(ausHolidays.getAustraliaDay(2027), new Date(2027, 0, 26));
// Easter
testDate(ausHolidays.getEasterSunday(2025), new Date(2025, 3, 20));
testDate(ausHolidays.getEasterSunday(2026), new Date(2026, 3, 5));
testDate(ausHolidays.getEasterMonday(2025), new Date(2025, 3, 21));
testDate(ausHolidays.getGoodFriday(2026), new Date(2026, 3, 3));
testDate(ausHolidays.getGoodFriday(2028), new Date(2028, 3, 14));
// Xmas
testDate(ausHolidays.getChristmas(2025), new Date(2025, 11, 25));
testDate(ausHolidays.getBoxingDay(2025), new Date(2025, 11, 26));
testDate(ausHolidays.getChristmas(2026), new Date(2026, 11, 25));
testDate(ausHolidays.getBoxingDay(2026), new Date(2026, 11, 26));
testDate(ausHolidays.getBoxingDayAdditional(2026), new Date(2026, 11, 28));
testDate(ausHolidays.getBoxingDay(2029), new Date(2029, 11, 26));
// same as Boxing Day as there's no additional one
testDate(ausHolidays.getBoxingDayAdditional(2029), new Date(2029, 11, 26));
// --- regional holidays ----
// --- VIC ---
testDate(ausHolidays.getMelbourneCup(2025), new Date(2025, 10, 4));
testDate(ausHolidays.getMelbourneCup(2026), new Date(2026, 10, 3));
// --- NSW ---
testDate(ausHolidays.getBankHoliday(2026), new Date(2026, 7, 3));
testDate(ausHolidays.getBankHoliday(2025), new Date(2025, 7, 4));
// --- ACT ---
testDate(ausHolidays.getReconciliationDay(2024), new Date(2024, 4, 27));
testDate(ausHolidays.getReconciliationDay(2025), new Date(2025, 5, 2));
testDate(ausHolidays.getReconciliationDay(2026), new Date(2026, 5, 1));
testDate(ausHolidays.getReconciliationDay(2027), new Date(2027, 4, 31));
testDate(ausHolidays.getCanberraDay(2025), new Date(2025, 2, 10));
testDate(ausHolidays.getCanberraDay(2027), new Date(2027, 2, 8));

console.log("All tests passed")
