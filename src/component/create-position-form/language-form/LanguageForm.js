import React, { Component } from 'react';
import { connect } from 'react-redux';
import LanguageFormContent from './LanguageFormContent';
import { fetchLanguage } from "../../../service/action/language/LanguageSelectBarAction";

class LanguageForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            language: {
                langID: 0,
                priority: 10
            },
            isMinimize: true
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
    showLanguage = (language) => {
        var languageList = this.getLanguageListNotSelect()
        var result = null
        result = language.map((languageItem, index) => {
            return (<LanguageFormContent key={index}
                languageIndex={index}
                languageList={languageList}
                length={language.length}
                languageItem={languageItem}
                positionFormIndex={this.props.positionFormIndex}
                onDeleteLanguage={this.props.onDeleteLanguage}
                onUpdateLanguageID={this.props.onUpdateLanguageID}
                onUpdateLanguagePriority={this.props.onUpdateLanguagePriority} />)
        })
        return result
    }

    onAddLanguage = (positionFormIndex) => {
        this.props.onAddLanguage(positionFormIndex, this.state.language)
    }

    setMinimize = () => {
        this.setState({
            isMinimize: !this.state.isMinimize
        })
    }

    render() {
        var { language, positionFormIndex } = this.props
        return (
            <div class="card mb-4">
                <div class="card-header">
                    <i class="fas fa-table mr-1"></i>Language <span style={{ color: 'red', fontWeight: 500 }} >*</span>
                    <span className="material-icons pull-right clear" style={{ cursor: 'pointer' }} onClick={this.setMinimize} >
                        {!this.state.isMinimize ? 'minimize' : 'crop_free'}
                    </span>
                </div>
                {!this.state.isMinimize ?
                    <div class="card-body">
                        <div class="table-responsive">
                            <table class="table table-bordered" id="dataTable" width="100%" cellspacing="0">
                            <thead>
                                    <tr>
                                        <th width={240}>Language</th>
                                        <th width={240}>Priority</th>
                                        <th width={50}></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.showLanguage(language)}
                                </tbody>
                            </table>
                            {this.props.languageList.length === language.length ?
                                '' :
                                <div className="col">
                                    <i className="material-icons" style={{ cursor: 'pointer', color: 'blue' }}
                                        onClick={() => this.onAddLanguage(positionFormIndex)}>add_box</i>
                                </div>}
                        </div>
                    </div>
                    : ''}
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