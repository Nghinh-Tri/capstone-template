import React, { Component } from 'react';
import { connect } from 'react-redux';
import CreatePositionForm from '../../components/create-position-form/CreatePositionForm';
import { addPositionRequire, deletePositionRequire } from "../../store/store-action/PositionAction";


class CreatePosition extends Component {

    onAdd = () => {
        var { items } = this.props
        items.push("")
        this.props.onAddPosition(items)
    }

    onDelete = (id) => {
        this.props.onDelete(id)
    }

    showItems = (items) => {
        var result = null;
        result = items.map((item, index) => {
            return (
                <CreatePositionForm key={index} onDelete={this.onDelete} index={index} />
            );
        })
        return result;
    }

    render() {
        return (
            <div>
                {this.showItems(this.props.items)}
                <div >
                    <button type="button" className="btn btn-primary" onClick={this.onAdd}>
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
const mapStateToProp = (state) => {
    return {
        items: state.PositionReducer
    }
}

const mapDispatchToProp = (dispatch, props) => {
    return {
        onAddPosition: (position) => {
            dispatch(addPositionRequire(position))
        },
        onDelete: (index) => {
            dispatch(deletePositionRequire(index))
        }
    }
}
export default connect(mapStateToProp, mapDispatchToProp)(CreatePosition);