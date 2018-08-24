import React from "react";
import ReactDOM from "react-dom";
import {Provider} from "mobx-react";
import {when} from "mobx";
import App from "./app.jsx";

export {startApp};

function startApp({container, store}) {

    const Root = (
        <div className="busy-indicator">
            <div>Still loading .....</div>
        </div>
    );

    ReactDOM.render(
        Root,
        container
    );

    when (
        ()=> store.hasTranslations,
        ()=> {
            ReactDOM.unmountComponentAtNode(container);
            loadApp({container, store});
        }
    )
}

function loadApp ({container, store}) {

    const Root = (
        <Provider store={store}>
            <App/>
        </Provider>
    );

    ReactDOM.render(
        Root,
        container
    );
}