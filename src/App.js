import React from 'react';
import './App.scss';
import { ThemeProvider, StyledEngineProvider } from '@mui/material/styles';
import { MenuItem, Stack, MenuList } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Fab from '@mui/material/Fab';
import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';

import GitHubIcon from '@mui/icons-material/GitHub';

import withStyles from '@mui/styles/withStyles';

import GenericApp from './adapter-react-v5/src/GenericApp';
import DialogWrapper from './Dialog';
import Connection from './ConnectionSimulate';
import I18n from './adapter-react-v5/src/i18n';
import copy from 'copy-to-clipboard';

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
import ObjectBrowser from './adapter-react-v5/src/Components/ObjectBrowser';
import SaveCloseButtons from './adapter-react-v5/src/Components/SaveCloseButtons';
import Schedule from './adapter-react-v5/src/Components/Schedule';
import SelectWithIcon from './adapter-react-v5/src/Components/SelectWithIcon';
import TextWithIcon from './adapter-react-v5/src/Components/TextWithIcon';
import ToggleThemeMenu from './adapter-react-v5/src/Components/ToggleThemeMenu';
import TreeTable from './adapter-react-v5/src/Components/TreeTable';

import ComplexCronDialog from './adapter-react-v5/src/Dialogs/ComplexCron';
import ConfirmDialog from './adapter-react-v5/src/Dialogs/Confirm';
import CronDialog from './adapter-react-v5/src/Dialogs/Cron';
import ErrorDialog from './adapter-react-v5/src/Dialogs/Error';
import MessageDialog from './adapter-react-v5/src/Dialogs/Message';
import SelectIDDialog from './adapter-react-v5/src/Dialogs/SelectID';
import SimpleCronDialog from './adapter-react-v5/src/Dialogs/SimpleCron';
import TextInputDialog from './adapter-react-v5/src/Dialogs/TextInput';

const treeData = [
    {
        id: 'UniqueID1', // required
        fieldIdInData: 'Name1',
        myType: 'number',
    },
    {
        id: 'UniqueID2', // required
        fieldIdInData: 'Name12',
        myType: 'string',
    },
];

const treeColumns = [
    {
        title: 'Name of field', // required, else it will be "field"
        field: 'fieldIdInData', // required
        editable: false, // or true [default - true]
        cellStyle: { // CSS style - // optional
            maxWidth: '12rem',
            overflow: 'hidden',
            wordBreak: 'break-word',
        },
        lookup: { // optional => edit will be automatically "SELECT"
            value1: 'text1',
            value2: 'text2',
        },
    },
    {
        title: 'Type', // required, else it will be "field"
        field: 'myType', // required
        editable: true, // or true [default - true]
        lookup: { // optional => edit will be automatically "SELECT"
            number: 'Number',
            string: 'String',
            boolean: 'Boolean',
        },
        type: 'number/string/color/oid/icon/boolean', // oid=ObjectID,icon=base64-icon
        editComponent: props => <div>
            Prefix&#123;
            {' '}
            <br/>
            <textarea
                rows={4}
                style={{width: '100%', resize: 'vertical'}}
                value={props.value}
                onChange={e => props.onChange(e.target.value)}
            />
            Suffix
        </div>,
    },
];

