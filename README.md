# AU Public Holidays

JS Library for calculating Australian public holidays. 

See GitHub pages URL (https://h4sh5.github.io/au-public-holiday-api/) for a frontend demo that shows AU public holidays with a date picker.

## Library Usage

The main function is `getPublicHolidayFromDate(date, state)`, where date is a JS Date object and state is a all-capitals string of the state (e.g. "VIC" or "NT"). It returns a string of the holiday's name on that date, or `null` if it's not a holiday.

example:

```js
const ausHolidays = await import("./ausHolidays.js")

var today = new Date(2024, 11, 25); // Christmas, 11 = December in month index (Jan to Dec = 0 to 11)
console.log(ausHolidays.getPublicHolidayFromDate(today, "NSW")); // Christmas Day

````

## API Usage

You can 'query' the 'API' by requesting the following URL, which updates every 6 hours:

https://raw.githubusercontent.com/h4sh5/au-public-holiday-api/refs/heads/main/api.json

It returns a JSON blob with keys "yesterday", "today" and "tomorrow", each having its own subkeys of "date" as well as each Australian state holiday on the respective date. If there's nothing, the value will be null.

Here's what it's like on a normal date (non public holiday):

```
{"yesterday":{"date":"2026/01/18","NSW":null,"QLD":null,"VIC":null,"ACT":null,"TAS":null,"NT":null,"WA":null,"SA":null},"today":{"date":"2026/01/19","NSW":null,"QLD":null,"VIC":null,"ACT":null,"TAS":null,"NT":null,"WA":null,"SA":null},"tomorrow":{"date":"2026/01/20","NSW":null,"QLD":null,"VIC":null,"ACT":null,"TAS":null,"NT":null,"WA":null,"SA":null}}
```

expanded:

```
{
  "yesterday": {
    "date": "2026/01/18",
    "NSW": null,
    "QLD": null,
    "VIC": null,
    "ACT": null,
    "TAS": null,
    "NT": null,
    "WA": null,
    "SA": null
  },
  "today": {
    "date": "2026/01/19",
    "NSW": null,
    "QLD": null,
    "VIC": null,
    "ACT": null,
    "TAS": null,
    "NT": null,
    "WA": null,
    "SA": null
  },
  "tomorrow": {
    "date": "2026/01/20",
    "NSW": null,
    "QLD": null,
    "VIC": null,
    "ACT": null,
    "TAS": null,
    "NT": null,
    "WA": null,
    "SA": null
  }
}
```

Here's what it's like on a public holiday:

```
{
  "yesterday": {
    "date": "2026/12/24",
    "NSW": null,
    "QLD": null,
    "VIC": null,
    "ACT": null,
    "TAS": null,
    "NT": null,
    "WA": null,
    "SA": null
  },
  "today": {
    "date": "2026/12/25",
    "NSW": "Christmas Day",
    "QLD": "Christmas Day",
    "VIC": "Christmas Day",
    "ACT": "Christmas Day",
    "TAS": "Christmas Day",
    "NT": "Christmas Day",
    "WA": "Christmas Day",
    "SA": "Christmas Day"
  },
  "tomorrow": {
    "date": "2026/12/26",
    "NSW": "Boxing Day",
    "QLD": "Boxing Day",
    "VIC": "Boxing Day",
    "ACT": "Boxing Day",
    "TAS": "Boxing Day",
    "NT": "Boxing Day",
    "WA": "Boxing Day",
    "SA": "Boxing Day"
  }
}
```


