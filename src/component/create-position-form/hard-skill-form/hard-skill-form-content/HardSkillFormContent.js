import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchCertification } from "../../../../service/action/CertificationSelectBarAction";
import { convertSkillList, convertCertificationList } from "../../../../service/util/util";
import SelectBar from '../../select-search/SelectBar';

class HardSkillFormContent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            priority: [
                { label: 10, value: 10 },
                { label: 9, value: 9 },
                { label: 8, value: 8 },
                { label: 7, value: 7 },
                { label: 6, value: 6 },
                { label: 5, value: 5 },
                { label: 4, value: 4 },
                { label: 3, value: 3 },
                { label: 2, value: 2 },
                { label: 1, value: 1 },
            ],
            skillLevel: [
                { label: 'Basic Knowledge', value: 1 },
                { label: 'Limited Experience', value: 2 },
                { label: 'Practical', value: 3 },
                { label: 'Applied Theory', value: 4 },
                { label: 'Recognized Authority', value: 5 },
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
            <div className="row" style={{ marginLeft: 10, marginBottom: 25, boxShadow: '0 5px 5px 0 rgb(0 0 0 / 20%)', width: '1130px' }} >
                {/* Skill */}
                <div class="col">
                    <div class="row" style={{ marginBottom: 10, marginLeft: 20, marginTop: 20 }}>
                        <label className="bmd-label" >
                            <h5 className="font-weight-bold">Skill</h5>
                        </label>
                    </div>
                    <div class="row" style={{ marginBottom: 20, marginLeft: 20 }}>
                        <SelectBar
                            positionFormIndex={positionFormIndex}
                            hardSkillIndex={hardSkillIndex}
                            list={hardSkillListConverted}
                            name="hardSkill"
                            value={hardSkillDetail.hardSkillID}
                            onUpdateHardSkillID={this.props.onUpdateHardSkillID}
                        />
                    </div>
                </div>


                {/* Skill Level */}
                <div className='col'>
                    <div class="row" style={{ marginBottom: 10, marginTop: 20 }}>
                        <label className="bmd-label">
                            <h5 className="font-weight-bold">Skill Level</h5>
                        </label>
                    </div>

                    <div class="row" style={{ marginBottom: 20 }}>
                        <SelectBar
                            positionFormIndex={positionFormIndex}
                            hardSkillIndex={hardSkillIndex}
                            list={this.state.skillLevel}
                            name="skillLevel"
                            value={hardSkillDetail.skillLevel}
                            onUpdateSkillLevel={this.props.onUpdateSkillLevel}
                        />
                    </div>
                </div>


                {/* Certi */}
                <div className="col">
                    <div class="row" style={{ marginBottom: 10, marginTop: 20 }}>
                        <label className="bmd-label">
                            <h5 className="font-weight-bold">
                                Certification Level
                        </h5>
                        </label>
                    </div>
                    <div class="row" style={{ marginBottom: 20 }}>
                        <SelectBar
                            positionFormIndex={positionFormIndex}
                            hardSkillIndex={hardSkillIndex}
                            list={certificationListConverted}
                            name="certiLevel"
                            value={hardSkillDetail.certificationLevel}
                            onUpdateHardSkillCerti={this.props.onUpdateHardSkillCerti}
                        />
                    </div>
                </div>

                {/* Priority */}
                <div className="col">
                    <div class="row" style={{ marginBottom: 10, marginTop: 20 }}>
                        <label className="bmd-label">
                            <h5 className="font-weight-bold">
                                Priority
                            </h5>
                        </label>
                    </div>
                    <div class="row" style={{ marginBottom: 20 }}>
                        <SelectBar
                            positionFormIndex={positionFormIndex}
                            hardSkillIndex={hardSkillIndex}
                            list={this.state.priority}
                            name="hardSkillPriority"
                            value={hardSkillDetail.priority}
                            onUpdateHardSkillPriority={this.props.onUpdateHardSkillPriority}
                        />
                    </div>
                </div>

                {/* Button Delete */}
                <div className="col-auto mt-15-ml-30">
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