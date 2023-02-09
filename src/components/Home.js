import React, { useState } from "react";
import Table2 from "./Table2";
import "react-datepicker/dist/react-datepicker.css";
import "../App.css";
import DatePicker from "react-datepicker";

import {
  loadAssessmentsFile,
  GenerateHolidayDates,
  GetHolidayData,
} from "../components/Dates";
import moment from "moment";
import Toggle from "react-toggle";
import "react-toggle/style.css";

const Home = () => {
  const [CalculateHolidays, setCalculateHolidays] = useState(false);
  const [ShowHolidays, setShowHolidays] = useState(false);

  var startdate2 = new Date();

  const handleCalendarClose = () => {
    console.log("Calendar closed", startdate2);
  };

  const handleCalendarOpen = () => console.log("Calendar opened");

  const ShowHolidaysChange = () => {
    // setShowHolidays(() => ({
    //   ShowHolidays: !ShowHolidays,
    // }));

    setShowHolidays((prevState) => !prevState);

    console.log("ShowHolidays ", ShowHolidays);
  };

  const CalculateHolidaysChange = () => {
    // setCalculateHolidays(() => ({
    //   CalculateHolidays: !CalculateHolidays,
    // }));

    setCalculateHolidays((prevState) => !prevState);
    console.log("Home.js CalculateHolidays ", CalculateHolidays);
  };

  const handleChange = (date) => {
    startdate2 = date.toDateString();
    console.log("startdate handlechange ", startdate2);

    // this.setState(
    //   () => ({
    //     startDate: date,
    //   }),
    //   () => {}
    // );
  };

  // ExampleCustomInput = ({ value, onClick }) => (
  //   <button className="datepickerFrontButton" onClick={onClick}>
  //     {value}
  //   </button>
  // );

  return (
    <div className='container'>
      <header className='header'>
        <div className='title'>
          <h1>DSD Level 6 Software Development Assessment Dates</h1>
        </div>
      </header>

      {/* <Toggle

          defaultChecked={this.state.ShowHolidays}
          onChange={this.ShowHolidaysChange}
        />
        <label htmlFor="cheese-status">Show Holidays</label> */}
      <div className='containerSub'>
        <div className='row'>
          <div className='column'>
            1. Select Your Start Date
            <DatePicker
              todayButton='Today'
              selected={startdate2}
              onChange={handleChange}
              withPortal
              peekNextMonth
              showYearDropdown
              showMonthDropdown
              dropdownMode='select'
              onCalendarClose={handleCalendarClose}
              onCalendarOpen={handleCalendarOpen}
              dateFormat='dd/MM/yyy'
              // customInput={this.ExampleCustomInput}
            />
            <label htmlFor='cheese-status'>
              2. Calculate effect of Holidays
            </label>
            <Toggle
              defaultChecked={CalculateHolidays}
              onChange={CalculateHolidaysChange}
            />
            <h3>
              Course Start Date:
              {moment(startdate2).format("dddd, MMMM Do YYYY")}
            </h3>
          </div>

          <div className='column'>
            Calculate your assessment due dates with this simple app.<br></br>{" "}
            Enter your Startdate. The generated Assessment Dates don't include
            school holidays. <br></br>Click on Include holidays to see altered
            dates. <br></br>Students can hand assessments in after a break,
            instead of in the middle of a break
          </div>
        </div>{" "}
      </div>

      <Table2
        startDate={startdate2.toDateString()}
        ShowHolidays={ShowHolidays}
        CalculateHolidays={CalculateHolidays}
      ></Table2>

      <div className='containerSub'>
        <h3>Holiday Dates</h3>

        {GetHolidayData().map((item, index) => {
          return (
            <ul className='list-group list-group-flush'>
              <li key={item.name}>
                {item.name}
                {moment(item.startDate, "DD-MM-YY").format(
                  "dddd, MMMM Do YYYY"
                )}
              </li>
            </ul>
          );
        })}
      </div>
      {/* <h3>Each Holiday Dates</h3>

        {GenerateHolidayDates().map((item, index) => {
          return (
            <ul className="list-group list-group-flush">
              <li>
                {item.daysbreak.length} Days - {item.name} <br></br>-{" "}
                {item.daysbreak}
              </li>
            </ul>
          );
        })} */}
    </div>
  );
};

export default Home;
