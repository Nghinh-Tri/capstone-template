import React, { Component } from 'react';
import SelectSearch from '../../select-search/SelectSearch';

class HardSkillFormContent extends Component {
    render() {
        return (
            <div className="row">
                <div className="col-1 mt">
                    <label className="bmd-label  ">
                        <h5 className="font-weight-bold">
                            Skill
                </h5>
                    </label>
                </div>
                <div className="col-2">
                    <SelectSearch/>
                </div>

                <div className="col-1 mt">
                    <label className="bmd-label  ">
                        <h5 className="font-weight-bold">
                            Experience
                </h5>
                    </label>
                </div>
                <div className="col-1">
                    <div className="form-group">
                        <input type="number" className="form-control" min="0" />
                    </div>
                </div>

                <div className="col-1 mt">
                    <label className="bmd-label  ">
                        <h5 className="font-weight-bold">
                            Certification
                </h5>
                    </label>
                </div>
                <div className="col-2">
                    <SelectSearch />
                </div>

                <div className="col-1 mt">
                    <label className="bmd-label">
                        <h5 className="font-weight-bold">
                            Priority
                </h5>
                    </label>
                </div>
                <div className="col-1">
                    <div className="form-group">
                        <input type="number" className="form-control" min="0" />
                    </div>
                </div>

                <div className="col-1 mt">
                    <span className="material-icons pull-right">clear</span>
                </div>
            </div>

        );
    }
}

export default HardSkillFormContent;