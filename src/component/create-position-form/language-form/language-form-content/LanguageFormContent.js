import React, { Component } from 'react';
import { connect } from 'react-redux';
import SelectSearch from '../../select-search/SelectSearch';
import * as Action from "../../../../service/action/LanguageSelectBarAction";
import { convertLanguageList } from "../../../../service/util/util";
import SelectBar from '../../select-search/SelectBar';

class LanguageFormContent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            priority: [
                { label: 1, value: 1 },
                { label: 2, value: 2 },
                { label: 3, value: 3 },
                { label: 4, value: 4 },
                { label: 5, value: 5 },
                { label: 6, value: 6 },
                { label: 7, value: 7 },
                { label: 8, value: 8 },
                { label: 9, value: 9 },
                { label: 10, value: 10 },
            ]
        }
    }

    onDeleteLanguage = (languageIndex, positionFormIndex) => {
        this.props.onDeleteLanguage(languageIndex, positionFormIndex)
    }

    render() {
        var { item, languageIndex, positionFormIndex, languageList } = this.props
        var listConverted = convertLanguageList(languageList)
        return (
            <div className="row" style={{position:'relative', marginLeft: 10, marginBottom: 15, boxShadow: '0 5px 5px 0 rgb(0 0 0 / 20%)', width: '1130px' }} >
                {/* Language */}
                <div class="col">
                    <div class="row" style={{  marginLeft: 20, marginTop: 20,  }}>
                        <label className="bmd-label">
                            <h5 className="font-weight-bold">Language</h5>
                        </label>
                    </div>
                    <div class="row" style={{ marginBottom: 20, marginLeft: 20 , marginTop: 45}}>
                        <SelectBar
                            list={listConverted}
                            onUpdateLanguageID={this.props.onUpdateLanguageID}
                            name="language"
                            positionFormIndex={positionFormIndex}
                            languageIndex={languageIndex}
                            value={item.langID}
                        />
                    </div>
                </div>


                {/* Priority */}
                <div className="col">
                    <div class="row" style={{ marginBottom: 40, marginTop: 20 }}>
                        <label className="bmd-label">
                            <h5 className="font-weight-bold">
                                Priority
                        </h5>
                        </label>
                    </div>
                    <div class="row" style={{ marginBottom: 20 }}>
                        <SelectBar
                            list={this.state.priority}
                            onUpdateLanguagePriority={this.props.onUpdateLanguagePriority}
                            name="languagePriority"
                            positionFormIndex={positionFormIndex}
                            languageIndex={languageIndex}
                            value={item.priority}
                        />
                    </div>
                </div>




                <div className="col-1 mt-15-ml-30">
                    <span className="material-icons pull-right clear" onClick={() => this.onDeleteLanguage(languageIndex, positionFormIndex)}>clear</span>
                </div>
            </div>

        );
    }
}

export default LanguageFormContent;