
export function findNextDayOfWeek(date, dayofweek) {
    // dayofweek: Sunday - Saturday : 0 - 6
    if (date.getDay() == dayofweek) {
        return date;
    } 
    // recursion
    date.setDate(date.getDate() + 1);
    return findNextDayOfWeek(date, dayofweek);
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



