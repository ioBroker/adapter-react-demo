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
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import GitHubIcon from '@mui/icons-material/GitHub';

import withStyles from '@mui/styles/withStyles';

import copy from 'copy-to-clipboard';
import GenericApp from './adapter-react-v5/src/GenericApp';
import Connection from './ConnectionSimulate';
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
import Example from './Example';

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
            <br />
            <textarea
                rows={4}
                style={{ width: '100%', resize: 'vertical' }}
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
        height: 'calc(100% - 52px)',
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
        overflowY: 'auto',
    },
    optionsDiv: {
        borderTop: '1px solid grey',
        height: 200,
        position: 'relative',
        overflowY: 'auto',
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
    optionInput: {
        display: 'inline-block',
        width: 240,
    },
    image: {
        width: 64,
        height: 64,
    },
    textWithIcon: {
        width: 100,
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
    }

    getComponents = () => (
        {
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
            ComplexCron: {
                component: ComplexCron,
                custom: true,
                options: {
                    cronExpression: { type: 'text' },
                    language: { type: 'text' },
                },
                props: {},
                example: `<ComplexCron
    cronExpression={this.state.cron}
    onChange={cron => this.setState({cron})}
    language="en"
/>`
            },
            FileBrowser: {
                component: FileBrowser,
                custom: true,
                options: {
                    imagePrefix: { type: 'text' },
                    selected: { type: 'text' },
                    filterByType: { type: 'text' },
                    ready: { type: 'checkbox' },
                    expertMode: { type: 'checkbox' },
                    showToolbar: { type: 'checkbox' },
                    allowUpload: { type: 'checkbox' },
                    allowDownload: { type: 'checkbox' },
                    allowCreateFolder: { type: 'checkbox' },
                    allowDelete: { type: 'checkbox' },
                    allowView: { type: 'checkbox' },
                    showExpertButton: { type: 'checkbox' },
                    viewType: { type: 'checkbox' },
                    showViewTypeButton: { type: 'checkbox' },
                    tileView: { type: 'checkbox' },
                },
                props: {
                    socket: this.socket,
                    ready: true,
                    t: I18n.t,
                },
                example: `<FileBrowser
    selected={this.state.currentFile} 
    t={I18n.t}
    onClose={ () => this.setState({showViewer: false}) }
/>`,
            },
            FileViewer: {
                component: FileViewer,
                props: {
                    t: I18n.t,
                },
                dialog: true,
                custom: true,
                options: {
                    fullScreen: { type: 'checkbox', default: false },
                    lang: {
                        type: 'options',
                        default: 'en',
                        options: [
                            { value: 'ru', title: 'ru' },
                            { value: 'de', title: 'de' },
                            { value: 'en', title: 'en' },
                        ],
                    },
                    href: {
                        type: 'options',
                        default: './adapter/admin/admin.png',
                        options: [
                            { value: './adapter/admin/admin.png', title: 'image' },
                            { value: './index.html', title: 'text' },
                            { value: './manifest.json', title: 'code' },
                        ],
                    },
                },
                example: `<FileViewer
    href="./image.png" 
    t={I18n.t}
    onClose={ () => this.setState({showViewer: false}) }
/>`,
            },
            Icon: {
                component: Icon,
                custom: true,
                options: {
                    color: { type: 'text' },
                    title: { type: 'text' },
                    src: { type: 'text', default: './adapter/admin/admin.png' },
                    imagePrefix: { type: 'text' },
                },
                props: {},
            },
            IconPicker: {
                component: IconPicker,
                custom: true,
                onChange: true,
                options: {
                    previewClassName: { type: 'text' },
                    label: { type: 'text' },
                    disabled: { type: 'checkbox' },

                    onlyRooms: { type: 'checkbox' },
                    onlyDevices: { type: 'checkbox' },
                },
                props: {},
            },
            IconSelector: {
                component: IconSelector,
                custom: true,
                onChange: true,
                options: {
                    onlyRooms: { type: 'checkbox' },
                    onlyDevices: { type: 'checkbox' },
                },
                props: { t: I18n.t },
            },
            Image: {
                component: Image,
                custom: true,
                options: {
                    color: { type: 'text' },
                    src: { type: 'text', default: 'data:image/svg+xml;base64,PHN2ZyBoZWlnaHQ9IjQ4NnB0IiB2aWV3Qm94PSIwIDEzMCA0ODYuNzA2MjUgNDg2IiB3aWR0aD0iNDg2cHQiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+DQogICAgPHBhdGggZmlsbD0iY3VycmVudENvbG9yIiBkPSJtMzU3LjYzNjcxOSAyNDQuMjEwOTM4Yy0xLjkwNjI1LTQxLjMyODEyNi0yNS43NjE3MTktNzYuOTIxODc2LTYwLjE5NTMxMy05NS4zNjMyODItMi43MTQ4NDQtMS40ODA0NjgtNS41MTU2MjUtMi44Mzk4NDQtOC4zNzEwOTQtNC4wNzQyMTgtMTMuOTQxNDA2LTYuMDYyNS0yOS4zMjgxMjQtOS40MjU3ODItNDUuNTAzOTA2LTkuNDI1NzgyLTYwLjc1IDAtMTEwLjM1MTU2MiA0Ny40NTMxMjUtMTEzLjkxMDE1NiAxMDcuMzI4MTI1bC4wMzEyNS0uMDA3ODEydi4yMDMxMjVjMCAyLjIxMDkzNy0uMTA1NDY5IDEyLjA5NzY1Ni0uMTA1NDY5IDEyLjA5NzY1NmwtMS42OTkyMTkgMy43NzM0MzhoMTEuMzcxMDk0YzQuMjczNDM4LTE0IDE3LjM5MDYyNS0yMy41NzAzMTMgMzIuODcxMDk0LTIzLjU3MDMxMyAxOC45NDUzMTIgMCAzNC4zNTkzNzUgMTUuODI4MTI1IDM0LjM1OTM3NSAzNC43NzM0MzcgMCAxOC45NDE0MDctMTUuNDE0MDYzIDM0LjA1MDc4Mi0zNC4zNTkzNzUgMzQuMDUwNzgyLTE4LjEzNjcxOSAwLTMzLjAzMTI1LTE0LjI1MzkwNi0zNC4yNjU2MjUtMzIuMjUzOTA2aC0xMy41NzAzMTNjLS4yODkwNjIgMC0uNTYyNS40NjA5MzctLjgzOTg0My40MjE4NzRsLTE0LjI3MzQzOCAzOS44NjcxODhjLTIuMDAzOTA2IDUuNTU4NTk0IDIuMTEzMjgxIDExLjcxMDkzOCA4LjAxOTUzMSAxMS43MTA5MzhoMTIuMjkyOTY5bC0uMDkzNzUgNjMuNDg0Mzc0YzAgMTIuNTM1MTU3IDEwLjE2NDA2MyAyMi41MTU2MjYgMjIuNjk5MjE5IDIyLjUxNTYyNmg0MC41OTM3NXY1OS42OTE0MDZjMCA5LjMwMDc4MSA5LjM0Mzc1IDE2LjMwODU5NCAxOC42NDQ1MzEgMTYuMzA4NTk0aDEwNC40MzM1OTRjOS4zMDA3ODEgMCAxNi45MjE4NzUtNy4wMDc4MTMgMTYuOTIxODc1LTE2LjMwODU5NHYtMTE5LjkxNzk2OWMwLTE2LjM1NTQ2OSA0LjMxNjQwNi0zMi4zMjgxMjUgMTEuOTYwOTM4LTQ2Ljc5Mjk2OSA3Ljk4NDM3NC0xNS4xMTMyODEgMTIuNjU2MjUtMzIuMjI2NTYyIDEzLjA5Mzc1LTUwLjQwNjI1LjAxOTUzMS0uOTEwMTU2LjAyNzM0My0xLjg0Mzc1LjAyNzM0My0yLjc3NzM0NCAwLTEuNzgxMjUtLjA1MDc4MS0zLjU2NjQwNi0uMTMyODEyLTUuMzI4MTI0em0tMTEyLjIzMDQ2OS04LjQ3MjY1N2gtOS43MTg3NXY5Ljc5Mjk2OWMwIDMuNDE3OTY5LTMuMDgyMDMxIDYuMTg3NS02LjUgNi4xODc1LTMuNDE0MDYyIDAtNi41LTIuNzY5NTMxLTYuNS02LjE4NzV2LTkuNzkyOTY5aC04LjgwMDc4MWMtMy40MTc5NjkgMC02LjE4NzUtMy4wODIwMzEtNi4xODc1LTYuNSAwLTMuNDE0MDYyIDIuNzY5NTMxLTYuNSA2LjE4NzUtNi41aDguODAwNzgxdi04LjcyMjY1NmMwLTMuNDE3OTY5IDMuMDg1OTM4LTYuMTg3NSA2LjUtNi4xODc1IDMuNDE3OTY5IDAgNi41IDIuNzY5NTMxIDYuNSA2LjE4NzV2OC43MjI2NTZoOS43MTg3NWMzLjQxNDA2MiAwIDYuMTg3NSAzLjA4NTkzOCA2LjE4NzUgNi41IDAgMy40MTc5NjktMi43NzM0MzggNi41LTYuMTg3NSA2LjV6bTAgMCIvPg0KICAgIDxwYXRoIGZpbGw9ImN1cnJlbnRDb2xvciIgZD0ibTE4Ny42OTUzMTIgMjg1Ljg3NWMzLjkzNzUtMy45ODA0NjkgNi40MTQwNjMtOS40NDkyMTkgNi40MTQwNjMtMTUuNTIzNDM4IDAtMTIuMTI4OTA2LTkuODU1NDY5LTIxLjk4MDQ2OC0yMS45ODQzNzUtMjEuOTgwNDY4LTYuMDA3ODEyIDAtMTEuNDcyNjU2IDIuNDEwMTU2LTE1LjQ1NzAzMSA2LjM0NzY1Ni00LjAyMzQzOCA0LjAwMzkwNi02LjUyMzQzOCA5LjUzOTA2Mi02LjUyMzQzOCAxNS42MzY3MTkgMCAxMi4xMjUgOS44NTU0NjkgMjEuOTgwNDY5IDIxLjk4MDQ2OSAyMS45ODA0NjkgNi4wNzgxMjUgMCAxMS41ODU5MzgtMi40NzY1NjMgMTUuNTcwMzEyLTYuNDYwOTM4em0wIDAiLz4NCjwvc3ZnPg==' },
                    imagePrefix: { type: 'text' },
                    className: { type: 'text', default: this.props.classes.image },
                },
                props: {},
            },
            Loader: {
                component: Loader,
                custom: true,
                options: {
                    size: { type: 'number' },
                },
                props: {
                    themeType: this.state.themeType,
                },
            },
            Logo: {
                component: Logo,
                custom: true,
                options: {},
                props: {
                    native: {
                        example: true,
                    },
                    common: {
                        name: 'example',
                        icon: './adapter/echarts/echarts.png',
                        readme: 'https://www.iobroker.net/#de/adapters/adapterref/iobroker.cloud/README.md',
                    },
                    instance: 1,
                },
                example:
`<Logo
    instance={this.props.instance}
    common={this.props.common}
    native={this.props.native}
    onError={text => this.setState({errorText: text})}
    onLoad={this.props.onLoad}
/>`,
            },
            ObjectBrowser: {
                component: ObjectBrowser,
                custom: true,
                options: {
                    dialogName: { type: 'text' },
                    imagePrefix: { type: 'text' },
                    themeName: { type: 'text' },
                    themeType: { type: 'text' },
                    selected: { type: 'text' },
                    dateFormat: { type: 'text' },
                    levelPadding: { type: 'number' },

                    showExpertButton: { type: 'checkbox' },
                    expertMode: { type: 'checkbox' },
                    multiSelect: { type: 'checkbox' },
                    notEditable: { type: 'checkbox' },
                    foldersFirst: { type: 'checkbox' },
                    disableColumnSelector: { type: 'checkbox' },
                    isFloatComma: { type: 'checkbox' },
                    objectAddBoolean: { type: 'checkbox' },
                    objectEditBoolean: { type: 'checkbox' },
                    objectStatesView: { type: 'checkbox' },
                    objectImportExport: { type: 'checkbox' },
                    objectEditOfAccessControl: { type: 'checkbox' },
                },
                props: {
                    lang: I18n.lang,
                    t: I18n.t,
                    socket: this.socket,
                    columns: ['role', 'func', 'val', 'name'],
                },
                example:
`<ObjectBrowser
    foldersFirst={ this.props.foldersFirst }
    imagePrefix={ this.props.imagePrefix || this.props.prefix } // prefix is for back compatibility
    defaultFilters={ this.filters }
    dialogName={this.dialogName}
    showExpertButton={ this.props.showExpertButton !== undefined ? this.props.showExpertButton : true }
    style={ {width: '100%', height: '100%'} }
    columns={ this.props.columns || ['name', 'type', 'role', 'room', 'func', 'val'] }
    types={ this.props.types || ['state'] }
    t={ I18n.t }
    lang={ this.props.lang || I18n.getLanguage() }
    socket={ this.props.socket }
    selected={ this.state.selected }
    multiSelect={ this.props.multiSelect }
    notEditable={ this.props.notEditable === undefined ? true : this.props.notEditable }
    name={ this.state.name }
    themeName={ this.props.themeName }
    themeType={ this.props.themeType }
    customFilter={ this.props.customFilter }
    onFilterChanged={ filterConfig => {
    this.filters = filterConfig;
    window.localStorage.setItem(this.dialogName, JSON.stringify(filterConfig));
    } }
    onSelect={ (selected, name, isDouble) => {
    if (JSON.stringify(selected) !== JSON.stringify(this.state.selected)) {
        this.setState({selected, name}, () =>
            isDouble && this.handleOk());
    } else if (isDouble) {
        this.handleOk();
    }
    } }
/>`,
            },
            SaveCloseButtons: {
                component: SaveCloseButtons,
                custom: true,
                options: {
                    dense: { type: 'checkbox' },
                    paddingLeft: { type: 'number' },
                    noTextOnButtons: { type: 'checkbox' },
                    isIFrame: { type: 'checkbox' },
                    changed: { type: 'checkbox' },
                    error: { type: 'checkbox' },
                    newReact: { type: 'checkbox' },
                },
                props: { theme: this.state.theme },
            },
            Schedule: {
                component: Schedule,
                custom: true,
                options: {
                    schedule: { type: 'text' },
                },
                props: {},
            },
            SelectWithIcon: {
                component: SelectWithIcon,
                custom: true,
                options: {
                    themeType: { type: 'text' },
                    value: { type: 'text', default: 'system.user.admin' },
                    label: { type: 'text' },
                    className: { type: 'text' },
                    removePrefix: { type: 'text' },
                    disabled: { type: 'checkbox' },
                    fullWidth: { type: 'checkbox' },
                    allowNone: { type: 'checkbox' },
                },
                onChange: true,
                props: {
                    list: [
                        {
                            _id: 'system.user.admin',
                            common: {
                                icon: 'data:image/svg+xml;base64,PHN2ZyBoZWlnaHQ9IjQ4NnB0IiB2aWV3Qm94PSIwIDEzMCA0ODYuNzA2MjUgNDg2IiB3aWR0aD0iNDg2cHQiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+DQogICAgPHBhdGggZmlsbD0iY3VycmVudENvbG9yIiBkPSJtMzU3LjYzNjcxOSAyNDQuMjEwOTM4Yy0xLjkwNjI1LTQxLjMyODEyNi0yNS43NjE3MTktNzYuOTIxODc2LTYwLjE5NTMxMy05NS4zNjMyODItMi43MTQ4NDQtMS40ODA0NjgtNS41MTU2MjUtMi44Mzk4NDQtOC4zNzEwOTQtNC4wNzQyMTgtMTMuOTQxNDA2LTYuMDYyNS0yOS4zMjgxMjQtOS40MjU3ODItNDUuNTAzOTA2LTkuNDI1NzgyLTYwLjc1IDAtMTEwLjM1MTU2MiA0Ny40NTMxMjUtMTEzLjkxMDE1NiAxMDcuMzI4MTI1bC4wMzEyNS0uMDA3ODEydi4yMDMxMjVjMCAyLjIxMDkzNy0uMTA1NDY5IDEyLjA5NzY1Ni0uMTA1NDY5IDEyLjA5NzY1NmwtMS42OTkyMTkgMy43NzM0MzhoMTEuMzcxMDk0YzQuMjczNDM4LTE0IDE3LjM5MDYyNS0yMy41NzAzMTMgMzIuODcxMDk0LTIzLjU3MDMxMyAxOC45NDUzMTIgMCAzNC4zNTkzNzUgMTUuODI4MTI1IDM0LjM1OTM3NSAzNC43NzM0MzcgMCAxOC45NDE0MDctMTUuNDE0MDYzIDM0LjA1MDc4Mi0zNC4zNTkzNzUgMzQuMDUwNzgyLTE4LjEzNjcxOSAwLTMzLjAzMTI1LTE0LjI1MzkwNi0zNC4yNjU2MjUtMzIuMjUzOTA2aC0xMy41NzAzMTNjLS4yODkwNjIgMC0uNTYyNS40NjA5MzctLjgzOTg0My40MjE4NzRsLTE0LjI3MzQzOCAzOS44NjcxODhjLTIuMDAzOTA2IDUuNTU4NTk0IDIuMTEzMjgxIDExLjcxMDkzOCA4LjAxOTUzMSAxMS43MTA5MzhoMTIuMjkyOTY5bC0uMDkzNzUgNjMuNDg0Mzc0YzAgMTIuNTM1MTU3IDEwLjE2NDA2MyAyMi41MTU2MjYgMjIuNjk5MjE5IDIyLjUxNTYyNmg0MC41OTM3NXY1OS42OTE0MDZjMCA5LjMwMDc4MSA5LjM0Mzc1IDE2LjMwODU5NCAxOC42NDQ1MzEgMTYuMzA4NTk0aDEwNC40MzM1OTRjOS4zMDA3ODEgMCAxNi45MjE4NzUtNy4wMDc4MTMgMTYuOTIxODc1LTE2LjMwODU5NHYtMTE5LjkxNzk2OWMwLTE2LjM1NTQ2OSA0LjMxNjQwNi0zMi4zMjgxMjUgMTEuOTYwOTM4LTQ2Ljc5Mjk2OSA3Ljk4NDM3NC0xNS4xMTMyODEgMTIuNjU2MjUtMzIuMjI2NTYyIDEzLjA5Mzc1LTUwLjQwNjI1LjAxOTUzMS0uOTEwMTU2LjAyNzM0My0xLjg0Mzc1LjAyNzM0My0yLjc3NzM0NCAwLTEuNzgxMjUtLjA1MDc4MS0zLjU2NjQwNi0uMTMyODEyLTUuMzI4MTI0em0tMTEyLjIzMDQ2OS04LjQ3MjY1N2gtOS43MTg3NXY5Ljc5Mjk2OWMwIDMuNDE3OTY5LTMuMDgyMDMxIDYuMTg3NS02LjUgNi4xODc1LTMuNDE0MDYyIDAtNi41LTIuNzY5NTMxLTYuNS02LjE4NzV2LTkuNzkyOTY5aC04LjgwMDc4MWMtMy40MTc5NjkgMC02LjE4NzUtMy4wODIwMzEtNi4xODc1LTYuNSAwLTMuNDE0MDYyIDIuNzY5NTMxLTYuNSA2LjE4NzUtNi41aDguODAwNzgxdi04LjcyMjY1NmMwLTMuNDE3OTY5IDMuMDg1OTM4LTYuMTg3NSA2LjUtNi4xODc1IDMuNDE3OTY5IDAgNi41IDIuNzY5NTMxIDYuNSA2LjE4NzV2OC43MjI2NTZoOS43MTg3NWMzLjQxNDA2MiAwIDYuMTg3NSAzLjA4NTkzOCA2LjE4NzUgNi41IDAgMy40MTc5NjktMi43NzM0MzggNi41LTYuMTg3NSA2LjV6bTAgMCIvPg0KICAgIDxwYXRoIGZpbGw9ImN1cnJlbnRDb2xvciIgZD0ibTE4Ny42OTUzMTIgMjg1Ljg3NWMzLjkzNzUtMy45ODA0NjkgNi40MTQwNjMtOS40NDkyMTkgNi40MTQwNjMtMTUuNTIzNDM4IDAtMTIuMTI4OTA2LTkuODU1NDY5LTIxLjk4MDQ2OC0yMS45ODQzNzUtMjEuOTgwNDY4LTYuMDA3ODEyIDAtMTEuNDcyNjU2IDIuNDEwMTU2LTE1LjQ1NzAzMSA2LjM0NzY1Ni00LjAyMzQzOCA0LjAwMzkwNi02LjUyMzQzOCA5LjUzOTA2Mi02LjUyMzQzOCAxNS42MzY3MTkgMCAxMi4xMjUgOS44NTU0NjkgMjEuOTgwNDY5IDIxLjk4MDQ2OSAyMS45ODA0NjkgNi4wNzgxMjUgMCAxMS41ODU5MzgtMi40NzY1NjMgMTUuNTcwMzEyLTYuNDYwOTM4em0wIDAiLz4NCjwvc3ZnPg==',
                                color: 'red',
                                name: 'Admin',
                            },
                        },
                        {
                            _id: 'system.user.user',
                            common: {
                                icon: 'data:image/svg+xml;base64,PHN2ZyBoZWlnaHQ9IjQ4NnB0IiB2aWV3Qm94PSIwIDEzMCA0ODYuNzA2MjUgNDg2IiB3aWR0aD0iNDg2cHQiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+DQogICAgPHBhdGggZmlsbD0iY3VycmVudENvbG9yIiBkPSJtMzU3LjYzNjcxOSAyNDQuMjEwOTM4Yy0xLjkwNjI1LTQxLjMyODEyNi0yNS43NjE3MTktNzYuOTIxODc2LTYwLjE5NTMxMy05NS4zNjMyODItMi43MTQ4NDQtMS40ODA0NjgtNS41MTU2MjUtMi44Mzk4NDQtOC4zNzEwOTQtNC4wNzQyMTgtMTMuOTQxNDA2LTYuMDYyNS0yOS4zMjgxMjQtOS40MjU3ODItNDUuNTAzOTA2LTkuNDI1NzgyLTYwLjc1IDAtMTEwLjM1MTU2MiA0Ny40NTMxMjUtMTEzLjkxMDE1NiAxMDcuMzI4MTI1bC4wMzEyNS0uMDA3ODEydi4yMDMxMjVjMCAyLjIxMDkzNy0uMTA1NDY5IDEyLjA5NzY1Ni0uMTA1NDY5IDEyLjA5NzY1NmwtMS42OTkyMTkgMy43NzM0MzhoMTEuMzcxMDk0YzQuMjczNDM4LTE0IDE3LjM5MDYyNS0yMy41NzAzMTMgMzIuODcxMDk0LTIzLjU3MDMxMyAxOC45NDUzMTIgMCAzNC4zNTkzNzUgMTUuODI4MTI1IDM0LjM1OTM3NSAzNC43NzM0MzcgMCAxOC45NDE0MDctMTUuNDE0MDYzIDM0LjA1MDc4Mi0zNC4zNTkzNzUgMzQuMDUwNzgyLTE4LjEzNjcxOSAwLTMzLjAzMTI1LTE0LjI1MzkwNi0zNC4yNjU2MjUtMzIuMjUzOTA2aC0xMy41NzAzMTNjLS4yODkwNjIgMC0uNTYyNS40NjA5MzctLjgzOTg0My40MjE4NzRsLTE0LjI3MzQzOCAzOS44NjcxODhjLTIuMDAzOTA2IDUuNTU4NTk0IDIuMTEzMjgxIDExLjcxMDkzOCA4LjAxOTUzMSAxMS43MTA5MzhoMTIuMjkyOTY5bC0uMDkzNzUgNjMuNDg0Mzc0YzAgMTIuNTM1MTU3IDEwLjE2NDA2MyAyMi41MTU2MjYgMjIuNjk5MjE5IDIyLjUxNTYyNmg0MC41OTM3NXY1OS42OTE0MDZjMCA5LjMwMDc4MSA5LjM0Mzc1IDE2LjMwODU5NCAxOC42NDQ1MzEgMTYuMzA4NTk0aDEwNC40MzM1OTRjOS4zMDA3ODEgMCAxNi45MjE4NzUtNy4wMDc4MTMgMTYuOTIxODc1LTE2LjMwODU5NHYtMTE5LjkxNzk2OWMwLTE2LjM1NTQ2OSA0LjMxNjQwNi0zMi4zMjgxMjUgMTEuOTYwOTM4LTQ2Ljc5Mjk2OSA3Ljk4NDM3NC0xNS4xMTMyODEgMTIuNjU2MjUtMzIuMjI2NTYyIDEzLjA5Mzc1LTUwLjQwNjI1LjAxOTUzMS0uOTEwMTU2LjAyNzM0My0xLjg0Mzc1LjAyNzM0My0yLjc3NzM0NCAwLTEuNzgxMjUtLjA1MDc4MS0zLjU2NjQwNi0uMTMyODEyLTUuMzI4MTI0em0tMTEyLjIzMDQ2OS04LjQ3MjY1N2gtOS43MTg3NXY5Ljc5Mjk2OWMwIDMuNDE3OTY5LTMuMDgyMDMxIDYuMTg3NS02LjUgNi4xODc1LTMuNDE0MDYyIDAtNi41LTIuNzY5NTMxLTYuNS02LjE4NzV2LTkuNzkyOTY5aC04LjgwMDc4MWMtMy40MTc5NjkgMC02LjE4NzUtMy4wODIwMzEtNi4xODc1LTYuNSAwLTMuNDE0MDYyIDIuNzY5NTMxLTYuNSA2LjE4NzUtNi41aDguODAwNzgxdi04LjcyMjY1NmMwLTMuNDE3OTY5IDMuMDg1OTM4LTYuMTg3NSA2LjUtNi4xODc1IDMuNDE3OTY5IDAgNi41IDIuNzY5NTMxIDYuNSA2LjE4NzV2OC43MjI2NTZoOS43MTg3NWMzLjQxNDA2MiAwIDYuMTg3NSAzLjA4NTkzOCA2LjE4NzUgNi41IDAgMy40MTc5NjktMi43NzM0MzggNi41LTYuMTg3NSA2LjV6bTAgMCIvPg0KICAgIDxwYXRoIGZpbGw9ImN1cnJlbnRDb2xvciIgZD0ibTE4Ny42OTUzMTIgMjg1Ljg3NWMzLjkzNzUtMy45ODA0NjkgNi40MTQwNjMtOS40NDkyMTkgNi40MTQwNjMtMTUuNTIzNDM4IDAtMTIuMTI4OTA2LTkuODU1NDY5LTIxLjk4MDQ2OC0yMS45ODQzNzUtMjEuOTgwNDY4LTYuMDA3ODEyIDAtMTEuNDcyNjU2IDIuNDEwMTU2LTE1LjQ1NzAzMSA2LjM0NzY1Ni00LjAyMzQzOCA0LjAwMzkwNi02LjUyMzQzOCA5LjUzOTA2Mi02LjUyMzQzOCAxNS42MzY3MTkgMCAxMi4xMjUgOS44NTU0NjkgMjEuOTgwNDY5IDIxLjk4MDQ2OSAyMS45ODA0NjkgNi4wNzgxMjUgMCAxMS41ODU5MzgtMi40NzY1NjMgMTUuNTcwMzEyLTYuNDYwOTM4em0wIDAiLz4NCjwvc3ZnPg==',
                                color: 'green',
                                name: 'User',
                            },
                        },
                    ],
                },
            },
            TextWithIcon: {
                component: TextWithIcon,
                custom: true,
                options: {
                    themeType: { type: 'text' },
                    value: { type: 'text', default: 'system.user.admin' },
                    className: { type: 'text', default: this.props.classes.textWithIcon },
                    title: { type: 'text' },
                    removePrefix: { type: 'text' },
                },
                props: {
                    list: [
                        {
                            _id: 'system.user.admin',
                            common: {
                                icon: 'data:image/svg+xml;base64,PHN2ZyBoZWlnaHQ9IjQ4NnB0IiB2aWV3Qm94PSIwIDEzMCA0ODYuNzA2MjUgNDg2IiB3aWR0aD0iNDg2cHQiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+DQogICAgPHBhdGggZmlsbD0iY3VycmVudENvbG9yIiBkPSJtMzU3LjYzNjcxOSAyNDQuMjEwOTM4Yy0xLjkwNjI1LTQxLjMyODEyNi0yNS43NjE3MTktNzYuOTIxODc2LTYwLjE5NTMxMy05NS4zNjMyODItMi43MTQ4NDQtMS40ODA0NjgtNS41MTU2MjUtMi44Mzk4NDQtOC4zNzEwOTQtNC4wNzQyMTgtMTMuOTQxNDA2LTYuMDYyNS0yOS4zMjgxMjQtOS40MjU3ODItNDUuNTAzOTA2LTkuNDI1NzgyLTYwLjc1IDAtMTEwLjM1MTU2MiA0Ny40NTMxMjUtMTEzLjkxMDE1NiAxMDcuMzI4MTI1bC4wMzEyNS0uMDA3ODEydi4yMDMxMjVjMCAyLjIxMDkzNy0uMTA1NDY5IDEyLjA5NzY1Ni0uMTA1NDY5IDEyLjA5NzY1NmwtMS42OTkyMTkgMy43NzM0MzhoMTEuMzcxMDk0YzQuMjczNDM4LTE0IDE3LjM5MDYyNS0yMy41NzAzMTMgMzIuODcxMDk0LTIzLjU3MDMxMyAxOC45NDUzMTIgMCAzNC4zNTkzNzUgMTUuODI4MTI1IDM0LjM1OTM3NSAzNC43NzM0MzcgMCAxOC45NDE0MDctMTUuNDE0MDYzIDM0LjA1MDc4Mi0zNC4zNTkzNzUgMzQuMDUwNzgyLTE4LjEzNjcxOSAwLTMzLjAzMTI1LTE0LjI1MzkwNi0zNC4yNjU2MjUtMzIuMjUzOTA2aC0xMy41NzAzMTNjLS4yODkwNjIgMC0uNTYyNS40NjA5MzctLjgzOTg0My40MjE4NzRsLTE0LjI3MzQzOCAzOS44NjcxODhjLTIuMDAzOTA2IDUuNTU4NTk0IDIuMTEzMjgxIDExLjcxMDkzOCA4LjAxOTUzMSAxMS43MTA5MzhoMTIuMjkyOTY5bC0uMDkzNzUgNjMuNDg0Mzc0YzAgMTIuNTM1MTU3IDEwLjE2NDA2MyAyMi41MTU2MjYgMjIuNjk5MjE5IDIyLjUxNTYyNmg0MC41OTM3NXY1OS42OTE0MDZjMCA5LjMwMDc4MSA5LjM0Mzc1IDE2LjMwODU5NCAxOC42NDQ1MzEgMTYuMzA4NTk0aDEwNC40MzM1OTRjOS4zMDA3ODEgMCAxNi45MjE4NzUtNy4wMDc4MTMgMTYuOTIxODc1LTE2LjMwODU5NHYtMTE5LjkxNzk2OWMwLTE2LjM1NTQ2OSA0LjMxNjQwNi0zMi4zMjgxMjUgMTEuOTYwOTM4LTQ2Ljc5Mjk2OSA3Ljk4NDM3NC0xNS4xMTMyODEgMTIuNjU2MjUtMzIuMjI2NTYyIDEzLjA5Mzc1LTUwLjQwNjI1LjAxOTUzMS0uOTEwMTU2LjAyNzM0My0xLjg0Mzc1LjAyNzM0My0yLjc3NzM0NCAwLTEuNzgxMjUtLjA1MDc4MS0zLjU2NjQwNi0uMTMyODEyLTUuMzI4MTI0em0tMTEyLjIzMDQ2OS04LjQ3MjY1N2gtOS43MTg3NXY5Ljc5Mjk2OWMwIDMuNDE3OTY5LTMuMDgyMDMxIDYuMTg3NS02LjUgNi4xODc1LTMuNDE0MDYyIDAtNi41LTIuNzY5NTMxLTYuNS02LjE4NzV2LTkuNzkyOTY5aC04LjgwMDc4MWMtMy40MTc5NjkgMC02LjE4NzUtMy4wODIwMzEtNi4xODc1LTYuNSAwLTMuNDE0MDYyIDIuNzY5NTMxLTYuNSA2LjE4NzUtNi41aDguODAwNzgxdi04LjcyMjY1NmMwLTMuNDE3OTY5IDMuMDg1OTM4LTYuMTg3NSA2LjUtNi4xODc1IDMuNDE3OTY5IDAgNi41IDIuNzY5NTMxIDYuNSA2LjE4NzV2OC43MjI2NTZoOS43MTg3NWMzLjQxNDA2MiAwIDYuMTg3NSAzLjA4NTkzOCA2LjE4NzUgNi41IDAgMy40MTc5NjktMi43NzM0MzggNi41LTYuMTg3NSA2LjV6bTAgMCIvPg0KICAgIDxwYXRoIGZpbGw9ImN1cnJlbnRDb2xvciIgZD0ibTE4Ny42OTUzMTIgMjg1Ljg3NWMzLjkzNzUtMy45ODA0NjkgNi40MTQwNjMtOS40NDkyMTkgNi40MTQwNjMtMTUuNTIzNDM4IDAtMTIuMTI4OTA2LTkuODU1NDY5LTIxLjk4MDQ2OC0yMS45ODQzNzUtMjEuOTgwNDY4LTYuMDA3ODEyIDAtMTEuNDcyNjU2IDIuNDEwMTU2LTE1LjQ1NzAzMSA2LjM0NzY1Ni00LjAyMzQzOCA0LjAwMzkwNi02LjUyMzQzOCA5LjUzOTA2Mi02LjUyMzQzOCAxNS42MzY3MTkgMCAxMi4xMjUgOS44NTU0NjkgMjEuOTgwNDY5IDIxLjk4MDQ2OSAyMS45ODA0NjkgNi4wNzgxMjUgMCAxMS41ODU5MzgtMi40NzY1NjMgMTUuNTcwMzEyLTYuNDYwOTM4em0wIDAiLz4NCjwvc3ZnPg==',
                                color: 'red',
                                name: 'Admin',
                            },
                        },
                        {
                            _id: 'system.user.user',
                            common: {
                                icon: 'data:image/svg+xml;base64,PHN2ZyBoZWlnaHQ9IjQ4NnB0IiB2aWV3Qm94PSIwIDEzMCA0ODYuNzA2MjUgNDg2IiB3aWR0aD0iNDg2cHQiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+DQogICAgPHBhdGggZmlsbD0iY3VycmVudENvbG9yIiBkPSJtMzU3LjYzNjcxOSAyNDQuMjEwOTM4Yy0xLjkwNjI1LTQxLjMyODEyNi0yNS43NjE3MTktNzYuOTIxODc2LTYwLjE5NTMxMy05NS4zNjMyODItMi43MTQ4NDQtMS40ODA0NjgtNS41MTU2MjUtMi44Mzk4NDQtOC4zNzEwOTQtNC4wNzQyMTgtMTMuOTQxNDA2LTYuMDYyNS0yOS4zMjgxMjQtOS40MjU3ODItNDUuNTAzOTA2LTkuNDI1NzgyLTYwLjc1IDAtMTEwLjM1MTU2MiA0Ny40NTMxMjUtMTEzLjkxMDE1NiAxMDcuMzI4MTI1bC4wMzEyNS0uMDA3ODEydi4yMDMxMjVjMCAyLjIxMDkzNy0uMTA1NDY5IDEyLjA5NzY1Ni0uMTA1NDY5IDEyLjA5NzY1NmwtMS42OTkyMTkgMy43NzM0MzhoMTEuMzcxMDk0YzQuMjczNDM4LTE0IDE3LjM5MDYyNS0yMy41NzAzMTMgMzIuODcxMDk0LTIzLjU3MDMxMyAxOC45NDUzMTIgMCAzNC4zNTkzNzUgMTUuODI4MTI1IDM0LjM1OTM3NSAzNC43NzM0MzcgMCAxOC45NDE0MDctMTUuNDE0MDYzIDM0LjA1MDc4Mi0zNC4zNTkzNzUgMzQuMDUwNzgyLTE4LjEzNjcxOSAwLTMzLjAzMTI1LTE0LjI1MzkwNi0zNC4yNjU2MjUtMzIuMjUzOTA2aC0xMy41NzAzMTNjLS4yODkwNjIgMC0uNTYyNS40NjA5MzctLjgzOTg0My40MjE4NzRsLTE0LjI3MzQzOCAzOS44NjcxODhjLTIuMDAzOTA2IDUuNTU4NTk0IDIuMTEzMjgxIDExLjcxMDkzOCA4LjAxOTUzMSAxMS43MTA5MzhoMTIuMjkyOTY5bC0uMDkzNzUgNjMuNDg0Mzc0YzAgMTIuNTM1MTU3IDEwLjE2NDA2MyAyMi41MTU2MjYgMjIuNjk5MjE5IDIyLjUxNTYyNmg0MC41OTM3NXY1OS42OTE0MDZjMCA5LjMwMDc4MSA5LjM0Mzc1IDE2LjMwODU5NCAxOC42NDQ1MzEgMTYuMzA4NTk0aDEwNC40MzM1OTRjOS4zMDA3ODEgMCAxNi45MjE4NzUtNy4wMDc4MTMgMTYuOTIxODc1LTE2LjMwODU5NHYtMTE5LjkxNzk2OWMwLTE2LjM1NTQ2OSA0LjMxNjQwNi0zMi4zMjgxMjUgMTEuOTYwOTM4LTQ2Ljc5Mjk2OSA3Ljk4NDM3NC0xNS4xMTMyODEgMTIuNjU2MjUtMzIuMjI2NTYyIDEzLjA5Mzc1LTUwLjQwNjI1LjAxOTUzMS0uOTEwMTU2LjAyNzM0My0xLjg0Mzc1LjAyNzM0My0yLjc3NzM0NCAwLTEuNzgxMjUtLjA1MDc4MS0zLjU2NjQwNi0uMTMyODEyLTUuMzI4MTI0em0tMTEyLjIzMDQ2OS04LjQ3MjY1N2gtOS43MTg3NXY5Ljc5Mjk2OWMwIDMuNDE3OTY5LTMuMDgyMDMxIDYuMTg3NS02LjUgNi4xODc1LTMuNDE0MDYyIDAtNi41LTIuNzY5NTMxLTYuNS02LjE4NzV2LTkuNzkyOTY5aC04LjgwMDc4MWMtMy40MTc5NjkgMC02LjE4NzUtMy4wODIwMzEtNi4xODc1LTYuNSAwLTMuNDE0MDYyIDIuNzY5NTMxLTYuNSA2LjE4NzUtNi41aDguODAwNzgxdi04LjcyMjY1NmMwLTMuNDE3OTY5IDMuMDg1OTM4LTYuMTg3NSA2LjUtNi4xODc1IDMuNDE3OTY5IDAgNi41IDIuNzY5NTMxIDYuNSA2LjE4NzV2OC43MjI2NTZoOS43MTg3NWMzLjQxNDA2MiAwIDYuMTg3NSAzLjA4NTkzOCA2LjE4NzUgNi41IDAgMy40MTc5NjktMi43NzM0MzggNi41LTYuMTg3NSA2LjV6bTAgMCIvPg0KICAgIDxwYXRoIGZpbGw9ImN1cnJlbnRDb2xvciIgZD0ibTE4Ny42OTUzMTIgMjg1Ljg3NWMzLjkzNzUtMy45ODA0NjkgNi40MTQwNjMtOS40NDkyMTkgNi40MTQwNjMtMTUuNTIzNDM4IDAtMTIuMTI4OTA2LTkuODU1NDY5LTIxLjk4MDQ2OC0yMS45ODQzNzUtMjEuOTgwNDY4LTYuMDA3ODEyIDAtMTEuNDcyNjU2IDIuNDEwMTU2LTE1LjQ1NzAzMSA2LjM0NzY1Ni00LjAyMzQzOCA0LjAwMzkwNi02LjUyMzQzOCA5LjUzOTA2Mi02LjUyMzQzOCAxNS42MzY3MTkgMCAxMi4xMjUgOS44NTU0NjkgMjEuOTgwNDY5IDIxLjk4MDQ2OSAyMS45ODA0NjkgNi4wNzgxMjUgMCAxMS41ODU5MzgtMi40NzY1NjMgMTUuNTcwMzEyLTYuNDYwOTM4em0wIDAiLz4NCjwvc3ZnPg==',
                                color: 'green',
                                name: 'User',
                            },
                        },
                    ],
                },
            },
            ToggleThemeMenu: {
                component: ToggleThemeMenu,
                custom: true,
                options: {},
                props: {
                    t: I18n.t,
                    toggleTheme: () => this.toggleTheme(),
                    themeName: this.state.themeName,
                },
            },
            TreeTable: {
                component: TreeTable,
                custom: true,
                options: {
                    className: { type: 'text' },
                    name: { type: 'text' },
                    themeType: { type: 'text' },
                    loading: { type: 'checkbox' },
                    noSort: { type: 'checkbox' },
                    noAdd: { type: 'checkbox' },
                    glowOnChange: { type: 'checkbox' },
                },
                props: {
                    columns: treeColumns,
                    data: treeData,
                },
                example:
`<TreeTable
    columns={this.columns}
    data={this.state.data}
    onUpdate={(newData, oldData) => {
        const data = JSON.parse(JSON.stringify(this.state.data));
        
        // Added new line
        if (newData === true) {
            // find unique ID
            let i = 1;
            let id = 'line_' + i;

            // eslint-disable-next-line
            while(this.state.data.find(item => item.id === id)) {
                i++;
                id = 'line_' + i;
            }

            data.push({
                id,
                name: I18n.t('New resource') + '_' + i,
                color: '',
                icon: '',
                unit: '',
                price: 0,
            });
        } else {
            // existing line was modified
            const pos = this.state.data.indexOf(oldData);
            if (pos !== -1) {
                Object.keys(newData).forEach(attr => data[pos][attr] = newData[attr]);
            }
        }

        this.setState({data});
    }}
    onDelete={oldData => {
        console.log('Delete: ' + JSON.stringify(oldData));
        const pos = this.state.data.indexOf(oldData);
        if (pos !== -1) {
            const data = JSON.parse(JSON.stringify(this.state.data));
            data.splice(pos, 1);
            this.setState({data});
        }
    }}
/>`,
            },
            ComplexCronDialog: {
                component: ComplexCronDialog,
                custom: true,
                dialog: true,
                options: {
                    title: { type: 'text' },
                    cron: { type: 'text' },
                    cancel: { type: 'text' },
                    ok: { type: 'text' },
                    simple: { type: 'checkbox' },
                    language: { type: 'text' },
                    clearButton: { type: 'checkbox' },
                },
                props: {},
                example: `
                
`,
            },
            ConfirmDialog: {
                component: ConfirmDialog,
                custom: true,
                dialog: true,
                options: {
                    title: { type: 'text' },
                    text: { type: 'text' },
                    ok: { type: 'text' },
                    cancel: { type: 'text' },
                    suppressQuestionMinutes: { type: 'number' },
                    suppressText: { type: 'text' },
                    dialogName: { type: 'text', default: 'test'},
                },
                props: {},
                example:
`<ConfirmDialog
    title={ I18n.t('Scene will be overwritten.') }
    text={ I18n.t('All data will be lost. Confirm?') }
    ok={ I18n.t('Yes') }
    cancel={ I18n.t('Cancel') }
    suppressQuestionMinutes={5}
    dialogName="myConfirmDialogThatCouldBeSuppressed"
    suppressText={I18n.t('Suppress question for next %s minutes', 5)}
    onClose={isYes => {
        this.setState({ confirmDialog: false} );
    }}
/>`,
            },
            CronDialog: {
                component: CronDialog,
                custom: true,
                dialog: true,
                options: {
                    title: { type: 'text' },
                    cron: { type: 'text' },
                    cancel: { type: 'text' },
                    ok: { type: 'text' },
                    simple: { type: 'checkbox' },
                    complex: { type: 'checkbox' },
                    language: { type: 'text' },
                },
                props: {},
            },
            ErrorDialog: {
                component: ErrorDialog,
                custom: true,
                dialog: true,
                options: {
                    title: { type: 'text' },
                    text: { type: 'text' },
                },
                props: {},
            },
            MessageDialog: {
                component: MessageDialog,
                custom: true,
                dialog: true,
                options: {
                    title: { type: 'text' },
                    text: { type: 'text' },
                },
                props: {},
            },
            SelectIDDialog: {
                component: SelectIDDialog,
                custom: true,
                dialog: true,
                options: {
                    dialogName: { type: 'text' },
                    title: { type: 'text' },
                    lang: { type: 'text' },
                    selected: { type: 'text' },
                    cancel: { type: 'text' },
                    imagePrefix: { type: 'text' },
                    dateFormat: { type: 'text' },
                    themeName: { type: 'text' },
                    themeType: { type: 'text' },
                    ok: { type: 'text' },
                    notEditable: { type: 'checkbox' },
                    foldersFirst: { type: 'checkbox' },
                    isFloatComma: { type: 'checkbox' },
                    statesOnly: { type: 'checkbox' },
                    showExpertButton: { type: 'checkbox' },
                    multiSelect: { type: 'checkbox' },
                },
                props: {
                    lang: I18n.lang,
                    t: I18n.t,
                    socket: this.socket,
                },
                example:
`<SelectIDDialog
    key="tableSelect"
    imagePrefix="../.."
    dialogName={this.props.adapterName}
    themeType={this.props.themeType}
    socket={this.props.socket}
    statesOnly={true}
    selected={this.state.selectIdValue}
    onClose={() => this.setState({showSelectId: false})}
    onOk={(selected, name) => {
        this.setState({showSelectId: false, selectIdValue: selected});                 
    }}
/>`,
            },
            SimpleCronDialog: {
                component: SimpleCronDialog,
                custom: true,
                dialog: true,
                options: {
                    title: { type: 'text' },
                    cron: { type: 'text' },
                    cancel: { type: 'text' },
                    ok: { type: 'text' },
                    simple: { type: 'checkbox' },
                    language: { type: 'text' },
                },
                props: {},
            },
            TextInputDialog: {
                component: TextInputDialog,
                custom: true,
                dialog: true,
                options: {
                    titleText: { type: 'text' },
                    promptText: { type: 'text' },
                    labelText: { type: 'text' },
                    cancelText: { type: 'text' },
                    applyText: { type: 'text' },
                    type: { type: 'text' },
                    value: { type: 'text' },
                },
                props: {},
            },
        })

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
        const comp = this.getComponents()[component];
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
            if (!example) {
                example = `<${component}\n  ${
                    Object.keys(comp.props).map(key => `${key}=""`).join('\n  ')
                }\n  ${
                    Object.keys(comp.options).map(key => `${key}=""`).join('\n  ')
                } />`;
            }
        }

        this.setState({
            component, error: false, options, example,
        });
        window.localStorage.setItem('component', component);
    }

    renderCodeDialog() {
        return <Dialog
            maxWidth="md"
            open={this.state.openDialog}
            onClose={() => this.setState({ openDialog: false })}
        >
            <DialogTitle>{ I18n.t('Usage example') }</DialogTitle>
            <DialogContent>
                <Example code={this.state.example} themeName={this.state.themeName} />
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
                    let input = null;
                    if (item.type === 'checkbox') {
                        input = <FormControlLabel
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
                    } if (item.type === 'text' || item.type === 'number') {
                        input = <TextField
                            className={this.props.classes.optionItem}
                            label={_option}
                            type={item.type}
                            variant="standard"
                            value={this.state.options[option]}
                            onChange={e => {
                                const _options = JSON.parse(JSON.stringify(this.state.options));
                                _options[_option] = item.type === 'number' ? parseInt(e.target.value) : e.target.value;
                                this.setState({ options: _options });
                            }}
                        />;
                    } if (item.type === 'options') {
                        input = <FormControl>
                            <InputLabel>{_option}</InputLabel>
                            <Select
                                value={this.state.options[option]}
                                onChange={e => {
                                    const _options = JSON.parse(JSON.stringify(this.state.options));
                                    _options[_option] = e.target.value;
                                    this.setState({ options: _options });
                                }}
                            >
                                {item.options.map(it => <MenuItem key={it.value} value={it.value}>{it.title}</MenuItem>)}
                            </Select>
                        </FormControl>;
                    }

                    return input ? <span className={this.props.classes.optionInput} key={option}>{input}</span> : null;
                })(comp.options[option], option));

            const props = { ...comp.props, ...this.state.options };
            if (comp.onChange) {
                props.onChange = value => {
                    const _options = JSON.parse(JSON.stringify(this.state.options));
                    _options.value = value;
                    this.setState({ options: _options });
                };
            }

            if (comp.dialog) {
                comp = [
                    <Button key="button" variant="contained" onClick={() => this.setState({ opened: true })}>Open dialog</Button>,
                    this.state.opened ? <Comp {...props} onClose={() => this.setState({ opened: false })} /> : null,
                ];
            } else {
                comp = <Comp {...props} />;
            }
        }

        return <div className={this.props.classes.componentOptionsDiv}>
            <div className={this.props.classes.componentDiv}>
                {comp}
            </div>
            <div className={this.props.classes.optionsDiv}>
                <div className={this.props.classes.optionsTitle}>{I18n.t('Options')}</div>
                {this.state.example ? <Fab color="primary" className={this.props.classes.optionsGithub} size="small" onClick={() => this.setState({ openDialog: true })}>
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
                            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                                {
                                    I18n.t('Adapter react')
                                }
                            </Typography>
                            <ToggleThemeMenu
                                toggleTheme={() => this.toggleTheme()}
                                themeName={this.state.themeName}
                                t={I18n.t}
                            />
                        </Toolbar>
                    </AppBar>

                    <Stack direction="row" spacing={2} className={this.props.classes.stack}>
                        <div className={this.props.classes.menu}>
                            <MenuList>
                                {Object.keys(this.getComponents()).map(name => <MenuItem
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
                                {this.getComponents()[this.state.component]
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
                                : this.renderComponentAndOptions(this.getComponents()[this.state.component])}
                        </div>
                    </Stack>
                </div>
            </ThemeProvider>
        </StyledEngineProvider>;
    }
}

export default withStyles(styles)(App);
