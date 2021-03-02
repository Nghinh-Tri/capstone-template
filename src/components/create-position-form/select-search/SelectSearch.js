import React, { Component } from 'react';
// import Select from 'react-select'
import Select from "react-dropdown-select"

class SelectSearchs extends Component {

    constructor(props) {
        super(props);
        this.state = {
            label: "Search...",
            value: 0,
            list: [
                { name: "BA", value: 1 },
                { name: "DEV", value: 2 },
                { name: "TEST", value: 3 },
            ]
        }
    }

    componentDidMount = () => {
        var { list } = this.props
        if (this.state.value === '') {
            this.setState({
                label: "Search...",
                value: 0
            })
        } else if (this.state.value !== 0) {
            var lable = this.getLabel(list, this.state.value)
            this.setState({
                label: lable
            })
        }
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.value !== prevState.value) {
            return { value: nextProps.value };
        }
        return null;
    }

    getLabel = (list, value) => {
        var result = null
        list.forEach(element => {
            if (element.value === value) {
                result = element.label
            }
        });
        return result
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.value !== this.props.value) {
            var { list, value } = this.props
            var lable = this.getLabel(list, value)
            if (value !== 0) {
                this.setState({
                    label: lable,
                    value: value
                })
            }
        }
    }

    onSelectPosition = event => {
        var { positionFormIndex } = this.props
        var value = event[0].value
        this.props.onUpdatePositionID(value, positionFormIndex)
    }

    onSelectLanguage = event => {
        var { positionFormIndex, languageIndex } = this.props
        var value = event[0].value
        this.props.onUpdateLanguageID(value, languageIndex, positionFormIndex)
    }

    onSelectSoftSkill = event => {
        var { positionFormIndex, softSkillIndex } = this.props
        var value = event.value
        this.props.onUpdateSoftSkillID(value, softSkillIndex, positionFormIndex)
    }

    onSelectHardSkill = event => {
        var { positionFormIndex, hardSkillIndex } = this.props
        var value = event.value
        this.props.onUpdateHardSkillID(value, hardSkillIndex, positionFormIndex)
    }

    onSelectCerti = event => {
        var { positionFormIndex, hardSkillIndex } = this.props
        var value = event.value
        this.props.onUpdateHardSkillCerti(value, hardSkillIndex, positionFormIndex)
    }


    showSelectBar = (name, list, value) => {
        console.log(value)
        switch (name) {
            case "positionID":
                return (
                    isNaN(value) || value === 0 ?
                        <Select className="select"
                            options={list}
                            onChange={this.onSelectPosition}
                            valueField="value"
                            labelField="label"
                        />
                        :
                        <Select className="select"
                            options={list}
                            onChange={this.onSelectPosition}
                            values={[list.find(opt => opt.value === value)]}
                            valueField="value"
                            labelField="label"
                        />
                )
            case "language":
                return (
                    isNaN(value) ?
                        <Select className="select"
                            options={list}
                            onChange={this.onSelectLanguage}
                            valueField="value"
                            labelField="label"
                        /> :
                        <Select className="select"
                            options={list}
                            onChange={this.onSelectLanguage}
                            values={[list.find(opt => opt.value === value)]}
                            valueField="value"
                            labelField="label"
                        />
                )
            case "softSkillID":
                return (
                    isNaN(value) ?
                        <Select className="select"
                            options={list}
                            onChange={this.onSelectSoftSkill}
                            valueField="value"
                            labelField="label"
                        /> :
                        <Select className="select"
                            options={list}
                            onChange={this.onSelectSoftSkill}
                            values={[list.find(opt => opt.value === value)]}
                            valueField="value"
                            labelField="label"
                        />
                )
            case "hardSkillID":
                return (
                    isNaN(value) ?
                        <Select className="select"
                            options={list}
                            onChange={this.onSelectHardSkill}
                            valueField="value"
                            labelField="label"
                        /> :
                        <Select className="select"
                            options={list}
                            onChange={this.onSelectHardSkill}
                            values={[list.find(opt => opt.value === value)]}
                            valueField="value"
                            labelField="label"
                        />
                )
            case "certiID":
                return (
                    isNaN(value) ?
                        <Select className="select"
                            options={list}
                            onChange={this.onSelectCerti}
                            valueField="value"
                            labelField="label"
                        /> :
                        <Select className="select"
                            options={list}
                            onChange={this.onSelectCerti}
                            values={[list.find(opt => opt.value === value)]}
                            valueField="value"
                            labelField="label"
                        />
                )
            default:
                break;
        }
    }

    render() {
        var { list, name, value } = this.props
        return (
            <div>
                {list.length > 0 ? this.showSelectBar(name, list, parseInt(value)) : ""}
            </div>
        );
    }
}

export default SelectSearchs;