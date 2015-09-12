import React from 'react';
import ReactDOM from 'react-dom';
import Router from 'react-router';
import createHashHistory from 'history/lib/createHashHistory';
import routes from './routes';

const routerConfig = {
    routes: routes,
    history: createHashHistory(),
};

const router = React.createElement(Router, routerConfig);
const mount = document.getElementById('mount');


ReactDOM.render(router, mount);
