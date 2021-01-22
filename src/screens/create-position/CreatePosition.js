import React, { Component } from 'react';
import CreatePositionForm from '../../components/create-position-form/CreatePositionForm';

class CreatePosition extends Component {
    render() {
        return (
            <div>
                {/* <CreatePositionForm /> */}
                <CreatePositionForm />
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