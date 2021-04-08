import React, { Component } from 'react';
import { Chrono } from "react-chrono"
import './Style.css'


class timeLine extends Component {

  render() {
    var { dataStatisticList } = this.props
    let data = [];
    var txt1 = "DateCreate : ";
    var txt2 = "DateEnd: ";
    dataStatisticList.map(item => data.push({
      title: item.name,
      cardTitle: txt1.concat(item.dateCreated),
      cardSubtitle: txt2.concat(item.dateEnd),
      cardDetailedText: "Description",
    }));

    return (
      <div className="timeLine">
        <div style={{ width: "2000px", height: "400px" }}>
          <Chrono items={data} mode="HORIZONTAL" >

          </Chrono>
        </div>
      </div>
    );
  }
}

export default timeLine;