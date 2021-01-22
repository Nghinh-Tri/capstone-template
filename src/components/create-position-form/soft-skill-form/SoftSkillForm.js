import React, { Component } from 'react';
import SoftSkillFormContent from './soft-skill-form-content/SoftSkillFormContent';

class SoftSkillForm extends Component {
    render() {
        return (
            <div class="card mb-50">
                <div className="card-header card-header-primary ">
                    <h5 className="font-weight-bold">Soft Skill</h5>
                </div>
                <div class="card-body">
                    <SoftSkillFormContent />
                    <SoftSkillFormContent />
                    <span className="material-icons add">add_box</span>
                </div>
            </div>

        );
    }
}

export default SoftSkillForm;