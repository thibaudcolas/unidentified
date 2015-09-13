import express from 'express';
import path from 'path';
import logger from 'morgan';
import bodyParser from 'body-parser';
import nunjucks from 'nunjucks';
import createLocation from 'history/lib/createLocation';
import { RoutingContext, match } from 'react-router';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import routes from './routes';

const app = express();

app.set('port', process.env.PORT || 3000);

const port = app.get('port');

// Standard middlewares.
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, '..', 'public')));

nunjucks.configure('public', {
    autoescape: true,
    express: app,
});

// Where React takes over.
app.use((req, res) => {
    const location = createLocation(req.url);

    match({ routes, location }, (error, redirectLoc, renderProps) => {
        if (redirectLoc) {
            res.redirect(301, redirectLoc.pathname + redirectLoc.search);
        } else if (error) {
            res.status(500).send(error.message);
        } else if (renderProps === null) {
            res.status(404).send('Not found');
        } else {
            const elt = React.createElement(RoutingContext, renderProps);

            const context = {
                html: ReactDOMServer.renderToString(elt),
            };

            res.render('base.html', context);
        }
    });
});

app.listen(port);
