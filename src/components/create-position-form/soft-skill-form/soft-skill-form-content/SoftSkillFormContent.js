import React, { Component } from 'react';
import SelectSearch from '../../select-search/SelectSearch';

class SoftSkillFormContent extends Component {
    render() {
        return (
            <div className="row">
                <div className="col-1 mt">
                    <label className="bmd-label  ">
                        <h5 className="font-weight-bold">Skill</h5>
                    </label>
                </div>
                <div className="col-3">
                    <SelectSearch />
                </div>
                <div className="col-1 mt">
                    <span className="material-icons pull-right">clear</span>
                </div>
            </div>

        );
    }
}

export default SoftSkillFormContent;