import React, { Component } from 'react';
import { checkSession } from '../../service/action/AuthenticateAction';
import { connect } from 'react-redux';
import { fetchDataStatistics } from "../../service/action/StatisticAction";
import TimeLine from '../../component/Chart/timeLine';
import { Spin } from 'antd';
class Dashboard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoad: true
        }
    }


    componentDidMount = () => {
        this.props.checkSession()
        this.props.fetchDataStatistics()
    }


    componentDidUpdate = (prevProps) => {
        if (prevProps.dataStatistics !== this.props.dataStatistics) {
            if (this.props.dataStatistics.length > 0)
                this.setState({ isLoad: false })
        }
    }


    onShowTimeLineList = (dataStatisticList) => {
        var result = null
        if (typeof dataStatisticList !== 'undefined' || dataStatisticList.length > 0) {
            return (
                <TimeLine dataStatisticList={dataStatisticList} />
            )
        }
        return result
    }

    render() {
        var result = []
        var { dataStatistics } = this.props
        if (dataStatistics.length > 0)
            result = dataStatistics
        console.log(result)
        return (
            <React.Fragment>
                <ol class="breadcrumb mb-4 mt-3">
                    <li class="breadcrumb-item active">Dashboard</li>
                </ol>
                <div className="container-fluid">
                    {this.state.isLoad ?
                        <div className='row justify-content-center'>
                            <Spin className='text-center' size="large" />
                        </div>
                        :
                        this.onShowTimeLineList(result)

                    }



                </div>
            </React.Fragment>

        );
    }
}
const mapStateToProps = (state) => {
    return {
        dataStatistics: state.DataStatisticsReducer
    }
}

const mapDispatchToProp = (dispatch, props) => {
    return {
        checkSession: () => {
            dispatch(checkSession())
        },
        fetchDataStatistics: () => {
            dispatch(fetchDataStatistics())
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProp)(Dashboard);
