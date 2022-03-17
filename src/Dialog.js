import React from 'react';
import PropTypes from 'prop-types';
import { Button } from '@mui/material';

class Dialog extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            opened: false,
        };
    }

    render() {
        const Comp = this.props.component;

        return [
            <Button key="button" variant="contained" onClick={() => this.setState({ opened: true })}>Open dialog</Button>,
            this.state.opened ? <Comp key="component" onClose={() => this.setState({ opened: false })} /> : null,
        ];
    }
}

Dialog.propTypes = {
    component: PropTypes.object,
};

export default Dialog;
