
export function findNextDayOfWeek(date, dayofweek) {
    // dayofweek: Sunday - Saturday : 0 - 6
    if (date.getDay() == dayofweek) {
        return date;
    } 
    // recursion
    date.setDate(date.getDate() + 1);
    return findNextDayOfWeek(date, dayofweek);
}

export function findPreviousDayOfWeek(date, dayofweek) {
    // find the previous "day of week" e.g. the last Monday
    // dayofweek: Sunday - Saturday : 0 - 6
    if (date.getDay() == dayofweek) {
        return date;
    } 
    // recursion
    date.setDate(date.getDate() - 1);
    return findPreviousDayOfWeek(date, dayofweek);
}

// in some cases, holidays that fall on Sunday (and only Sunday) are adjusted to monday
export function adjustSundayToMonday(date) {
    if (date.getDay() == 0) { // Sunday
        date.setDate(date.getDate() + 1);
        return date;
    }
    return date;
}

// in some cases, weekend holidays are adjusted to monday
export function adjustWeekendToMonday(date) {
    if (date.getDay() == 0) { // Sunday
         date.setDate(date.getDate() + 1);
         return date; 
    } else if (date.getDay() == 6) { // Saturday
        date.setDate(date.getDate() + 2);
        return date;
    }

    return date;
}

export function getNewYearsDay(year) {
    return new Date(year, 0, 1);
}

// state must be ACT, NSW, SA, QLD, TAS, VIC or WA
export function getLabourDay(year, state)  {

    if (state == 'QLD' || state == 'NT') {
        // first Monday of May (month index of May is 4, since Jan is 0)
        return findNextDayOfWeek(new Date(year, 4, 1), 1);
    } else if (state == 'ACT' || state == 'NSW' || state == 'SA') {
        // first monday of Oct
        return findNextDayOfWeek(new Date(year, 9, 1), 1);
    } else if (state == 'TAS' || state == 'VIC') {
        // second monday in march; find first monday in march then + 7 days
        var date = findNextDayOfWeek(new Date(year, 2, 1), 1);
        date.setDate(date.getDate() + 7);
        return date;
    } else if (state == 'WA') {
        // first monday in march
        return findNextDayOfWeek(new Date(year, 2, 1), 1);
    }
}

export function getAnzacDay(year, state) {
    // some states adjust for weekends 
    if (state == 'ACT' || state == 'NT' || state == 'SA' | state == 'WA') {
        return adjustWeekendToMonday(new Date(year, 3, 25));
    } else if (state == "QLD") {
        return adjustSundayToMonday(new Date(year, 3, 25));
    }
    return new Date(year, 3, 25);
}

export function getAustraliaDay(year) {
    return adjustWeekendToMonday(new Date(year, 0, 26));
}

export function getEasterSunday(year) {
    // Modified Oudin's Algorithm for Calculating the Date of Easter in the Gregorian Calendar https://web.archive.org/web/20120204044335/http://www.smart.net/~mmontes/oudin.html
    const Y = year;
    var C = Math.floor(Y/100);
    var N = Y - 19*Math.floor(Y/19);
    var K = Math.floor((C - 17)/25);
    var I = C - Math.floor(C/4) - Math.floor((C - K)/3) + 19*N + 15;
    I = I - 30*Math.floor((I/30));
    I = I - Math.floor(I/28)*(1 - Math.floor(I/28)*Math.floor(29/(I + 1))*Math.floor((21 - N)/11));
    var J = Y + Math.floor(Y/4) + I + 2 - C + Math.floor(C/4);
    J = J - 7*Math.floor(J/7);
    var L = I - J;
    var month = 3 + Math.floor((L + 40)/44);
    var day = L + 28 - 31*Math.floor(month/4);
    var monthIndex = month - 1;

    return new Date(year, monthIndex, day);
}

export function getGoodFriday(year) {
    var date = getEasterSunday(year);
    date.setDate(date.getDate() - 2);
    return date;
}

