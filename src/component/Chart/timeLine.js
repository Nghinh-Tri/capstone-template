import React, { Component } from 'react';
import { Chrono } from "react-chrono"
import './Style.css'
import moment from 'moment';




class timeLine extends Component {

  render() {
    var { dataStatisticList } = this.props
    let data = [];
    var txt1 = "DateCreate : ";
    var txt2 = "DateEnd: ";
    dataStatisticList.map(item => data.push({
      title: item.name,
      cardTitle: txt1.concat(moment(item.dateCreated).format('DD-MM-YYYY')),
      cardSubtitle: txt2.concat(moment(item.dateEnd).format('DD-MM-YYYY')),
      cardDetailedText: "Description",
    }));


    return (
      <div className="timeLine">
        <div style={{ width: "100%", height: "1000px" }}>
          <Chrono items={data} mode="VERTICAL" >
            
          </Chrono>
        </div>
      </div>
    );
  }
}

export default timeLine;