import React from 'react';

export default React.createClass({
    displayName: 'App',

    render() {
        return (
            <div>
                {this.props.children}
            </div>
        );
    },
});
