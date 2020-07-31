import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import routes from "./router/router";

export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
    }

    render() {
        return (
            <Router>
                <div>
                    {routes.map((item) => {
                        return (
                            <Route
                                key={item.path}
                                path={item.path}
                                component={item.component}
                            />
                        );
                    })}
                </div>
            </Router>
        );
    }
}
