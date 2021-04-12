import React, { Component } from "react";
import { connect } from "react-redux";
import * as Action from "../../service/action/ProfileAction";
// import ProjectTableItem from "../../component/project-table-item/ProjectTableItem";
import { checkSession } from "../../service/action/AuthenticateAction";
import { getRole, showSpan, showStatus } from "../../service/util/util";
// import Search from '../../component/search/Search';
import { Pagination, Spin } from "antd";
import Search from "../../component/search/Search";
import moment from "moment";
import { NavLink } from "react-bootstrap";
import { showRole } from "../../service/util/util";

class Emplist extends Component {
  constructor(props) {
    super(props);
    this.state = {
      profile: {
        name: "",
        phoneNumber: "",
        userName: "",
        email: "",
        identityNumber: "",
        address: "",
        roles: "",
      },
      pageIndex: 1,
      pageSize:10,
      search: "",
      isLoading: true,
    };
  }

  componentDidMount = () => {
    this.props.checkSession();
    this.props.fetchProfile(
      this.state.pageIndex,
      this.state.pageSize,
      this.state.search
    );
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.profiles !== prevState.profiles) {
      return { someState: nextProps.profiles };
    }
    return null;
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.profiles !== this.props.profiles) {
      if (typeof this.props.profiles.items !== "undefined") {
        this.setState({ isLoading: false });
      }
    }
  }

  // onGenerateProfile = (isCreateNew) => {
  //   this.props.generateProfile(this.state.profile, isCreateNew);
  //   localStorage.setItem("empID", 0);
  // };

  onShowListProfile = (profileList) => {
    var result = null;
    if (typeof profileList !== "undefined") {
      result = profileList.map((profile, index) => {
        return (
          <React.Fragment>
            <tr>
              <th style={{ width: 50 }}>{index + 1}</th>
              <th style={{ width: 250 }}>{profile.name}</th>
              <th style={{ width: 250 }}>{profile.phoneNumber}</th>
              <th style={{ width: 250 }}>{profile.email}</th>
              <th style={{ width: 250 }}>{profile.userName}</th>
              <th style={{ width: 250 }}>{showRole(profile.roleName)}</th>
              <th style={{ width: 100 }}>
                <NavLink
                  className="text-primary"
                  to={`/project/detail/${profile.id}`}
                >
                  Detail
                </NavLink>
              </th>
            </tr>
          </React.Fragment>
        );
      });
    }
    return result;
  };

  handleChange = (event, value) => {
    this.props.fetchProfile(event, value ,this.state.search);
  };
  
  // onNext = () => {
  //   var { profiles } = this.props;
  //   if (profiles.pageIndex < profiles.pageCount)
  //     this.props.fetchProfile(profiles.pageIndex + 1, this.state.search);
  // };

  // onPrevios = () => {
  //   var { profiles } = this.props;
  //   if (profiles.pageIndex > 1)
  //     this.props.fetchProfile(profiles.pageIndex - 1, this.state.search);
  // };

  searchEmp = (value) => {
    this.setState({ search: value });
    this.props.fetchProfile(1, value);
  };

  render() {
    var { profiles } = this.props;
    var items = [];
    if (typeof profiles.items !== "undefined") {
      items = profiles.items;
    }

    return (
      <React.Fragment>
        <ol class="breadcrumb mb-4 mt-3">
          <li class="breadcrumb-item active">Employees</li>
        </ol>
        {/* <div className="container-fluid">
          {getRole() === "PM" ? (
            <button
              type="button"
              className="btn btn-primary"
              style={{
                fontWeight: 700,
                borderRadius: 5,
                marginLeft: 10,
                marginBottom: 15,
              }}
              onClick={() => this.onGenerateProject(profiles.isCreateNew)}
            >
              <div className="row" style={{ paddingLeft: 7, paddingRight: 7 }}>
                <i className="material-icons">add_box</i>Create New Project
              </div>
            </button>
          ) : (
            ""
          )}
        </div> */}
        <div class="card mb-4">
          <div class="card-header">
            <i class="fas fa-table mr-1"></i>
            Employees
          </div>
          <Search />
          <div class="card-body">
            <div class="table-responsive">
              <table
                class="table table-bordered"
                id="dataTable"
                width="100%"
                cellspacing="0"
              >
                <thead>
                  <tr>
                    <th className="font-weight-bold">No</th>
                    <th className="font-weight-bold">Name</th>
                    <th className="font-weight-bold ">Phone</th>
                    <th className="font-weight-bold ">Email</th>
                    <th className="font-weight-bold ">User Name</th>
                    <th className="font-weight-bold ">Role</th>
                    <th className="font-weight-bold"></th>
                  </tr>
                </thead>
                {this.state.isLoading ? (
                  ""
                ) : (
                  <tbody>{this.onShowListProfile(items)}</tbody>
                )}
              </table>
            </div>
          </div>
          <div
            className="row justify-content-center"
            style={{ marginBottom: 20 }}
          >
            <Pagination
              defaultCurrent={1}
              total={profiles.totalRecords ? profiles.totalRecords : 0}
              onChange={this.handleChange}
            />
          </div>
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProp = (state) => {
  return {
    profiles: state.ProfileFetchReducer,
  };
};

const mapDispatchToProp = (dispatch) => {
  return {
    // generateProfile: (profile, isCreateNew) => {
    //   dispatch(Action.generateProfile(profile, isCreateNew));
    // },
    fetchProfile: (pageIndex, pageSize ,search) => {
      dispatch(Action.fetchProfile(pageIndex, pageSize ,search));
    },
    checkSession: () => {
      dispatch(checkSession());
    },
  };
};

export default connect(mapStateToProp, mapDispatchToProp)(Emplist);
