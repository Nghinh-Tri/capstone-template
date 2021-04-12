import React, { Component } from 'react';

class Search extends Component {

    onHandle = (e) => {
        var { value } = e.target
        var { search } = this.props
        switch (search) {
            case 'project':
                this.props.searchProject(value)
                break
        }
    }

    render() {
        return (
            <form class="d-none d-md-inline-block form-inline ml-auto mr-0 mr-md-3 my-2 my-md-0" >
                <div class="input-group" style={{ marginTop: 20, marginRight: 5 }}>
                    <input class="form-control" type="text" placeholder={this.props.placeholder} onChange={this.onHandle} />
                    <div class="input-group-append">
                        <button class="btn btn-primary" type="button"><i class="fas fa-search"></i></button>
                    </div>
                </div>
            </form>
        );
    }
}

export default Search;