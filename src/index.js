/* eslint-disable */
import React from 'react';
import ReactDOM from 'react-dom';
import { ThemeProvider, StyledEngineProvider } from '@mui/material/styles';
import Utils from '@iobroker/adapter-react-v5/Components/Utils';
import { SnackbarProvider } from 'notistack';
import App from './App';
import * as serviceWorker from './serviceWorker';
import packageJson from '../package.json';
import theme from './theme';
import './index.css';

window.adapterName = 'adapter-react-demo';
let themeName = Utils.getThemeName();

console.log(`iobroker.${window.adapterName}@${packageJson.version} using theme "${themeName}"`);
//window.sentryDSN = 'https://6ccbeba86d86457b82ded80109fa7aba@sentry.iobroker.net/144';

function build() {
    return ReactDOM.render(
        <StyledEngineProvider injectFirst>
            <ThemeProvider theme={theme(themeName)}>
                <SnackbarProvider maxSnack={3}>
                    <App
                        socket={{port: 8082}}
                        onThemeChange={(_theme) => {
                            themeName = _theme;
                            build();
                        }}
                    />
                </SnackbarProvider>
            </ThemeProvider>
        </StyledEngineProvider>,
        document.getElementById('root'),
    );
}

build();

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
