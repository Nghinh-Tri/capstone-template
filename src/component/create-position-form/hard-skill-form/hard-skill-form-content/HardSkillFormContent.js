import React, { Component } from 'react';
import { connect } from 'react-redux';
import SelectSearch from '../../select-search/SelectSearch';
import { fetchHardSkill } from "../../../../service/action/HardSkillSelectBarAction";
import { fetchCertification } from "../../../../service/action/CertificationSelectBarAction";
import { convertSkillList, convertCertificationList } from "../../../../service/util/util";
import SelectBar from '../../select-search/SelectBar';

class HardSkillFormContent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            priority: [
                { label: 1, value: 1 },
                { label: 2, value: 2 },
                { label: 3, value: 3 },
                { label: 4, value: 4 },
                { label: 5, value: 5 },
                { label: 6, value: 6 },
                { label: 7, value: 7 },
                { label: 8, value: 8 },
                { label: 9, value: 9 },
                { label: 10, value: 10 },
            ]
        }
    }

    onUpdate = event => {
        var { hardSkillIndex, positionFormIndex } = this.props
        var value = event.target.value
        var name = event.target.name
        this.props.updateHardSkillExp(hardSkillIndex, positionFormIndex, value, name)
    }

    componentDidMount = () => {
        this.props.fetchCertificationList()
    }

    onDeleteHardSkill = (hardSkillIndex, positionFormIndex) => {
        this.props.onDeleteHardSkill(hardSkillIndex, positionFormIndex)
    }

    render() {
        var { hardSkillIndex, positionFormIndex, certificationList, hardSkillDetail, listNotSelect } = this.props
        var hardSkillListConverted = convertSkillList(listNotSelect)
        var certificationListConverted = convertCertificationList(certificationList)
        return (
            <div className="row">

                {/* Skill */}
                <div className="col mt-15-ml-30">
                    <label className="bmd-label">
                        <h5 className="font-weight-bold">Skill</h5>
                    </label>
                </div>
                <div className="col-2">
                    <SelectBar
                        positionFormIndex={positionFormIndex}
                        hardSkillIndex={hardSkillIndex}
                        list={hardSkillListConverted}
                        name="hardSkill"
                        value={hardSkillDetail.hardSkillID}
                        onUpdateHardSkillID={this.props.onUpdateHardSkillID}
                    />
                </div>

                {/* Exp */}
                <div className="col mt-15-ml-30">
                    <label className="bmd-label">
                        <h5 className="font-weight-bold">Experience</h5>
                    </label>
                </div>
                <div className="col">
                    <div className="form-group">
                        <input type="number" name="exp" className="form-control" value={hardSkillDetail.exp} min="0" onChange={this.onUpdate} />
                    </div>
                </div>
                <div className="col">
                    <label className="bmd-label label mt-10">
                        Years
                    </label>
                </div>

                {/* Certi */}
                <div className="col mt-15-ml-30 mr-10">
                    <label className="bmd-label  ">
                        <h5 className="font-weight-bold">
                            Certification Level
                        </h5>
                    </label>
                </div>
                <div className="col-2">
                    <SelectSearch positionFormIndex={positionFormIndex}
                        hardSkillIndex={hardSkillIndex}
                        list={certificationListConverted}
                        name="certiID"
                        value={hardSkillDetail.certificationID}
                        onUpdateHardSkillCerti={this.props.onUpdateHardSkillCerti} />
                </div>

                {/* Priority */}
                <div className="col mt-15-ml-30">
                    <label className="bmd-label">
                        <h5 className="font-weight-bold">
                            Priority
                </h5>
                    </label>
                </div>
                <div className="col">
                    <SelectSearch positionFormIndex={positionFormIndex}
                        hardSkillIndex={hardSkillIndex}
                        list={this.state.priority}
                        name="hardSkillPriority"
                        value={hardSkillDetail.priority}
                        onUpdateHardSkillPriority={this.props.onUpdateHardSkillPriority}
                    />
                </div>

                {/* Button Delete */}
                <div className="col mt-15-ml-30">
                    <span className="material-icons pull-right clear"
                        onClick={() => this.onDeleteHardSkill(hardSkillIndex, positionFormIndex)}>clear</span>
                </div>
            </div>

        );
    }
}

const mapStateToProps = (state) => {
    return {
        certificationList: state.CertificationSelectBarReducer
    }
}

const mapDispatchToProp = (dispatch, props) => {
    return {
        fetchCertificationList: () => {
            dispatch(fetchCertification())
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProp)(HardSkillFormContent);