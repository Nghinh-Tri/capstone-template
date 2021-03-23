import React, { Component } from 'react';

class ProgressBar extends Component {

    constructor(props) {
        super(props);
        this.state = {
            step1: "",
            step2: "",
            step3: "",
            step4: "",
            name: "Create Project"
        }
    }    

    componentDidMount = () => {
        var isUpdate = localStorage.getItem('isUpdate')
        console.log('a',isUpdate)
        if (isUpdate === true){
            this.setState({name:'Update Project'})
        }else{
            this.setState({name:'Create Project'})
        }
        var { step } = this.props
        if (step === "step1") {
            this.setState({
                step1: "active",
                step2: "",
                step3: "",
                step4: ""
            })
        }
        if (step === "step2") {
            this.setState({
                step1: "complete",
                step2: "active",
                step3: "",
                step4: ""
            })
        }
        if (step === "step3") {
            this.setState({
                step1: "complete",
                step2: "complete",
                step3: "active",
                step4: ""
            })
        }
        if (step === "step4") {
            this.setState({
                step1: "complete",
                step2: "complete",
                step3: "complete",
                step4: "active"
            })
        }
    }    

    render() {
        return (
            <ul className="progressbar">
                <li className={this.state.step1} style={this.state.step1 === 'active' ? { fontWeight: 700 } : { fontWeight: 500 }}>{this.state.name}</li>
                <li className={this.state.step2} style={this.state.step2 === 'active' ? { fontWeight: 700 } : { fontWeight: 500 }}>Position Require</li>
                <li className={this.state.step3} style={this.state.step3 === 'active' ? { fontWeight: 700 } : { fontWeight: 500 }}>Suggest Candiates</li>
                <li className={this.state.step4} style={this.state.step4 === 'active' ? { fontWeight: 700 } : { fontWeight: 500 }}>Confirm</li>
            </ul>
        );
    }
}

export default ProgressBar;