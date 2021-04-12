import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import ProgressBar from "../../component/progress-bar/ProgressBar";
import * as Action from "../../service/action/SuggestCandidateAction";
import { checkSession } from "../../service/action/AuthenticateAction";
import { compose } from "redux";
import SelectBar from "../../component/select-search/SelectBar";
import SuggestCandidates from "../../component/suggest-candidate/SuggestCandidatesTable";
import { history } from "../../service/helper/History";
import { Spin } from "antd";

class SuggestCandidate extends Component {
    constructor(props) {
        super(props);
        this.state = {
            page: 1,
            positionList: [],
            positionSelect: 0,
            count: 0,
            isLoading: true
        };
    }

    onSelectPos = (value) => {
        this.setState({ positionSelect: value });
    };

    onShowSuggestCandidate = (suggestCandidateList) => {
        var result = null;
        if (typeof suggestCandidateList !== "undefined") {
            result = suggestCandidateList.map((candidate, index) => {
                return (
                    <React.Fragment>
                        <tr>
                            <th style={{ width: 50 }}>{index + 1}</th>
                            <th style={{ width: 250 }}>{candidate.empName}</th>
                            <th style={{ width: 250 }}>{candidate.languageMatch.toFixed(2)}/10</th>
                            <th style={{ width: 250 }}>{candidate.softSkillMatch.toFixed(2)}/10</th>
                            <th style={{ width: 250 }}>{candidate.hardSkillMatch.toFixed(2)}/10</th>
                            <th style={{ width: 250 }}>{candidate.overallMatch.toFixed(2)}/100</th>
                            <th style={{ width: 100 }}>
                                <input type="checkbox" />
                            </th>
                        </tr>
                    </React.Fragment>
                );
            });
        }
        return result;
    };

    componentDidMount = () => {
        this.props.checkSession();
        this.props.fetchSuggestCandidateList();
        if (typeof this.props.location.state !== "undefined")
            this.setState({ isUpdate: this.props.location.state.isUpdate });
    };

    componentDidUpdate = (prevProps, prevState) => {
        if (prevProps.suggestCandidateList !== this.props.suggestCandidateList)
            if (this.props.suggestCandidateList.length > 0) {
                var temp = [], count = this.state.count, select = this.state.positionSelect

                this.props.suggestCandidateList.forEach(element => {
                    var obj = { label: element.position, value: element.posId }
                    if (count === 0) {
                        count++
                        select = element.posId
                    }
                    temp.push(obj)
                });
                this.setState({ positionList: temp, positionSelect: select, count: count, isLoading: false })
            }
    }

    onSelected = (index) => {
        this.props.onPositionSelect(index);
    };

    selectCandidate = (candidate, item, limit) => {
        this.props.selectCandidate(candidate, item, limit);
    };

    unselectCandidate = (candidate, position) => {
        this.props.unSelectCandidate(candidate, position);
    };

    getSelectedCandidateList = (suggestCandidateItem, selecedCandidateList) => {
        for (let k = 0; k < selecedCandidateList.length; k++) {
            if (suggestCandidateItem.position === selecedCandidateList[k].position)
                return selecedCandidateList[k];
        }
        return null;
    };

    onSort = (value) => {
        this.props.onSortSuggestList(value);
    };

    onHandle = () => {
        history.push("/project/confirm-select-candidates", {
            isUpdate: this.state.isUpdate,
        });
    };

    onCancel = () => {
        history.goBack();
    };

    onSelectAll = (item) => {
        this.props.selectAll(item);
    };

    onUnSelectAll = (position) => {
        this.props.unSelectAll(position);
    };

    getSelectItem = () => {
        var result = []
        var { suggestCandidateList } = this.props
        var { positionSelect } = this.state
        for (let index = 0; index < suggestCandidateList.length; index++) {
            if (suggestCandidateList[index].posId === positionSelect)
                result = suggestCandidateList[index]
        }
        return result
    }

    render() {
        var { candidateSelectedList, suggestCandidateList } = this.props
        return (
            <React.Fragment>
                <ProgressBar current="2" />
                <div class="card mb-4">
                    <div class="card-header">
                        <i class="fas fa-table mr-1"></i>Candidates
                    </div>
                    {this.state.isLoading ? '' :
                        <form class="d-none d-md-inline-block form-inline mr-auto ">
                            <div className="col-auto" style={{ marginTop: 20, marginLeft: 10 }}>
                                <SelectBar
                                    type="special"
                                    name="positionSelect"
                                    list={this.state.positionList}
                                    value={this.state.positionSelect}
                                    onSelectPos={this.onSelectPos}
                                />
                            </div>
                        </form>
                    }
                    {this.state.isLoading ?
                        <div className='row justify-content-center'>
                            <Spin className='text-center' size="large" />
                        </div> :
                        <div class="card-body">
                            <SuggestCandidates
                                onSort={this.onSort}
                                item={this.getSelectItem()}
                                onSelectCandidate={this.selectCandidate}
                                selectedItem={this.getSelectedCandidateList(this.getSelectItem(), candidateSelectedList)}
                                onUnselectCandidate={this.unselectCandidate}
                                onSelectAll={this.onSelectAll}
                                onUnSelectAll={this.onUnSelectAll}
                            />
                        </div>
                    }
                </div>
                {this.state.isLoading ? '' :
                    <div className="col">
                        <button type="submit" onClick={this.onHandle} className="btn btn-primary pull-right pt" style={{ marginBottom: 20, marginRight: 20, marginTop: 0 }}>Next</button>
                    </div>
                }
            </React.Fragment >
        );
    }
}

const mapStateToProps = (state) => {
    return {
        suggestCandidateList: state.SuggestCandidateList,
        selectedIndex: state.SuggestCandidateSelect,
        candidateSelectedList: state.SuggestCandidateSelectedListReducer,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onPositionSelect: (index) => {
            dispatch(Action.setPositionSelect(index));
        },
        selectCandidate: (candidate, candidateList, limit) => {
            dispatch(Action.selectCandidate(candidate, candidateList, limit));
        },
        unSelectCandidate: (candidate, position) => {
            dispatch(Action.unselectCandiate(candidate, position));
        },
        fetchSuggestCandidateList: () => {
            dispatch(Action.fetchSuggestList());
        },
        onSortSuggestList: (value) => {
            dispatch(Action.sortSuggestList(value));
        },
        checkSession: () => {
            dispatch(checkSession());
        },
        selectAll: (candidateList) => {
            dispatch(Action.selectAllCandidates(candidateList));
        },
        unSelectAll: (position) => {
            dispatch(Action.unselectAllCandiates(position));
        },
    };
};

export default compose(
    withRouter,
    connect(mapStateToProps, mapDispatchToProps)
)(SuggestCandidate);
