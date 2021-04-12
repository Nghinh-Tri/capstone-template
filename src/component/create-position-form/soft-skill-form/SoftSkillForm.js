import React, { Component } from 'react';
import { connect } from 'react-redux';
import SelectBar from '../../select-search/SelectBar';
import { fetchSoftSkill } from "../../../service/action/SoftSkillSelectBarAction";
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

    render() {
        var { softSkillList, softSkill, positionFormIndex } = this.props
        var listConverted = convertSkillList(softSkillList)
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
                        <SelectBar name="softSkillID"
                            type='multi'
                            placeholder="Select a soft skill"
                            list={listConverted}
                            onUpdateSoftSkillID={this.props.onUpdateSoftSkillID}
                            positionFormIndex={positionFormIndex}
                            value={softSkill}
                        />
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