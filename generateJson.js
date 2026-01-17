import * as ausHolidays from './ausHolidays.js';

const today = new Date();
const year = today.getFullYear();
const states = new Array("NSW","QLD","VIC","ACT","TAS","NT","WA","SA");

var todayHolidaysByState = {};

for (var state of states) {
	// console.log(`today: ${today} ${state}`);
	const pubHoliday = ausHolidays.getPublicHolidayFromDate(today, state);
	todayHolidaysByState[state] = pubHoliday;
}

todayHolidaysByState['date'] = `${year}/${today.getMonth()+1}/${today.getDate()}`;

console.log(JSON.stringify(todayHolidaysByState));