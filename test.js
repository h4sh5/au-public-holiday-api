// can be run frontend (in browser) or backend (bun/node); if no errors raised, then all tests passed

import * as ausHolidays from './ausHolidays.js';

var today = new Date();
var year = today.getFullYear();

function testDate(date1, date2) {
    if (date1.getTime() != date2.getTime()) {
        throw new Error(`Test failed: ${date1} != ${date2}`);
    }
}

function testPublicHoliday(date, state, holidayName) {
    const holidayResult = ausHolidays.getPublicHolidayFromDate(date, state);
    if (holidayResult != holidayName) {
        throw new Error(`Test failed: ${date} should be ${holidayName}, not ${holidayResult}`);
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
testDate(ausHolidays.getAustraliaDay(2025), new Date(2025, 0, 27));
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
// --- WA ---
testDate(ausHolidays.getWesternAustraliaDay(2025), new Date(2025, 5, 2));
testDate(ausHolidays.getWesternAustraliaDay(2027), new Date(2027, 5, 7));
// --- NT ---
testDate(ausHolidays.getPicnicDay(2025), new Date(2025, 7, 4));
testDate(ausHolidays.getPicnicDay(2028), new Date(2028, 7, 7));

// King's Birthday
testDate(ausHolidays.getKingsBirthday(2026, "QLD"), new Date(2026, 9, 5));
testDate(ausHolidays.getKingsBirthday(2027, "WA"), new Date(2027, 8, 27));
testDate(ausHolidays.getKingsBirthday(2026, "WA"), new Date(2026, 8, 28));
testDate(ausHolidays.getKingsBirthday(2026, "NSW"), new Date(2026, 5, 8));
testDate(ausHolidays.getKingsBirthday(2028, "VIC"), new Date(2028, 5, 12));

// get public holiday test
testPublicHoliday(new Date(2025, 0, 1), "ACT", "New Year's Day");
testPublicHoliday(new Date(2026, 0, 26), "NSW", "Australia Day");
testPublicHoliday(new Date(2026, 3, 25), "QLD", "ANZAC Day");
testPublicHoliday(new Date(2027, 2, 26), "VIC", "Good Friday");
testPublicHoliday(new Date(2026, 3, 6), "ACT", "Easter Monday");
testPublicHoliday(new Date(2028, 3, 16), "QLD", "Easter Sunday");
testPublicHoliday(new Date(2026, 2, 9), "VIC", "Labour Day");
testPublicHoliday(new Date(2026, 2, 9), "ACT", "Canberra Day");
testPublicHoliday(new Date(2026, 2, 9), "QLD", null);
testPublicHoliday(new Date(2026, 5, 1), "ACT", "Reconciliation Day");
testPublicHoliday(new Date(2026, 5, 1), "WA", "Western Australia Day");
testPublicHoliday(new Date(2026, 5, 1), "QLD", null);
testPublicHoliday(new Date(2026, 5, 8), "NSW", "King's Birthday");
testPublicHoliday(new Date(2026, 7, 3), "NSW", "Bank Holiday (NSW)");
testPublicHoliday(new Date(2026, 7, 3), "QLD", null);
testPublicHoliday(new Date(2026, 7, 3), "NT", "Picnic Day");
testPublicHoliday(new Date(2026, 7, 3), "QLD", null);
testPublicHoliday(new Date(2026, 9, 5), "QLD", "King's Birthday");
testPublicHoliday(new Date(2028, 9, 2), "QLD", "King's Birthday");
testPublicHoliday(new Date(2026, 10, 3), "VIC", "Melbourne Cup");
testPublicHoliday(new Date(2026, 10, 3), "QLD", null);
testPublicHoliday(new Date(2026, 11, 25), "NSW", "Christmas Day");
testPublicHoliday(new Date(2026, 11, 25), "QLD", "Christmas Day");
testPublicHoliday(new Date(2026, 11, 25), "TAS", "Christmas Day");
testPublicHoliday(new Date(2026, 11, 26), "NSW", "Boxing Day");
testPublicHoliday(new Date(2026, 11, 26), "QLD", "Boxing Day");
testPublicHoliday(new Date(2026, 11, 26), "TAS", "Boxing Day");
testPublicHoliday(new Date(2026, 11, 28), "NSW", "Boxing Day Additional Public Holiday");
testPublicHoliday(new Date(2026, 11, 28), "QLD", "Boxing Day Additional Public Holiday");
testPublicHoliday(new Date(2026, 11, 28), "TAS", "Boxing Day Additional Public Holiday");
console.log("All tests passed")
