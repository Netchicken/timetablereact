import assessemnts from "../Assets/Assessments.json";
import collegeHolidays from "../Assets/Holidays.json";
import moment from "moment";
//https://www.sitepoint.com/managing-dates-times-using-moment-js/

export function LoadStartDate(selection) {
  var startDate = "";
  // console.log("date.js LoadStartDate", selection);
  switch (selection) {
    case "full":
      startDate = "2023-03-06";
      break;
    case "mid":
      startDate = "2023-02-27";
      break;

    default:
      startDate = "";
  }
  console.log("date.js LoadStartDate", startDate);
  return startDate;
}

export function loadAssessmentsFile(
  startDate,
  ShowHolidays,
  CalculateHolidays
) {
  const assessmentData = assessemnts; //load from file
  const holidaysData = collegeHolidays; //load from file

  var addDaysAfterBreak = 0; //must be global
  console.log("date.js dateStart in", startDate);
  var date = new Date(startDate); //convert string to date

  //loop through each entry and calculate dates adding days to assessment
  //moment(date, "DD-MM-YY") this is only parsing date, not formatting date
  const AssWithDates = assessmentData.map((item) => {
    //add startdate to days for each assessment return new date
    var newdate = new Date(moment(date, "DD-MM-YY").add(item.days, "d"));
    newdate = moment(newdate).format("DD-MM-YY");
    // console.log("date.js newdate", newdate);
    item.holiday = ""; //remove any text
    //todo Fix formatting with localenewdate; //
    item.DueDate = newdate; //    moment(newdate).format("dddd, MMMM Do YY"); //format date for viewing
    console.log(
      "Date.js out loadAssessmentsFile ",
      item.DueDate + " " + item.holiday
    );
    return item;
  });

  //Pass in the entire Array instead of nesting it.
  if (CalculateHolidays) {
    //compare holiday dates with assessment dates
    const outputdata = HolidayMap(
      AssWithDates,
      addDaysAfterBreak,
      ShowHolidays,
      holidaysData
    );

    return outputdata;
  }

  return AssWithDates;
}

//newdate = startdate + days to assesment
//item = data row from assessments
function HolidayMap(
  AssWithDates,
  addDaysAfterBreak,
  ShowHolidays,
  holidaysData
) {
  //holds the unmutated date to subtract from the mutated date to get day count

  var allHolidays = GenerateHolidayDates(holidaysData);

  AssWithDates.map((item) => {
    allHolidays.map((item2) => {
      //console.log("date match assess date ", newdate);

      //if the day is in the holiday dates
      if (item2.daysbreak.includes(item.DueDate)) {
        // make the duedate the last day of the holiday
        var oldDueDate = item.DueDate; //keep the old due date to work out date diff
        //item.DueDate is the new assessment end date, its the date match from the holidays array
        item.DueDate = item2.daysbreak[item2.daysbreak.length - 1];

        //new Date(moment(item2.daysbreak[item2.daysbreak.length - 1]).format("DD-MM-YY")
        // );
        console.log(
          "date match ",
          "true " +
            oldDueDate +
            " ==> " +
            item2.daysbreak[item2.daysbreak.length - 1]
        );

        item.holiday = item2.name + " Break";

        //   if (ShowHolidays) {
        // count days to add to next assessments
        addDaysAfterBreak += addDaysAfterBreakF(oldDueDate, item.DueDate); //covers multiple holidays
        console.log("date addDaysAfterBreak ", addDaysAfterBreak);
        // }

        //    newdate.add(item.days,"d"); //add in the holidays

        //if there IS NO match with the holidays, then you still need to add on the difference for the LAST holiday up the tree, all dates get pushed later.
      } else {
        //item.holiday = "no";
      }
      //   if (addDaysAfterBreak !== isNaN) {
      //     item.DueDate = new Date(
      //       moment(item.DueDate).add(addDaysAfterBreak, "days")
      //     );
      //     console.log("date match false", item.DueDate);
      //   } else {
      //     console.log("date match false", item.DueDate);
      //   }
      // }
    });
  });
  //}
  return AssWithDates;
}
//Find the difference between dates and add them to assessment dates https://www.sitepoint.com/managing-dates-times-using-moment-js/
function addDaysAfterBreakF(oldNewDate, newdate) {
  const dateOld = moment(oldNewDate, "DD-MM-YY");
  const dateNew = moment(newdate, "DD-MM-YY"); //.format("DD-MM-YY").toString();
  return dateNew.diff(dateOld, "days"); //covers multiple holidays
}

export function GetHolidayData() {
  const holidays = collegeHolidays;

  return holidays;
}

//Working
export function GenerateHolidayDates() {
  //push all the days that are a break to daysbreak array
  const holidaysData = collegeHolidays; //load from file THIS IS NOT GOOD!!!!
  const allHolidays = holidaysData.map((item) => {
    var holidayStartDate = new Date(moment(item.startDate, "DD-MM-YY")); //turn the date string to a date
    //loop through the days and add 1
    var i = 1;
    for (i = 0; i < item.days; i++) {
      var singledate = new Date(
        moment(holidayStartDate, "DD-MM-YY").add(i, "d")
      );
      //holidayStartDate.setDate(holidayStartDate.getDate() + i)
      //);

      var dateFinal = moment(singledate).format("DD-MM-YY");

      item.daysbreak.push(dateFinal); //add dates to the array

      // console.log(
      //   item.name + " day count " + item.daysbreak.length,
      //   item.daysbreak.toString()
      // );
    }
    return item;
  });
  return allHolidays;
  //
}