export function getEasterMonday(year) {
    var date = getEasterSunday(year);
    date.setDate(date.getDate() + 1);
    return date;
}

// TODO xmas additional holidays logic?
export function getChristmas(year) {
    return adjustWeekendToMonday(new Date(year, 11, 25));
}

export function getBoxingDayAdditional(year) {
    const origDate = getBoxingDay(year);
    var isOnSundayOrMonday = origDate.getDay() == 0 || origDate.getDay() == 1;
    var date = adjustWeekendToMonday(origDate);
    // shift forward one (sometimes to mobday) if boxing day falls on Sunday or Monday
    if (isOnSundayOrMonday) {
        date.setDate(date.getDate() + 1);
    }
    return date;
}

export function getBoxingDay(year) {
    return new Date(year, 11, 26);
}

export function getMelbourneCup(year) {
    // (only in most of VIC)
    // first Tuesday of November 
    return findNextDayOfWeek(new Date(year, 10, 1), 2);
}

export function getBankHoliday(year) {
    // NSW banking and financial services only, first Monday of August
    return findNextDayOfWeek(new Date(year, 7, 1), 1);

}

export function getReconciliationDay(year) {
    // first day of the national reconciliation week (27 May to 3 June)
    // if it doesn't fall on a Monday, it's the following Monday
    var date = findNextDayOfWeek(new Date(year, 4, 27), 1);
    return date;
}

export function getCanberraDay(year) {
    // second monday in march, only in ACT
    // find first monday, then + 7
    var date = findNextDayOfWeek(new Date(year, 2, 1), 1);
    date.setDate(date.getDate() + 7);
    return date;
}

export function getWesternAustraliaDay(year) {
    // WA only, first Monday of June
    var date = findNextDayOfWeek(new Date(year, 5, 1), 1);
    return date;
}

export function getPicnicDay(year) {
    // NT only, first Monday of August
    return findNextDayOfWeek(new Date(year, 7, 1), 1);
}


export function getKingsBirthday(year, state) {
    // the Queen is dead, long live the Queen!

    if (state == "WA") {
        // last Monday of September or first Monday of October
        // usually in September so we stick with that as there's no set rule
        return findPreviousDayOfWeek(new Date(year, 8, 30), 1);
    }
    else if (state == "QLD") {
        // first Monday in October
        return findNextDayOfWeek(new Date(year, 9, 1), 1);
    }
    else {
        // second Monday in June
        var date = findNextDayOfWeek(new Date(year, 5, 1), 1);
        // add 7 days to first Monday in June
        date.setDate(date.getDate() + 7);
        return date;
    }
}

// return if date1 is the same as date2
export function datesMatch(date1, date2) {
    return date1.getTime() == date2.getTime();
}

/**
 * date: a Date object
 * state: all-caps initials of a state, e.g. "NSW" or "QLD"'
 * return: public holiday name, or null
 **/
export function getPublicHolidayFromDate(date, state) {
    const year = date.getFullYear();
    const month = date.getMonth(); // 0-11 Jan-Dec
    if (month == 0) { // January
        if (datesMatch(getNewYearsDay(year), date)) {
            return "New Year's Day";
        }
        if (datesMatch(getAustraliaDay(year), date)) {
            return "Australia Day";
        }
    }
    if (month == 2 || month == 3) { // March / April

        if (datesMatch(getGoodFriday(year, state), date)) {
            return "Good Friday";
        }

        if (datesMatch(getEasterMonday(year, state), date)) {
            return "Easter Monday";
        }

        if (datesMatch(getAnzacDay(year, state), date)) {
            return "ANZAC Day";
        }


        if (state == "TAS" || state == "WA" || state == "VIC") {
            if (datesMatch(getLabourDay(year, state), date)) {
                return "Labour Day";
            }
        }
        if (state == "ACT") {
            if (datesMatch(getCanberraDay(year, state), date)) {
                return "Canberra Day";
            }
        }

    }

}
