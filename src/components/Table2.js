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
      },

      // hooks for resizing
      // useFlexLayout,
      useResizeColumns
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
                return <td {...cell.getCellProps()}>{cell.render("Cell")}</td>;
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
//css
const Table2 = (props) => {
  const Styles = styled.div`
    padding: 1rem;

    table {
      border-radius: 8px;
      min-width: 100%;
      max-width: 100%;
      height: auto;
      box-shadow: 1px 2px 4px rgba(0, 0, 0, 0.5);

      background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' version='1.1' xmlns:xlink='http://www.w3.org/1999/xlink' xmlns:svgjs='http://svgjs.com/svgjs' width='1440' height='560' preserveAspectRatio='none' viewBox='0 0 1440 560'%3e%3cg mask='url(%26quot%3b%23SvgjsMask1081%26quot%3b)' fill='none'%3e%3crect width='1440' height='560' x='0' y='0' fill='rgba(113%2c 219%2c 231%2c 1)'%3e%3c/rect%3e%3cpath d='M0%2c494.359C112.859%2c486.615%2c225.066%2c553.803%2c331.777%2c516.255C449.425%2c474.858%2c547.794%2c386.497%2c611.41%2c279.222C678.936%2c165.354%2c714.903%2c30.951%2c697.387%2c-100.269C679.786%2c-232.125%2c611.33%2c-354.581%2c514.613%2c-445.914C422.831%2c-532.586%2c298.401%2c-570.213%2c174.443%2c-594.098C59.361%2c-616.272%2c-58.425%2c-614.711%2c-169.646%2c-577.76C-278.299%2c-541.662%2c-363.116%2c-465.197%2c-447.256%2c-387.55C-541.29%2c-300.772%2c-671.018%2c-225.747%2c-688.456%2c-98.985C-705.892%2c27.759%2c-590.598%2c129.127%2c-534.127%2c243.928C-479.594%2c354.789%2c-474.251%2c511.439%2c-362.388%2c563.887C-248.72%2c617.181%2c-125.247%2c502.953%2c0%2c494.359' fill='%2327c8db'%3e%3c/path%3e%3cpath d='M1440 927.242C1509.7930000000001 928.934 1577.8220000000001 903.491 1635.05 863.504 1690.935 824.456 1733.916 768.992 1757.846 705.155 1780.809 643.9 1771.086 578.319 1766.416 513.068 1761.382 442.741 1774.712 363.25 1729.502 309.145 1684.201 254.93099999999998 1604.818 247.49 1535.074 236.209 1472.209 226.041 1410.009 232.005 1348.235 247.478 1284.217 263.513 1221.55 284.345 1171.438 327.28999999999996 1115.962 374.83299999999997 1047.024 430.772 1049.137 503.802 1051.291 578.227 1144.4279999999999 613.493 1181.587 678.013 1213.7359999999999 733.833 1204.571 809.472 1250.936 854.19 1300.571 902.0609999999999 1371.061 925.5699999999999 1440 927.242' fill='%23bbeef3'%3e%3c/path%3e%3c/g%3e%3cdefs%3e%3cmask id='SvgjsMask1081'%3e%3crect width='1440' height='560' fill='white'%3e%3c/rect%3e%3c/mask%3e%3c/defs%3e%3c/svg%3e");
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
          // {
          //   Header: "Unit",
          //   accessor: "AssID",
          // },
          {
            Header: "Assessment Name",
            accessor: "AssName",
          },

          {
            Header: "Assessment Due",
            accessor: "DueDate",
          },
          // {
          //   Header: "Break",
          //   accessor: "holiday",
          // },
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
        props.CalculateHolidays,
        props.MidFull
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

