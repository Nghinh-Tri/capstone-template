import React, { Component } from 'react';
import { connect } from 'react-redux';
import SelectBar from '../../select-search/SelectBar';
import { fetchSoftSkill } from "../../../service/action/skill/SoftSkillSelectBarAction";
import { convertSkillList } from '../../../service/util/util';

class SoftSkillForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isMinimize: true
        }
    }

    componentDidMount = () => {
        this.props.fetchSoftSkillList()
    }

    setMinimize = () => {
        this.setState({
            isMinimize: !this.state.isMinimize
        })
    }

    getSoftSkillListNotSelect = () => {
        var { softSkillList, softSkill } = this.props
        var listNotSelect = [...softSkillList]
        var minium = [...softSkill.minium]
        minium.forEach(element => {
            listNotSelect = listNotSelect.filter(e => e.skillID !== element)
        });
        return listNotSelect
    }

    render() {
        var { softSkillList, softSkill, positionFormIndex } = this.props
        var listConverted = convertSkillList(softSkillList)
        var notSelectListConverted = convertSkillList(this.getSoftSkillListNotSelect())

        return (
            <div class="card mb-4">
                <div class="card-header">
                    <i class="fas fa-table mr-1"></i>Soft Skill
                <span className="material-icons pull-right clear" style={{ cursor: 'pointer' }} onClick={this.setMinimize} >
                        {!this.state.isMinimize ? 'minimize' : 'crop_free'}
                    </span>
                </div>
                {!this.state.isMinimize ?
                    <div class="card-body">
                        <div className="row">
                            <div className="col">
                                <div className="form-group">
                                    <label className="bmd-label-static">Minimum Skills</label>
                                    <SelectBar name="softSkillID"
                                        type='multi'
                                        minium={true}
                                        placeholder="Select a soft skill"
                                        list={listConverted}
                                        onUpdateSoftSkillID={this.props.onUpdateSoftSkillID}
                                        positionFormIndex={positionFormIndex}
                                        value={softSkill.minium}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col">
                                <div className="form-group">
                                    <label className="bmd-label-static">Optional Skills</label>
                                    <SelectBar name="softSkillID"
                                        type='multi'
                                        minium={false}
                                        placeholder="Select a soft skill"
                                        list={notSelectListConverted}
                                        onUpdateSoftSkillID={this.props.onUpdateSoftSkillID}
                                        positionFormIndex={positionFormIndex}
                                        value={softSkill.option}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    : ''}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        softSkillList: state.SoftSkillSelectBarReducer
    }
}

const mapDispatchToProp = (dispatch, props) => {
    return {
        fetchSoftSkillList: () => {
            dispatch(fetchSoftSkill())
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProp)(SoftSkillForm);