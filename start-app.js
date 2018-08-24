import "babel-polyfill";

import {Store} from "./src/react/store";
import {startApp} from "./src/index.jsx";

$(document).ready(()=> {
    let container = document.querySelector('.transaction-list');

    if (!container) {
        container.createElement('div');
        container.className = '.transaction-list';
        document.body.appendChild(container);
    }

    startApp({container, store: new Store()});
});
