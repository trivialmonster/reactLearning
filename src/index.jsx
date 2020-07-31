import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore } from "redux";
// import todoApp from './redux/reducers/index';
// import Root from './Root';
// import router from './router/router';
import App from "./App";

// let store = createStore(todoApp);

ReactDOM.render(
    <App />,
    document.getElementById("root")
);

    // // <Provider store={store}>
    //     // <App />
    // {/* </Provider>, */}