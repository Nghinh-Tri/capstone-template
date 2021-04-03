import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchLanguage } from '../../../service/action/LanguageSelectBarAction';
import LanguageFormContent from './language-form-content/LanguageFormContent';

class LanguageForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isMinimize: false,
            language: {
                langID: 0,
                priority: 0
            }
        }
    }

    componentDidMount = () => {
        this.props.fetchLanguage()
    }

    getLanguageListNotSelect = () => {
        var { languageList, language } = this.props
        var listNotSelect = languageList.slice(0, languageList.length)
        for (let i = 0; i < listNotSelect.length; i++) {
            for (let k = 0; k < language.length; k++) {
                if (listNotSelect[i].langID === language[k].langID) {
                    var clone = { ...listNotSelect[i] }
                    clone.isSelect = true
                    listNotSelect[i] = clone
                }
            }
        }
        return listNotSelect
    }

    onAddLanguage = (positionFormIndex) => {
        this.props.onAddLanguage(positionFormIndex, this.state.language)
    }

    showItems = (language, positionFormIndex) => {
        var result = null;
        var languageList = this.getLanguageListNotSelect()
        result = language.map((item, languageIndex) => {
            return (
                <LanguageFormContent key={languageIndex}
                    positionFormIndex={positionFormIndex}
                    languageIndex={languageIndex}
                    languageList={languageList}
                    onDeleteLanguage={this.props.onDeleteLanguage}
                    item={item}
                    onUpdateLanguageID={this.props.onUpdateLanguageID}
                    onUpdateLanguagePriority={this.props.onUpdateLanguagePriority}
                />
            );
        })
        return result;
    }

    setMinimize = () => {
        this.setState({
            isMinimize: !this.state.isMinimize
        })
    }

    render() {
        var { language, positionFormIndex } = this.props
        const showLanguage = (language, positionFormIndex) => {
            if (this.state.isMinimize)
                return ""
            else {
                return (<div className="card-body">
                    {this.showItems(language, positionFormIndex)}
                    {this.props.languageList.length === language.length ?
                        '' :
                        <span className="material-icons add"
                            onClick={() => this.onAddLanguage(positionFormIndex)}>add_box</span>
                    }
                </div>)
            }

        }
        return (
            <div className="card mb-50">
                <div className="card-header ">
                    <div className="row">
                        <div className="col">
                            <h5 className="font-weight-bold">Language</h5>
                        </div>
                        <div className="col pull-right">
                            <span className="material-icons pull-right clear" onClick={this.setMinimize} > {this.state.isMinimize === false ? 'minimize' : 'crop_free'}</span>
                        </div>
                    </div>

                </div>
                {showLanguage(language, positionFormIndex)}
            </div>

        );
    }
}

const mapStateToProps = (state) => {
    return {
        languageList: state.LanguageSelectBarReducer
    }
}

const mapDispatchToProp = (dispatch, props) => {
    return {
        fetchLanguage: () => {
            dispatch(fetchLanguage())
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProp)(LanguageForm);