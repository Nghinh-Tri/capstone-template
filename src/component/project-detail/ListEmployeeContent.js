import { Modal, notification, Spin } from 'antd';
import moment from 'moment';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { addMoreCandidate, getPrevRequire, getPrevRequireSuccess, suggestAgain } from '../../service/action/position/PositionAction';
import { getRole, showHardSkillLevel } from '../../service/util/util';
import { groupColor } from './GroupColor';

class ListEmployeeContent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            isLoading: false
        }
    }

    componentDidMount = () => {
        if (this.props.item.missingEmployee > 0) {
            this.props.getPrevRequire(this.props.item.requiredPosID)
        } else {
            this.props.refreshPrevRequire()
        }
    }

    componentDidUpdate = (prevProp) => {
        if (prevProp.item !== this.props.item) {
            if (typeof this.props.item !== 'undefined') {
                if (this.props.item.missingEmployee > 0) {
                    this.props.getPrevRequire(this.props.item.requiredPosID)
                } else {
                    this.props.refreshPrevRequire()
                }
            }
        }
    }

    findEmployeeGroup = (empID) => {
        let result = 0
        let { groupEmployee } = this.props
        Object.keys(groupEmployee).forEach(group => {
            let temp = groupEmployee[group]
            temp.forEach(element => {
                if (element.empID === empID) {
                    result = element.group
                }
            });
        })
        return result
    }

    showCandidate = (employees) => {
        var result = null
        result = employees.map((employee, index) => {
            return (
                <tr key={index} style={{ backgroundColor: groupColor[this.findEmployeeGroup(employee.empID)].color }} >
                    <th >
                        <NavLink className="text-primary" to={`/project/detail/emp/${employee.empID}`}>{employee.name}</NavLink>
                    </th>
                    <th>{employee.email}</th>
                    <th className="text-center">{employee.phoneNumber}</th>
                    <th className="text-center">
                        {employee.dateIn === null ? "-" : moment(employee.dateIn).format('DD-MM-YYYY')}
                    </th>
                </tr>
            )
        })
        return result
    }

    onSelectCandidatesAgain = () => {
        this.setState({ visible: true })
    }

    onAddMoreCandidates = () => {
        localStorage.setItem('projectId', this.props.projectID)
        localStorage.setItem('projectType', this.props.projectType)
        localStorage.setItem('projectField', this.props.projectField)
        localStorage.setItem('projectName', this.props.projectName)
        localStorage.setItem('dateCreate', this.props.dateBegin)
        localStorage.setItem('dateEnd', this.props.dateEstimatedEnd)
        this.props.addMoreCandidate(this.props.item.posID)
    }

    handleOk = () => {
        var { prevRequire } = this.props
        if (prevRequire.status === 2 || prevRequire.status === 0) {
            var obj = {
                requiredPosID: prevRequire.requiredPosID,
                posID: prevRequire.posID,
                candidateNeeded: prevRequire.missingEmployee,
                language: [],
                softSkillIDs: [],
                hardSkills: []
            }
            prevRequire.language.forEach(element => {
                var language = { langID: element.langID, priority: element.priority }
                obj.language.push(language)
            });
            prevRequire.hardSkills.forEach(element => {
                var hardSkill = { hardSkillID: element.hardSkillID, skillLevel: element.skillLevel, certificationLevel: element.certificationLevel, priority: element.priority }
                obj.hardSkills.push(hardSkill)
            });
            prevRequire.softSkillIDs.forEach(element => {
                obj.softSkillIDs.push(element.softSkillID)
            });
            var array = []
            array.push(obj)

            localStorage.setItem('projectId', this.props.projectID)
            localStorage.setItem('projectType', this.props.projectType)
            localStorage.setItem('projectField', this.props.projectField)
            localStorage.setItem('projectName', this.props.projectName)
            localStorage.setItem('dateCreate', this.props.dateBegin)
            localStorage.setItem('dateEnd', this.props.dateEstimatedEnd)
            localStorage.setItem('positionRequire', JSON.stringify(array))
            this.props.suggestAgain()
        } else if (prevRequire.status === 1) {
            notification.open({
                message: 'Require is being confirm',
                placement: 'bottomRight',
                duration: 0
            });
        }
    }

    handleCancel = (e) => {
        this.setState({ visible: false });
    }

    showHardSkill = (skills) => {
        var result = null
        result = skills.map((value, index) => {
            return (
                <ul key={index} style={{ width: 300 }}>
                    <li>{value.hardSkillName}</li>
                    <li>Skill Level: {showHardSkillLevel(value.skillLevel)}</li>
                    <li>
                        Certificate Level: {value.certificationLevel === 0 ? 'All' : 'Level ' + value.certificationLevel}  <br />
                    </li>
                    <li>
                        Priority: {value.priority}
                    </li>
                </ul>
            )
        })
        return result
    }

    showLanguage = (language) => {
        var result = null
        result = language.map((value, index) => {
            return (
                <ul key={index} style={{ width: 200 }}>
                    <li>{value.langName}</li>
                    <li>Priority: {value.priority}</li>
                </ul>
            )
        })
        return result
    }

    showSoftSkill = (softSkill) => {
        var result = null
        result = softSkill.map((value, index) => {
            return (
                <ul key={index} style={{ width: 200 }} >
                    <li>{value.softSkillName}</li>
                </ul>
            )
        })
        return result
    }

    render() {
        var { item, prevRequire } = this.props
        return (
            <React.Fragment>
                {this.state.isLoading ?
                    <div className='row justify-content-center'>
                        <Spin className='text-center' size="large" />
                    </div> :
                    typeof item !== 'undefined' ?
                        <>
                            <div className='row pull-right' style={{ width: 'auto' }} >
                                <h5 style={{ marginRight: 14 }} >{item.candidateNeeded - item.missingEmployee} / {item.candidateNeeded} Employees </h5>
                            </div>
                            {
                                item.employees.length === 0 ?
                                    <div className='row justify-content-center'>
                                        <h4 style={{ fontStyle: 'italic', color: 'gray' }}>No employee available for this position</h4>
                                    </div>
                                    :
                                    <div className="table-responsive">
                                        <table className="table table-bordered" id="dataTable" width="100%" cellspacing="0">
                                            <thead className="font-weight-bold text-center text-primary">
                                                <th>Name</th>
                                                <th>Email</th>
                                                <th>Phone</th>
                                                <th width={150}>Confirmed Date</th>
                                            </thead>
                                            <tbody>
                                                {this.showCandidate(item.employees)}
                                            </tbody>
                                        </table>
                                    </div>
                            }
                            {getRole() === 'PM' ?
                                this.props.projectStatus === 4 ? "" :
                                    typeof prevRequire.posName !== 'undefined' ?
                                        <>
                                            <button type="submit" className="btn btn-primary pull-right" onClick={this.onSelectCandidatesAgain}  >
                                                Select Candidates Again
                                        </button>
                                            <Modal title={<span style={{ color: 'red', fontWeight: 600 }} >
                                                System will suggest suitable employees based on these requirements
                                                </span>}
                                                width={1000}
                                                visible={this.state.visible}
                                                onOk={this.handleOk}
                                                onCancel={this.handleCancel} >
                                                <div>
                                                    <div style={{ display: 'flex', flexDirection: 'row', marginBottom: 10 }} >
                                                        <span style={{ fontWeight: 600 }} >{prevRequire.posName}</span>
                                                        <span style={{ marginLeft: 300, fontWeight: 600 }} >Candidate Needed:</span>
                                                        <span style={{ marginLeft: 20 }}>{prevRequire.missingEmployee}</span>
                                                    </div>
                                                    <div style={{ marginTop: 10, marginBottom: 10 }} >
                                                        <div style={{ marginTop: 10, marginBottom: 10, fontWeight: 600 }}>Hard Skill</div>
                                                        <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }} >
                                                            {this.showHardSkill(prevRequire.hardSkills)}
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <div style={{ marginTop: 10, marginBottom: 10, fontWeight: 600 }}>Language</div>
                                                        <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }} >
                                                            {this.showLanguage(prevRequire.language)}
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <div style={{ marginTop: 10, marginBottom: 10, fontWeight: 600 }}>Soft Skill</div>
                                                        <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }} >
                                                            {this.showSoftSkill(prevRequire.softSkillIDs)}
                                                        </div>
                                                    </div>
                                                </div>
                                            </Modal>
                                        </> :
                                        ''
                                : ''}
                        </>
                        : ''
                }
            </React.Fragment>
        );
    }
}

const mapStateToProps = state => {
    return {
        prevRequire: state.PreviosRequrieReducer
    }
}

const mapDispatchToProp = dispatch => {
    return {
        addMoreCandidate: (posID) => {
            dispatch(addMoreCandidate(posID))
        },
        getPrevRequire: (requireID) => {
            dispatch(getPrevRequire(requireID))
        },
        suggestAgain: () => {
            dispatch(suggestAgain())
        },
        refreshPrevRequire: () => {
            dispatch(getPrevRequireSuccess({}))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProp)(ListEmployeeContent);