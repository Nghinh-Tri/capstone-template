import React, { Component } from 'react';
import HardSkillForm from './hard-skill-form/HardSkillForm';
import SelectSearch from './select-search/SelectSearch';
import SoftSkillForm from './soft-skill-form/SoftSkillForm';

class CreatePositionForm extends Component {
    render() {
        return (
            <div className="card mb-80">
                <div className="card-header card-header-primary">
                    <div className="row">
                        <div className="col-11">
                            <h4 className="font-weight-bold">Position</h4>
                        </div>
                        <div className="col">
                            <span className="material-icons pull-right">clear</span>

                        </div>
                    </div>
                </div>
                <div className="card-body">
                    <div className="form-group">
                        <div className="row">
                            <div className="col-1 mt">
                                <label className="bmd-label  ">
                                    <h4 className="font-weight-bold">
                                        Position
                                </h4>
                                </label>
                            </div>
                            <div className="col-3">
                                <SelectSearch />
                            </div>
                            <div className="col-3 mt fr">
                                <label className="bmd-label ">
                                    <h4 className="font-weight-bold ">
                                        Number of candidate
                                    </h4>
                                </label>
                            </div>
                            <div className="col-3">
                                <div className="form-group">
                                    <input type="number" className="form-control" min="0" />
                                </div>
                            </div>

                        </div>

                        {/* Soft Skill form */}
                        <SoftSkillForm />
                        {/* Hard Skill form */}
                        <HardSkillForm />
                    </div>
                </div>
            </div>
        );
    }
}

export default CreatePositionForm;