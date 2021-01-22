import React, { Component } from 'react';
import HardSkillFormContent from './hard-skill-form-content/HardSkillFormContent';

class HardSkillForm extends Component {
    render() {
        return (
            <div class="card">
                <div className="card-header card-header-primary ">
                    <h5 className="font-weight-bold">Hard Skill</h5>
                </div>
                <div class="card-body">
                    <HardSkillFormContent />
                    <HardSkillFormContent />
                    <span className="material-icons add">add_box</span>
                </div>
            </div>

        );
    }
}

export default HardSkillForm;