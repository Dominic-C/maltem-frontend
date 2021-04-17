import React, { Component } from "react";
import { withRouter } from 'react-router-dom';

class DetailsLayout extends Component {
    componentDidMount() {
        console.log(this.props);
    }
    render() {
        return (
            <div>This is the DetailsLayout component</div>
        )
    };
}

export default withRouter(DetailsLayout);