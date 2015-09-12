import React from 'react';
import ReactDOM from 'react-dom';
import Router from 'react-router';
import createBrowserHistory from 'history/lib/createBrowserHistory';
import routes from './routes';

const routerConfig = {
    routes: routes,
    history: createBrowserHistory(),
};

const router = React.createElement(Router, routerConfig);
const mount = document.getElementById('mount');


ReactDOM.render(router, mount);
