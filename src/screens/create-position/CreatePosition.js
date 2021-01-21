import React, { Component } from 'react';
import SelectSearch from '../../components/select-search/SelectSearch';

class CreatePosition extends Component {
    render() {
        return (
            <div>
                <div className="card">
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
                            <div class="card">
                                <div className="card-header card-header-primary ">
                                    <h5 className="font-weight-bold">Soft Skill</h5>
                                </div>
                                <div class="card-body">
                                    <div className="row">
                                        <div className="col-1 mt">
                                            <label className="bmd-label  ">
                                                <h5 className="font-weight-bold">
                                                    Skill
                                        </h5>
                                            </label>
                                        </div>
                                        <div className="col-3">
                                            <SelectSearch />
                                        </div>
                                        <div className="col-1 mt">
                                            <span className="material-icons pull-right">clear</span>
                                        </div>
                                    </div>
                                    <span className="material-icons add">add_box</span>
                                </div>
                            </div>

                            {/* Hard Skill form */}
                            <div class="card">
                                <div className="card-header card-header-primary ">
                                    <h5 className="font-weight-bold">Hard Skill</h5>
                                </div>
                                <div class="card-body">
                                    <div className="row">
                                        <div className="col-1 mt">
                                            <label className="bmd-label  ">
                                                <h5 className="font-weight-bold">
                                                    Skill
                                        </h5>
                                            </label>
                                        </div>
                                        <div className="col-2">
                                            <SelectSearch />
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
                                    <span className="material-icons add">add_box</span>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>

                <div >
                    <button type="button" className="btn btn-primary">
                        <i className="material-icons mr-5">add_box</i>
                    More Position
                    </button>
                </div>

                <div >
                    <button type="submit" className="btn btn-primary pull-right">Next</button>
                </div>
            </div>
        );
    }
}

export default CreatePosition;