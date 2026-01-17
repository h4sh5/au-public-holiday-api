import * as ausHolidays from './ausHolidays.js';

var today = new Date();
var yesterday = new Date();
var tomorrow = new Date();
yesterday.setDate(yesterday.getDate() - 1);
tomorrow.setDate(tomorrow.getDate() + 1);



const states = new Array("NSW","QLD","VIC","ACT","TAS","NT","WA","SA");

var todayHolidaysByState = {};
var yesterdayHolidaysByState = {};
var tomorrowHolidaysByState = {};

// format is YYYY/MM/DD
// getMonth() returns month index, needs to + 1
todayHolidaysByState['date'] = `${today.getFullYear()}/${(today.getMonth()+1).toString().padStart(2, "0")}/${today.getDate().toString().padStart(2, "0")}`;
yesterdayHolidaysByState['date'] = `${yesterday.getFullYear()}/${(yesterday.getMonth()+1).toString().padStart(2, "0")}/${yesterday.getDate().toString().padStart(2, "0")}`;
tomorrowHolidaysByState['date'] = `${tomorrow.getFullYear()}/${(tomorrow.getMonth()+1).toString().padStart(2, "0")}/${tomorrow.getDate().toString().padStart(2, "0")}`;

for (var state of states) {
	todayHolidaysByState[state] = ausHolidays.getPublicHolidayFromDate(today, state);
	yesterdayHolidaysByState[state] = ausHolidays.getPublicHolidayFromDate(yesterday, state);
	tomorrowHolidaysByState[state] = ausHolidays.getPublicHolidayFromDate(tomorrow, state); 
}


console.log(JSON.stringify({"yesterday":yesterdayHolidaysByState, "today":todayHolidaysByState, "tomorrow":tomorrowHolidaysByState}));

