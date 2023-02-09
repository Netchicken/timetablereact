import React, { Component } from "react";
// import DateEditor from "react-tabulator/lib/editors/DateEditor";
// import MultiValueFormatter from "react-tabulator/lib/formatters/MultiValueFormatter";
// import MultiSelectEditor from "react-tabulator/lib/editors/MultiSelectEditor";

import loadAssessmentsFile from "./Assessments";

//import Moment from "react-moment"; //https://www.npmjs.com/package/react-moment
import "react-tabulator/lib/styles.css"; // default theme
import "tabulator-tables/dist/css/tabulator.min.css"; //import Tabulator stylesheet
import "react-tabulator/css/bootstrap/tabulator_bootstrap.min.css"; // use Theme(s)
import { ReactTabulator, reactFormatter } from "react-tabulator"; //http://tabulator.info/docs/4.6/frameworks#react
//https://codesandbox.io/s/0mwpy612xw?module=/src/components/Home.js&file=/src/components/Home.js:51-423

//https://github.com/ngduc/react-tabulator

const columns = [
  {
    title: "ID",
    field: "id",
    width: 20
  },
  {
    title: "Assessment Name",
    field: "AssName",
    align: "left",
    formatter: "textarea"
  },
  {
    title: "Module",
    field: "group",
    width: 150
  },
  {
    title: "Date Due",
    field: "DueDate",
    width: 250
    //  formatter: "datetime",
    // formatterParams: {
    //   inputFormat: "DD/MM/YY",
    //   outputFormat: "DD/MM/YY",
    //   invalidPlaceholder: "(invalid date)",
    // },
  }
  // ,
  // {
  //     title: "Rating",
  //     field: "rating",
  //     align: "center",
  //     formatter: "star",
  //     width: 150
  // },
  // {
  //     title: "Passed?",
  //     field: "passed",
  //     align: "center",
  //     formatter: "tickCross",
  //     width: 150
  // }
];

// function SimpleButton(props) {
//   const cellData = props.cell._cell.row.data;
//   return <button onClick={() => props.onSelect(cellData.name)}> Show </button>;
// }

// const rowClick = (e, row) => {
//   console.log("ref table: ", this.ref.table); // this is the Tabulator table instance
//   console.log("rowClick id: ${row.data().id}", row, e);
//   this.setState({
//     selectedName: row.AssName
//   });
// };

const options = {
  //  height: 150,
  movableRows: true
};
class Table extends Component {
  constructor(props) {
    super(props);
    this.state = {
      assessmentData: []
    };

    console.log("Constructor start date entered", this.props.startDate);
  }
  ref = null;

  clearData = () => {
    this.setState({ assessmentData: [] });
    console.log("data cleared ", this.state.assessmentData);
  };

  componentDidMount() {
    //load up the assessment table
    this.loadAllFiles();
  }
  //load up the files with assessments and dates
  loadAllFiles() {
    this.clearData();

    loadAssessmentsFile(this.props.startDate).then(a => {
      this.setState(
        () => ({
          assessmentData: a
        }),
        () => {
          console.log("start date exited", this.props.startDate); //  this.WordGeneration(); //run when completed above
        }
      );
    });
  }

  render() {
    return (
      <div>
        <ReactTabulator
          ref={ref => (this.ref = ref)}
          columns={columns}
          data={this.state.assessmentData}
          // rowClick={rowClick}
          options={options}
          layout={"fitData"}
          reactiveData={true} //enable data reactivity
          resizableRows={true}
          data-custom-attr="test-custom-attribute"
          className="Midnight"
        />
        {/* <div>Selected Name: {this.state.selectedName}</div> */}
      </div>
    );
  }
}

export default Table;
