import React, { Component } from 'react';
import SelectSearch from '../../select-search/SelectSearch';

class SoftSkillFormContent extends Component {

    onDeleteSoftSkill = (softSkillIndex, positionFormIndex) => {
        this.props.onDeleteSoftSkill(softSkillIndex, positionFormIndex)
    }

    render() {
        var { item, softSkillIndex, positionFormIndex } = this.props
        return (
            <div className="row">
                <div className="col-1 mt-15-ml-30">
                    <label className="bmd-label  ">
                        <h5 className="font-weight-bold">Skill</h5>
                    </label>
                </div>
                <div className="col-3">
                    <SelectSearch />
                </div>
                <div className="col-1 mt-15-ml-30">
                    <span className="material-icons pull-right clear" onClick={() => this.onDeleteSoftSkill(softSkillIndex, positionFormIndex)}>clear</span>
                </div>
            </div>

        );
    }
}

export default SoftSkillFormContent;