import React, { useState } from "react";
import Table2 from "./Table2";
// import "react-datepicker/dist/react-datepicker.css";
import "../App.css";
import { LoadStartDate } from "../components/Dates";
// import DatePicker from "react-datepicker";

import { GetHolidayData } from "../components/Dates";
import moment from "moment";
// import Toggle from "react-toggle";
// import "react-toggle/style.css";

const Home = () => {
  const [CalculateHolidays, setCalculateHolidays] = useState(false);
  const [ShowHolidays, setShowHolidays] = useState(false);
  const [startdate2, setStartdate2] = useState(new Date());
  const [midFull, setMidFull] = useState("full");

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
    setMidFull(e.target.value);
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
            <h3> Select Your Start Date</h3>
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
            {/* <label htmlFor='cheese-status'>
              2. Calculate effect of Holidays
            </label>
            <Toggle
              defaultChecked={CalculateHolidays}
              onChange={CalculateHolidaysChange}
            />
             */}
          </div>

          <div className='column'>
            <h3>
              Course Start Date: <br></br>
              {moment(startdate2).format("dddd, MMMM Do YYYY")}
            </h3>
          </div>
        </div>

        <div className='row' style={{ color: "black" }}>
          <Table2
            startDate={startdate2.toDateString()}
            ShowHolidays={ShowHolidays}
            CalculateHolidays={CalculateHolidays}
            MidFull={midFull}
          ></Table2>

          <h2 style={{ color: "white" }}>Holiday Dates</h2>

          {GetHolidayData().map((item, index) => {
            return (
              <div style={{ color: "white" }}>
                <h3> {item.name}</h3>
                {/* {moment(item.startDate, "DD-MM-YY").format("dddd, MMMM Do")} */}

                <p>{item.text}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Home;
