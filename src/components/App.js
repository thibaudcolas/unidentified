import React from 'react';
import { Link } from 'react-router';

export default React.createClass({
    displayName: 'App',

    propTypes: {
        children: React.PropTypes.any,
    },

    render() {
        return (
            <div>
                <Link to="/">Home</Link>
                <Link to="/test">Test</Link>
                <Link to="/hello">Hello</Link>
                {this.props.children}
            </div>
        );
    },
});
