import React from 'react';
import './App.scss';
import { withStyles, MuiThemeProvider } from '@material-ui/core/styles';

import GenericApp from './adapter-react-v5/src/GenericApp';
import Loader from './adapter-react-v5/src/Components/Loader';
import I18n from './adapter-react-v5/src/i18n';
import ObjectBrowser from './adapter-react-v5/src/Components/ObjectBrowser';

const styles = theme => ({

});

class App extends GenericApp {
    constructor(props) {
        const extendedProps = { ...props };
        extendedProps.translations = {
            en: require('./i18n/en'),
            de: require('./i18n/de'),
            ru: require('./i18n/ru'),
            pt: require('./i18n/pt'),
            nl: require('./i18n/nl'),
            fr: require('./i18n/fr'),
            it: require('./i18n/it'),
            es: require('./i18n/es'),
            pl: require('./i18n/pl'),
            'zh-cn': require('./i18n/zh-cn'),
        };

        extendedProps.sentryDSN = window.sentryDSN;

        super(props, extendedProps);

        // icon cache
        this.icons = {};

        this.state = {
            ...this.state,
        };
    }

    async onConnectionReady() {

    }

    render() {
        if (!this.state.loaded) {
            return <MuiThemeProvider theme={this.state.theme}>
                <Loader theme={this.state.themeType} />
            </MuiThemeProvider>;
        }

        return <MuiThemeProvider theme={this.state.theme}>
            <ObjectBrowser
                lang={I18n.lang}
                t={I18n.t}
                socket={this.socket}
            />
        </MuiThemeProvider>;
    }
}

export default withStyles(styles)(App);
