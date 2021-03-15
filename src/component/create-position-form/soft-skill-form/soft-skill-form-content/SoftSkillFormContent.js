import React, { Component } from 'react';
import { connect } from 'react-redux';
import SelectSearch from '../../select-search/SelectSearch';
import * as Action from "../../../../service/action/SoftSkillSelectBarAction";
import { convertSkillList } from "../../../../service/util/util";
import SelectBar from '../../select-search/SelectBar';

class SoftSkillFormContent extends Component {

    onDeleteSoftSkill = (softSkillIndex, positionFormIndex) => {
        this.props.onDeleteSoftSkill(softSkillIndex, positionFormIndex)
    }

    render() {
        var { item, softSkillIndex, positionFormIndex, softSkillList } = this.props
        var listConverted = convertSkillList(softSkillList)
        return (
            <div className="row" style={{ marginLeft: 10, marginBottom: 15, boxShadow: '0 5px 5px 0 rgb(0 0 0 / 20%)', width: '1130px' }}>

                <div class="col">
                    <div class="row" style={{ marginBottom: 45, marginLeft: 20, marginTop: 20 }}>
                        <label className="bmd-label" >
                            <h5 className="font-weight-bold">Skill</h5>
                        </label>
                    </div>
                    <div class="row" style={{ marginBottom: 20, marginLeft: 20 }}>
                        <SelectBar
                            list={listConverted}
                            onUpdateSoftSkillID={this.props.onUpdateSoftSkillID}
                            name="softSkillID"
                            positionFormIndex={positionFormIndex}
                            softSkillIndex={softSkillIndex}
                            value={item}
                        />
                    </div>
                </div>

                <div className="col-auto" style={{ marginBottom: 15, marginLeft: 20, marginTop: 20 }}>
                    <span className="material-icons pull-right clear" onClick={() => this.onDeleteSoftSkill(softSkillIndex, positionFormIndex)}>clear</span>
                </div>
            </div>

        );
    }
}


export default SoftSkillFormContent;