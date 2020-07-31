import React, { Component } from "react";

export default class Test extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div>
                <div>{this.props.count}</div>
                {this.props.children}
            </div>
        );
    }
}
