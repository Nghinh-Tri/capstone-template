import React, { Component } from 'react';
import { connect } from 'react-redux';
import { convertCertificationList, convertSkillList } from '../../../service/util/util';
import SelectBar from '../../select-search/SelectBar';
import { fetchCertification } from "../../../service/action/CertificationSelectBarAction";

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

    componentDidMount = () => {
        this.props.fetchCertificationList()
    }

    onDeleteHardSkill = (hardSkillIndex, positionFormIndex) => {
        this.props.onDeleteHardSkill(hardSkillIndex, positionFormIndex)
    }

    render() {
        var { hardSkillIndex, positionFormIndex, certificationList, hardSkillDetail, listNotSelect, length } = this.props
        var hardSkillListConverted = convertSkillList(listNotSelect)
        var certificationListConverted = convertCertificationList(certificationList)
        return (
            <tr>
                <td>
                    <SelectBar name="hardSkill"
                        type="unique"
                        isDelete={hardSkillDetail.isDelete}
                        placeholder="Select a hard skill"
                        positionFormIndex={positionFormIndex}
                        hardSkillIndex={hardSkillIndex}
                        list={hardSkillListConverted}
                        value={hardSkillDetail.hardSkillID}
                        onUpdateHardSkillID={this.props.onUpdateHardSkillID}
                    />
                </td>
                <td>
                    <SelectBar name="skillLevel"
                        type="common"
                        placeholder="Select skill level"
                        positionFormIndex={positionFormIndex}
                        hardSkillIndex={hardSkillIndex}
                        list={this.state.skillLevel}
                        value={hardSkillDetail.skillLevel}
                        onUpdateSkillLevel={this.props.onUpdateSkillLevel}
                    />
                </td>
                <td>
                    <SelectBar name="certiLevel"
                        type="common"
                        placeholder="Select skill level"
                        positionFormIndex={positionFormIndex}
                        hardSkillIndex={hardSkillIndex}
                        list={certificationListConverted}
                        value={hardSkillDetail.certificationLevel}
                        onUpdateHardSkillCerti={this.props.onUpdateHardSkillCerti}
                    />
                </td>
                <td>
                    <SelectBar name="hardSkillPriority"
                        type="common"
                        placeholder="Select priority"
                        positionFormIndex={positionFormIndex}
                        hardSkillIndex={hardSkillIndex}
                        list={this.state.priority}
                        value={hardSkillDetail.priority}
                        onUpdateHardSkillPriority={this.props.onUpdateHardSkillPriority}
                    />
                </td>
                {hardSkillDetail.isDelete ?
                    <span className="material-icons"
                        style={{ marginTop: 13, paddingLeft: 10, cursor: 'pointer' }}
                        onClick={() => this.onDeleteHardSkill(hardSkillIndex, positionFormIndex)}>clear</span>
                    : <div style={{ paddingLeft: 35 }} ></div>
                }
            </tr>
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