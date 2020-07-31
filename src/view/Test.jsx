import React, { Component } from "react";
import G from "../component/test/G";
import K from "../component/test/k";

export default class Test extends Component {
    constructor(props) {
        super(props);
        this.state = {
            count: 2,
        };
    }

    setCount = () => {
        this.setState({
            count: 9
        });
    }

    render() {
        const { count } = this.state;
        return (
            <div>
                <button onClick={this.setCount}>change</button>
                <G count={count} setCount={this.setCount}>
                    <div>test</div>
                </G>
                <K test={count}></K>
            </div>
        );
    }
}
