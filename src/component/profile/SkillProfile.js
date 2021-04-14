import { Badge, Button, Descriptions } from "antd";
import moment from "moment";
import React, { Component } from 'react';
import {
    showHardSkillLevel,
    showPositionLevel,
    getRole,
} from "../../service/util/util";
import { checkSession } from "../../service/action/AuthenticateAction";
import { fetchPositionProfileDetail } from "../../service/action/ProfileAction";
import { connect } from "react-redux";

class SkillProfile extends Component {
    componentDidMount = () => {
        this.props.checkSession();
        this.props.fetchPositionProfileDetai(this.props.empID);
    };

    onShowHardSkill = (hardSkills) => {
        var result = null;
        if (typeof hardSkills !== "undefined") {
            result = (hardSkills || []).map((skill, index) => {
                return (
                    <>
                        <Descriptions.Item span={3} label={skill.skillName}>
                            {showHardSkillLevel(skill.skillLevel)}
                        </Descriptions.Item>
                        {skill.certifications?.map((certification, innerIndex) => {
                            return (
                                <>
                                    <Descriptions.Item label={certification.certiName} />
                                    <Descriptions.Item label="Taken Date">
                                        {certification?.dateTaken
                                            ? moment(certification.dateTaken).format("DD-MM-YYYY")
                                            : ""}
                                    </Descriptions.Item>
                                    <Descriptions.Item label="Expire Date">
                                        {certification?.dateEnd
                                            ? moment(certification.dateEnd).format("DD-MM-YYYY")
                                            : ""}
                                    </Descriptions.Item>
                                </>
                            );
                        })}
                    </>
                );
            });
        }
        return result;
    };

    onShowSoftSkill = (softSkills) => {
        var result = null;
        if (typeof softSkills !== "undefined") {
            result = (softSkills || []).map((skill, index) => {
                return (
                    <>
                        <Descriptions.Item span={3}>{skill.skillName}</Descriptions.Item>
                    </>
                );
            });
        }
        return result;
    };

    onShowLanguage = (languages) => {
        var result = null;
        if (typeof languages !== "undefined") {
            result = (languages || []).map((language, index) => {
                return (
                    <>
                        <Descriptions.Item span={3} label={language.langName}>
                            Level {language.langLevel}
                        </Descriptions.Item>
                    </>
                );
            });
        }
        return result;
    };

    render() {
        var { positionDetail } = this.props;
        console.log(positionDetail);
        return (
            <React.Fragment>
                <Descriptions title="Hard Skill Info" layout="horizontal" bordered>
                    {this.onShowHardSkill((positionDetail || {}).hardSkills)}
                </Descriptions>

                <Descriptions title="Language Info" layout="horizontal" bordered>
                    {this.onShowLanguage((positionDetail || {}).languages)}
                </Descriptions>

                <Descriptions title="Soft Skill Info" layout="horizontal" bordered>
                    {this.onShowSoftSkill((positionDetail || {}).softSkills)}
                </Descriptions>
            </React.Fragment>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        positionDetail: state.PositionReducer,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchPositionProfileDetai: (empID) => {
            dispatch(fetchPositionProfileDetail(empID));
        },
        checkSession: () => {
            dispatch(checkSession());
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SkillProfile);