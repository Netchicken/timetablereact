import { useMemo } from "react";
import { useTable, useResizeColumns } from "react-table"; //https://react-table-v7.tanstack.com/
import styled from "styled-components";
import {
  loadAssessmentsFile,
  // GenerateHolidayDates,
  // GetHolidayData,
} from "../components/Dates";

//https://codesandbox.io/s/github/tannerlinsley/react-table/tree/master/examples/basic?file=/src/App.js:1844-1855
//https://react-table.js.org/
//https://react-table-v7.tanstack.com/docs/examples/basic
  //this is used locally in the render
  const ReactTable = ({ columns, data }) => {
    // Use the state and functions returned from useTable to build your UI
    // you can get the react table functions by using the hook useTable
    const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
      useTable(
        {
          columns,
          data,
        }

        // hooks for resizing
        // useFlexLayout,
        //useResizeColumns
      );
    //https://medium.com/@blaiseiradukunda/react-table-7-tutorial-3d8ba6ac8b16 excellent tutorial
    // Render the UI for your table
    return (
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => {
                const { render, getHeaderProps } = column;
                return <th {...getHeaderProps()}>{render("Header")}</th>;
              })}
            </tr>

            // <tr {...headerGroup.getHeaderGroupProps()}>
            //   {headerGroup.headers.map((column) => (
            //     <th {...column.getHeaderProps()}>{column.render("Header")}</th>
            //   ))}
            // </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row, i) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  };


const Table2 = (props) => {
  const Styles = styled.div`
    padding: 1rem;

    table {
      border-radius: 8px;

      max-width: 100%;
      height: auto;
      box-shadow: 1px 2px 4px rgba(0, 0, 0, 0.5);

      background: white;
      border-spacing: 0;
      border: 1px solid black;

      tr {
        :hover {
          background-color: #f5f5f5;
        }
        :last-child {
          td {
            border-bottom: 0;
          }
        }
      }

      th,
      td {
        margin: 0;
        padding: 0.5rem;
        border-bottom: 1px solid black;
        /* border-right: 1px solid black; */

        :last-child {
          border-right: 0;
        }
      }
    }
  `;

  const columns = useMemo(
    () => [
      {
        Header: "DSD Level 6 Software Development",
        columns: [
          // {
          //   Header: "ID",
          //   accessor: "id",
          // },
          {
            Header: "Module",
            accessor: "group",
          },
          {
            Header: "Unit",
            accessor: "AssID",
          },
          {
            Header: "Assessment Name",
            accessor: "AssName",
          },

          {
            Header: "Assessment Due",
            accessor: "DueDate",
          },
          {
            Header: "Break",
            accessor: "holiday",
          },
          // ,
          // {
          //   Header: "days",
          //   accessor: "days"
          // }
        ],
      },
    ],
    []
  );

  console.log("Table2 props", props.startDate);

  //https://alligator.io/react/usememo/ watches startDate, if no change just returns the same data without calculating it The dependencies list are the elements useMemo watches: if there are no changes the function result will stay the same, otherwise it will re-run the function.

  //startDate is including time so of course it ALWAYS changes!
  const data = useMemo(
    () =>
      loadAssessmentsFile(
        props.startDate,
        props.ShowHolidays,
        props.CalculateHolidays
      ),
    [props.startDate, props.ShowHolidays, props.CalculateHolidays] //this is where change is watched
  );
  console.log("Table2 data", data);
  console.log("Table2 columns", columns);
  return (
    <Styles>
      <ReactTable columns={columns} data={data} />
    </Styles>
  );
};

export default Table2;

//Moment(this.state.date, "DD-MM-YY").add(1, "d")

// function GenerateHolidayDates() {
//   const holidays = collegeHolidays;

//   //push all the days that are a break to daysbreak array
//   const allHolidays = holidays.map(item => {
//     var holidayStartDate = new Date(moment(item.startDate, "DD-MM-YYYY")); //turn the date string to a date
//     //loop through the days and add 1
//     var i = 1;
//     for (i = 0; i < item.days; i++) {
//       var singledate = new Date(
//         moment(holidayStartDate, "DD-MM-YY").add(i, "d")
//       );
//       //holidayStartDate.setDate(holidayStartDate.getDate() + i)
//       //);
//       item.daysbreak.push(singledate.toDateString()); //add dates to the array
//       console.log(
//         "day count " + item.daysbreak.length,
//         item.daysbreak.toString()
//       );
//     }
//   });
//   return allHolidays;
// }

// function loadAssessmentsFile(startDate) {
//   const data = assessemnts;

//   console.log("AFile dateStart in", startDate);
//   var date = new Date(startDate);

//   const options = {
//     weekday: "long",
//     year: "numeric",
//     month: "long",
//     day: "numeric"
//   };
//   const AssWithDates = data.map(item => {
//     //  console.log("in", data.DueDate + " " + data.days);
//     var newdate = new Date(date.setDate(date.getDate() + item.days));
//     item.DueDate = newdate.toLocaleDateString(undefined, options);
//     console.log("out", item.DueDate);
//     return item;
//   });

//   GenerateHolidayDates().map(item => {
//     console.log(item);
//     //return item;
//   });

//   return AssWithDates;
// }
