import React, { useState } from "react";
import Table2 from "./Table2";
import "react-datepicker/dist/react-datepicker.css";
import "../App.css";
import { LoadStartDate } from "../components/Dates";
// import DatePicker from "react-datepicker";

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
  const [startdate2, setStartdate2] = useState(new Date());

  const handleCalendarClose = () => {
    console.log("Calendar closed", startdate2);
  };

  const handleCalendarOpen = () => console.log("Calendar opened");

  const ShowHolidaysChange = (event) => {
    setShowHolidays((prevState) => !prevState);
    console.log("ShowHolidays ", ShowHolidays);
  };

  const CalculateHolidaysChange = () => {
    setCalculateHolidays((prevState) => !prevState);
    console.log("Home.js CalculateHolidays ", CalculateHolidays);
  };

  //Radio button change
  const onOptionChange = (e) => {
    var date = LoadStartDate(e.target.value);
    setStartdate2(new Date(date));
    console.log("Start date onChange", e.target.value);
    console.log("startdate onOptionChange ", startdate2);
  };

  return (
    <div className='container'>
      <header className='header'>
        <div className='title'>
          <h1>DSD Level 6 Software Development Assessment Dates</h1>
        </div>
      </header>
      <div className='containerSub'>
        <div className='row'>
          <div className='column'>
            1. Select Your Start Date
            <div>
              <input
                type='radio'
                value='full'
                name='startdate'
                onChange={onOptionChange}
              />
              Full Year
              <input
                type='radio'
                value='mid'
                name='startdate'
                onChange={onOptionChange}
              />
              Mid Year
            </div>
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
            Choose your Startdate. The generated Assessment Dates don't include
            school holidays. <br></br>Click on Include holidays to see altered
            dates. <br></br>Students can hand assessments in after a break,
            instead of in the middle of a break
          </div>
        </div>
      </div>
      <div className='containerSub'>
        <Table2
          startDate={startdate2.toDateString()}
          ShowHolidays={ShowHolidays}
          CalculateHolidays={CalculateHolidays}
        ></Table2>

        <h3>Holiday Dates</h3>

        {GetHolidayData().map((item, index) => {
          return (
            <ul className='list-group list-group-flush'>
              <li key={item.name}>
                {item.name} {}
                {moment(item.startDate, "DD-MM-YY").format("dddd, MMMM Do")}
              </li>
            </ul>
          );
        })}
      </div>
    </div>
  );
};

export default Home;
