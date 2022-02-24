import React from 'react';
import './App.scss';
import { ThemeProvider, StyledEngineProvider } from '@mui/material/styles';
import {
    Select, MenuItem, Button, Stack, MenuList,
} from '@mui/material';

import withStyles from '@mui/styles/withStyles';

import GenericApp from './adapter-react-v5/src/GenericApp';
import I18n from './adapter-react-v5/src/i18n';

import ColorPicker from './adapter-react-v5/src/Components/ColorPicker';
import ComplexCron from './adapter-react-v5/src/Components/ComplexCron';
import FileBrowser from './adapter-react-v5/src/Components/FileBrowser';
import FileViewer from './adapter-react-v5/src/Components/FileViewer';
import Icon from './adapter-react-v5/src/Components/Icon';
import IconPicker from './adapter-react-v5/src/Components/IconPicker';
import IconSelector from './adapter-react-v5/src/Components/IconSelector';
import Image from './adapter-react-v5/src/Components/Image';
import Loader from './adapter-react-v5/src/Components/Loader';
import Logo from './adapter-react-v5/src/Components/Logo';
import MDUtils from './adapter-react-v5/src/Components/MDUtils';
import ObjectBrowser from './adapter-react-v5/src/Components/ObjectBrowser';
import Router from './adapter-react-v5/src/Components/Router';
import SaveCloseButtons from './adapter-react-v5/src/Components/SaveCloseButtons';
import Schedule from './adapter-react-v5/src/Components/Schedule';
import SelectWithIcon from './adapter-react-v5/src/Components/SelectWithIcon';
import TabContainer from './adapter-react-v5/src/Components/TabContainer';
import TabContent from './adapter-react-v5/src/Components/TabContent';
import TabHeader from './adapter-react-v5/src/Components/TabHeader';
import TextWithIcon from './adapter-react-v5/src/Components/TextWithIcon';
import ToggleThemeMenu from './adapter-react-v5/src/Components/ToggleThemeMenu';
import TreeTable from './adapter-react-v5/src/Components/TreeTable';
import Utils from './adapter-react-v5/src/Components/Utils';

import ComplexCronDialog from './adapter-react-v5/src/Dialogs/ComplexCron';
import Confirm from './adapter-react-v5/src/Dialogs/Confirm';
import Cron from './adapter-react-v5/src/Dialogs/Cron';
import Error from './adapter-react-v5/src/Dialogs/Error';
import Message from './adapter-react-v5/src/Dialogs/Message';
import SelectID from './adapter-react-v5/src/Dialogs/SelectID';
import SimpleCron from './adapter-react-v5/src/Dialogs/SimpleCron';
import TextInput from './adapter-react-v5/src/Dialogs/TextInput';

const styles = theme => ({
    app: {
        backgroundColor: theme.palette.background.default,
        color: theme.palette.text.primary,
        height: '100%',
    },
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
            component: 'ObjectBrowser',
            error: false,
        };
    }

    async onConnectionReady() {

    }

    static getDerivedStateFromError(error) {
        return { error: true, errorText: error };
    }

    render() {
        const components = {
            ColorPicker: <ColorPicker />,
            ComplexCron: <ComplexCron />,
            FileBrowser: <FileBrowser />,
            FileViewer: <FileViewer />,
            Icon: <Icon />,
            IconPicker: <IconPicker />,
            IconSelector: <IconSelector />,
            Image: <Image />,
            Loader: <Loader />,
            Logo: <Logo />,
            MDUtils: <MDUtils />,
            ObjectBrowser: <ObjectBrowser
                lang={I18n.lang}
                t={I18n.t}
                socket={this.socket}
            />,
            Router: <Router />,
            SaveCloseButtons: <SaveCloseButtons />,
            Schedule: <Schedule />,
            SelectWithIcon: <SelectWithIcon />,
            TabContainer: <TabContainer />,
            TabContent: <TabContent />,
            TabHeader: <TabHeader />,
            TextWithIcon: <TextWithIcon />,
            ToggleThemeMenu: <ToggleThemeMenu />,
            TreeTable: <TreeTable />,
            Utils: <Utils />,
            ComplexCronDialog: <ComplexCronDialog />,
            Confirm: <Confirm />,
            Cron: <Cron />,
            Error: <Error />,
            Message: <Message />,
            SelectID: <SelectID />,
            SimpleCron: <SimpleCron />,
            TextInput: <TextInput />,
        };

        if (!this.state.loaded) {
            return (
                <StyledEngineProvider injectFirst>
                    <ThemeProvider theme={this.state.theme}>
                        <Loader theme={this.state.themeType} />
                    </ThemeProvider>
                </StyledEngineProvider>
            );
        }

        return (
            <StyledEngineProvider injectFirst>
                <ThemeProvider theme={this.state.theme}>
                    <div className={this.props.classes.app}>
                        <Stack direction="row" spacing={2} style={{ height: '100%' }}>
                            <div style={{ overflowY: 'auto', height: '100%' }}>
                                <MenuList>
                                    {Object.keys(components).map(name => <MenuItem
                                        key={name}
                                        selected={name === this.state.component}
                                        onClick={e => this.setState({ component: name, error: false })}
                                    >
                                        {name}
                                    </MenuItem>)}
                                </MenuList>
                            </div>
                            <div>
                                {this.state.error
                                    ? <>
                                        <div>
                                            {'Error component: '}
                                            {this.state.component}
                                        </div>
                                        <pre>{this.state.errorText.stack.toString()}</pre>
                                    </>
                                    : components[this.state.component]}
                            </div>
                        </Stack>
                    </div>
                </ThemeProvider>
            </StyledEngineProvider>
        );
    }
}

export default withStyles(styles)(App);
