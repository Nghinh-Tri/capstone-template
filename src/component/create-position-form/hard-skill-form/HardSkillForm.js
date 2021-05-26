import React, { Component } from 'react';
import { connect } from 'react-redux';
import HardSkillFormContent from './HardSkillFormContent';
import { fetchHardSkill } from "../../../service/action/skill/HardSkillSelectBarAction";

class HardSkillForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            hardSkillDetail: {
                hardSkillID: 0,
                skillLevel: 1,
                certificationLevel: 0,
                priority: 10,
                certiList: [],
                isDelete: true
            },
            isMinimize: true
        }
    }

    componentDidMount = () => {
        this.props.fetchHardSkillList()
    }

    getHardSkillListNotSelect = () => {
        var { hardSkillList, hardSkill } = this.props
        var listNotSelect = hardSkillList.slice(0, hardSkillList.length)
        for (let i = 0; i < listNotSelect.length; i++) {
            for (let k = 0; k < hardSkill.minium.length; k++) {
                if (listNotSelect[i].skillID === hardSkill.minium[k].hardSkillID) {
                    var clone = { ...listNotSelect[i] }
                    clone.isSelect = true
                    listNotSelect[i] = clone
                }
            }
            for (let k = 0; k < hardSkill.option.length; k++) {
                if (listNotSelect[i].skillID === hardSkill.option[k].hardSkillID) {
                    var clone = { ...listNotSelect[i] }
                    clone.isSelect = true
                    listNotSelect[i] = clone
                }
            }
        }
        return listNotSelect
    }

    showMinimumSkills = (hardSkill, positionFormIndex) => {
        var result = null;
        var listNotSelect = this.getHardSkillListNotSelect()
        result = hardSkill.map((hardSkillDetail, hardSkillIndex) => {
            return (
                <HardSkillFormContent key={hardSkillIndex}
                    length={hardSkill.length}
                    hardSkillDetail={hardSkillDetail}
                    hardSkillIndex={hardSkillIndex}
                    positionFormIndex={positionFormIndex}
                    onDeleteHardSkill={this.props.onDeleteHardSkill}
                    onUpdateSkillLevel={this.props.onUpdateSkillLevel}
                    onUpdateHardSkillPriority={this.props.onUpdateHardSkillPriority}
                    onUpdateHardSkillID={this.props.onUpdateHardSkillID}
                    onUpdateHardSkillCerti={this.props.onUpdateHardSkillCerti}
                    listNotSelect={listNotSelect}
                />
            );
        })
        return result;
    }

    onAddHardSkill = (positionFormIndex) => {
        this.props.onAddHardSkill(positionFormIndex, this.state.hardSkillDetail)
    }

    setMinimize = () => {
        this.setState({
            isMinimize: !this.state.isMinimize
        })
    }

    render() {
        var { positionFormIndex, hardSkill } = this.props

        return (
            <div class="card mb-4">
                <div class="card-header" onClick={this.setMinimize} style={{ cursor: 'default' }}>
                    <i class="fas fa-table mr-1"></i>Hard Skills <span style={{ color: 'red', fontWeight: 500 }} >*</span>
                    <span className="material-icons pull-right clear" style={{ cursor: 'pointer' }} >
                        {!this.state.isMinimize ? 'minimize' : 'crop_free'}
                    </span>
                </div>
                {!this.state.isMinimize ?
                    <div class="card-body">
                        <div class="table-responsive">
                            <table class="table table-bordered" id="dataTable" width="100%" cellspacing="0">
                                <thead>
                                    <tr>
                                        <th width={220}>Hard Skill</th>
                                        <th width={220}>Skill Level</th>
                                        <th width={220}>Certification Level</th>
                                        <th width={220}>Priority</th>
                                        <th ></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr >
                                        <td colspan={5}>Minimum Skills</td>
                                    </tr>
                                    {this.showMinimumSkills(hardSkill.minium, positionFormIndex)}
                                    {hardSkill.minium.length === 0 ?
                                        <tr >
                                            <td colspan={5}>
                                                <span style={{ color: 'red', fontWeight: 500 }} > None</span>
                                            </td>
                                        </tr>
                                        : ''}
                                    <tr >
                                        <td colspan={5}>Optional Skills</td>
                                    </tr>
                                    {this.showMinimumSkills(hardSkill.option, positionFormIndex)}
                                </tbody>
                            </table>
                            {this.props.hardSkillList.length === hardSkill.length ?
                                '' :
                                <div className="col">
                                    <i className="material-icons" style={{ cursor: 'pointer', color: 'blue' }}
                                        onClick={() => this.onAddHardSkill(positionFormIndex)}>add_box</i>
                                </div>
                            }
                        </div>
                    </div>
                    : ''}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        hardSkillList: state.HardSkillSelectBarReducer
    }
}

const mapDispatchToProp = dispatch => {
    return {
        fetchHardSkillList: () => {
            dispatch(fetchHardSkill())
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProp)(HardSkillForm);