const styles = theme => ({
    app: {
        backgroundColor: theme.palette.background.default,
        color: theme.palette.text.primary,
        height: '100%',
    },
    component: {
        width: '100%',
        overflowY: 'auto',
    },
    stack: {
        height: 'calc(100% - 80px)',
    },
    menu: {
        overflowY: 'auto', height: '100%', width: 320,
    },
    header: {
        paddingTop: 10,
        marginTop: 0,
    },
    componentOptionsDiv: {
        width: '100%',
        height: 'calc(100% - 72px)',
    },
    componentDiv: {
        height: 'calc(100% - 200px)',
    },
    optionsDiv: {
        borderTop: '1px solid grey',
        height: 200,
        position: 'relative',
    },
    optionsTitle: {
        fontSize: 20,
    },
    optionsGithub: {
        position: 'absolute',
        top: 5,
        right: 5,
    },
    optionItem: {
        paddingRight: 10,
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
        extendedProps.Connection = Connection;

        super(props, extendedProps);

        // icon cache
        this.icons = {};

        this.state = {
            ...this.state,
            component: window.localStorage.getItem('component') ? window.localStorage.getItem('component') : 'ObjectBrowser',
            error: false,
            options: {},
            openDialog: false,
            example: '',
        };

        this.components = {
            ColorPicker: {
                component: ColorPicker,
                props: {
                    style: { maxWidth: 250 },
                },
                custom: true,
                options: {
                    disabled: { type: 'checkbox', default: false },
                    name: { type: 'text' },
                    openAbove: { type: 'checkbox', default: false },
                },
                value: '#12345',
                onChange: true,
                example: `<ColorPicker
    value={this.state.color}
    onChange={color => this.setState({color})}
    openAbove={false}
    name={I18n.t('Color')}
    disabled={false}
/>`,
            },
            ComplexCron: <ComplexCron />,
            FileBrowser: <FileBrowser socket={this.socket} />,
            FileViewer: <FileViewer href="" t={I18n.t} />,
            Icon: <Icon />,
            IconPicker: <IconPicker />,
            IconSelector: <IconSelector t={I18n.t} />,
            Image: <Image />,
            Loader: <Loader />,
            Logo: <Logo
                native={{}}
                common={{}}
                instance=""
            />,
            ObjectBrowser: <ObjectBrowser
                lang={I18n.lang}
                t={I18n.t}
                socket={this.socket}
            />,
            SaveCloseButtons: <SaveCloseButtons theme={this.state.theme} />,
            Schedule: <Schedule />,
            SelectWithIcon: <SelectWithIcon options={[]} list={[]} />,
            TextWithIcon: <TextWithIcon />,
            ToggleThemeMenu: <ToggleThemeMenu t={I18n.t} />,
            TreeTable: <TreeTable
                columns={treeColumns}
                data={treeData}
            />,
            ComplexCronDialog: <ComplexCronDialog onClose={() => this.setComponent(null)} />,
            ConfirmDialog: <DialogWrapper component={ConfirmDialog} />,
            CronDialog: <CronDialog onClose={() => this.setComponent(null)} />,
            ErrorDialog: <ErrorDialog onClose={() => this.setComponent(null)} />,
            MessageDialog: <MessageDialog onClose={() => this.setComponent(null)} />,
            SelectIDDialog: <SelectIDDialog onClose={() => this.setComponent(null)} />,
            SimpleCronDialog: <SimpleCronDialog onClose={() => this.setComponent(null)} />,
            TextInputDialog: <TextInputDialog onClose={() => this.setComponent(null)} />,
        };
    }

    componentDidMount() {
        super.componentDidMount();
        this.setComponent(this.state.component);
    }

    async onConnectionReady() {
        //
    }

    static getDerivedStateFromError(error) {
        return { error: true, errorText: error };
    }

    setComponent = component => {
        const comp = this.components[component];
        const options = {};
        let example = '';

        if (comp.custom) {
            Object.keys(comp.options).forEach(option => {
                if (comp.options[option].default) {
                    options[option] = comp.options[option].default;
                }
            });

            if (comp.value !== undefined) {
                options.value = comp.value;
            }
            example = comp.example;
        }

        this.setState({ component, error: false, options, example });
        window.localStorage.setItem('component', component);
    }

    renderCodeDialog() {
        return <Dialog
            open={this.state.openDialog}
            onClose={() => this.setState({ openDialog: false })}
        >
            <DialogTitle>{ I18n.t('Usage example') }</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    <pre>
                        { this.state.example }
                    </pre>
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={() => copy(this.state.example)} variant="outlined">{I18n.t('Copy to clipboard')}</Button>
                <Button onClick={() => this.setState({ openDialog: false })} autoFocus variant="contained">{I18n.t('Close')}</Button>
            </DialogActions>
        </Dialog>;
    }

    renderComponentAndOptions(comp) {
        let options = null;

        if (comp.custom) {
            const Comp = comp.component;

            options = Object.keys(comp.options).map(option => (
                (item, _option) => {
                    if (item.type === 'checkbox') {
                        return <FormControlLabel
                            control={<Checkbox
                                value={!!this.state.options[option]}
                                onChange={() => {
                                    const _options = JSON.parse(JSON.stringify(this.state.options));
                                    _options[_option] = !_options[_option];
                                    this.setState({ options: _options });
                                }}
                            />}
                            label={_option}
                        />;
                    } else if (item.type === 'text') {
                        return <TextField
                            className={this.props.classes.optionItem}
                            label={_option}
                            variant="standard"
                            value={this.state.options[option]}
                            onChange={e => {
                                const _options = JSON.parse(JSON.stringify(this.state.options));
                                _options[_option] = e.target.value;
                                this.setState({ options: _options });
                            }}
                        />;
                    }

                    return null;
                })(comp.options[option], option));

            const props = { ...comp.props, ...this.state.options };
            if (comp.onChange) {
                props.onChange = value => {
                    const _options = JSON.parse(JSON.stringify(this.state.options));
                    _options.value = value;
                    this.setState({ options: _options });
                };
            }

            comp = <Comp {...props} />;
        }

        return <div className={ this.props.classes.componentOptionsDiv }>
            <div className={ this.props.classes.componentDiv }>
                {comp}
            </div>
            <div className={ this.props.classes.optionsDiv }>
                <div className={ this.props.classes.optionsTitle }>{I18n.t('Options')}</div>
                {this.state.example ? <Fab color="primary" className={ this.props.classes.optionsGithub } size="small" onClick={() => this.setState({openDialog: true })}>
                    <GitHubIcon />
                </Fab> : null }
                {options}
            </div>
        </div>;
    }

    render() {
        if (!this.state.loaded) {
            return <StyledEngineProvider injectFirst>
                <ThemeProvider theme={this.state.theme}>
                    <Loader theme={this.state.themeType} />
                </ThemeProvider>
            </StyledEngineProvider>;
        }

        return <StyledEngineProvider injectFirst>
            { this.renderCodeDialog() }
            <ThemeProvider theme={this.state.theme}>
                <div className={this.props.classes.app}>
                    <AppBar position="static">
                        <Toolbar variant="dense">
                            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>{
                                I18n.t('Adapter react')
                            }</Typography>
                        </Toolbar>
                    </AppBar>

                    <Stack direction="row" spacing={2} className={this.props.classes.stack}>
                        <div className={this.props.classes.menu}>
                            <MenuList>
                                {Object.keys(this.components).map(name => <MenuItem
                                    key={name}
                                    selected={name === this.state.component}
                                    onClick={e => this.setComponent(name)}
                                >
                                    {name}
                                </MenuItem>)}
                            </MenuList>
                        </div>
                        <div className={this.props.classes.component}>
                            <h2>
                                {this.components[this.state.component]
                                    ? this.state.component
                                    : I18n.t('Select component')}
                            </h2>
                            {this.state.error
                                ? <>
                                    <div>
                                        {I18n.t('Error component: ')}
                                        {this.state.component}
                                    </div>
                                    <pre>{this.state.errorText.stack.toString()}</pre>
                                </>
                                : this.renderComponentAndOptions(this.components[this.state.component])}
                        </div>
                    </Stack>
                </div>
            </ThemeProvider>
        </StyledEngineProvider>;
    }
}

export default withStyles(styles)(App);
