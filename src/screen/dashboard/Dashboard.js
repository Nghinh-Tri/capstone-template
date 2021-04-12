import React, { Component } from 'react';
import { checkSession } from '../../service/action/AuthenticateAction';
import { connect } from 'react-redux';
import { fetchDataStatistics } from "../../service/action/StatisticAction";
// import TimeLine from '../../component/Chart/timeLine';
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


    componentWillReceiveProps(prevProps) {
        if (prevProps.dataStatistics !== this.props.dataStatistics) {
            if (this.props.dataStatistics.length > 0)
                this.setState({ isLoad: false })
            console.log('componentWillReceiveProps', this.props.dataStatistics)
        }
    }
    // onShowTimeLineList = (dataStatisticList) => {
    //     var result = null
    //     if (typeof dataStatisticList !== 'undefined' || dataStatisticList.length > 0) {
    //         return (
    //             <TimeLine dataStatisticList={dataStatisticList} />
    //         )
    //     }
    //     return result
    // }

    render() {
        var result = []
        var { dataStatistics } = this.props
        if (dataStatistics.length > 0)
            result = dataStatistics
        return (
            <React.Fragment>
                <ol class="breadcrumb mb-4 mt-3">
                    <li class="breadcrumb-item active">Dashboard</li>
                </ol>
                <div className="container-fluid">
                    {/* {this.state.isLoad ?
                    <div className='row justify-content-center'>
                        <Spin className='text-center' size="large" />
                    </div>
                    :
                    this.onShowTimeLineList(result)
                } */}

                    {/* <TimeLine/> */}
                    {/* <div className="row">
                    <div className="col-lg-3 col-md-6 col-sm-6">
                        <div className="card card-stats">
                            <div className="card-header card-header-warning card-header-icon">
                                <div className="card-icon">
                                    <i className="material-icons">content_copy</i>
                                </div>
                                <p className="card-category">Used Space</p>
                                <h3 className="card-title">49/50
                                    <small>GB</small>
                                </h3>
                            </div>
                            <div className="card-footer">
                                <div className="stats">
                                    <i className="material-icons text-danger">warning</i>
                                    <a>Get More Space...</a>


                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-lg-3 col-md-6 col-sm-6">
                        <div className="card card-stats">
                            <div className="card-header card-header-success card-header-icon">
                                <div className="card-icon">
                                    <i className="material-icons">store</i>
                                </div>
                                <p className="card-category">Revenue</p>
                                <h3 className="card-title">$34,245</h3>
                            </div>
                            <div className="card-footer">
                                <div className="stats">
                                    <i className="material-icons">date_range</i> Last 24 Hours
                                 </div>
                            </div>
                        </div>
                    </div>



                    <div className="col-lg-3 col-md-6 col-sm-6">
                        <div className="card card-stats">
                            <div className="card-header card-header-danger card-header-icon">
                                <div className="card-icon">
                                    <i className="fa fa-users" />
                                </div>
                                <p className="card-category">All Employees</p>
                                <h3 className="card-title">75</h3>
                            </div>
                            <div className="card-footer">
                                <div className="stats">
                                    <i className="material-icons">local_offer</i>
                                </div>
                            </div>
                        </div>
                    </div>



                    <div className="col-lg-3 col-md-6 col-sm-6">
                        <div className="card card-stats">
                            <div className="card-header card-header-info card-header-icon">
                                <div className="card-icon">
                                    <i className="fa fa-product-hunt" />
                                </div>
                                <p className="card-category">All Project</p>
                                <h3 className="card-title">+245</h3>
                            </div>
                            <div className="card-footer">
                                <div className="stats">
                                    <i className="material-icons">update</i>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-6">
                        <div className="card card-chart">
                            <div>
                                <div className="ct-chart">
                                </div>
                            </div>
                            <div className="card-body">
                                <h4 className="card-title">Daily Sales</h4>
                                <p className="card-category">
                                    <span className="text-success"><i className="fa fa-long-arrow-up" /> 55% </span> increase in today sales.</p>
                            </div>
                            <div className="card-footer">
                                <div className="stats">
                                    <i className="material-icons">access_time</i> updated 4 minutes ago
                                </div>
                            </div>
                        </div>
                    </div>


                    <div className="col-md-6">
                        <div className="card card-chart">
                            <div >
                                <div className="ct-chart" />
                            </div>
                            <div className="card-body">
                                <h4 className="card-title">Email Subscriptions</h4>
                                <p className="card-category">Last Campaign Performance</p>
                            </div>
                            <div className="card-footer">
                                <div className="stats">
                                    <i className="material-icons">access_time</i> campaign sent 2 days ago
                                </div>
                            </div>
                        </div>
                    </div>



                    <div className="col-md-6">
                        <div className="card card-chart">
                            <div>
                                <div className="ct-chart" />
                            </div>
                            <div className="card-body">
                                <h4 className="card-title">Completed Tasks</h4>
                                <p className="card-category">Last Campaign Performance</p>
                            </div>
                            <div className="card-footer">
                                <div className="stats">
                                    <i className="material-icons">access_time</i> campaign sent 2 days ago
                                </div>
                            </div>
                        </div>
                    </div>


                    <div className="col-md-6">
                        <div className="card card-chart">
                            <div>
                                <div className="ct-chart" />
                            </div>
                            <div className="card-body">
                                <h4 className="card-title">Completed Tasks</h4>
                                <p className="card-category">Last Campaign Performance</p>
                            </div>
                            <div className="card-footer">
                                <div className="stats">
                                    <i className="material-icons">access_time</i> campaign sent 2 days ago
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-6">
                        <div className="card card-chart">
                            <div>
                                <div className="ct-chart" />
                            </div>
                            <div className="card-body">
                                <h4 className="card-title">Completed Tasks</h4>
                                <p className="card-category">Last Campaign Performance</p>
                            </div>
                            <div className="card-footer">
                                <div className="stats">
                                    <i className="material-icons">access_time</i> campaign sent 2 days ago
                                </div>
                            </div>
                        </div>
                    </div>

                </div> */}

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
