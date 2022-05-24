import React from 'react';
import { ThemeProvider, StyledEngineProvider } from '@mui/material/styles';
import { MenuItem, Stack, MenuList } from '@mui/material';
import Splitter, { SplitDirection, GutterTheme } from '@devbookhq/splitter';

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
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import GitHubIcon from '@mui/icons-material/GitHub';

import withStyles from '@mui/styles/withStyles';

import copy from 'copy-to-clipboard';
import { withSnackbar } from 'notistack';

import GenericApp from '@iobroker/adapter-react-v5/GenericApp';
import I18n from '@iobroker/adapter-react-v5/i18n';

import ColorPicker from '@iobroker/adapter-react-v5/Components/ColorPicker';
import ComplexCron from '@iobroker/adapter-react-v5/Components/ComplexCron';
import FileBrowser from '@iobroker/adapter-react-v5/Components/FileBrowser';
import FileViewer from '@iobroker/adapter-react-v5/Components/FileViewer';
import Icon from '@iobroker/adapter-react-v5/Components/Icon';
import IconPicker from '@iobroker/adapter-react-v5/Components/IconPicker';
import IconSelector from '@iobroker/adapter-react-v5/Components/IconSelector';
import Image from '@iobroker/adapter-react-v5/Components/Image';
import Loader from '@iobroker/adapter-react-v5/Components/Loader';
import Logo from '@iobroker/adapter-react-v5/Components/Logo';
import ObjectBrowser from '@iobroker/adapter-react-v5/Components/ObjectBrowser';
import SaveCloseButtons from '@iobroker/adapter-react-v5/Components/SaveCloseButtons';
import Schedule from '@iobroker/adapter-react-v5/Components/Schedule';
import SelectWithIcon from '@iobroker/adapter-react-v5/Components/SelectWithIcon';
import TextWithIcon from '@iobroker/adapter-react-v5/Components/TextWithIcon';
import ToggleThemeMenu from '@iobroker/adapter-react-v5/Components/ToggleThemeMenu';
import TreeTable from '@iobroker/adapter-react-v5/Components/TreeTable';
import JsonConfig from './Components/JsonConfig';

import ComplexCronDialog from '@iobroker/adapter-react-v5/Dialogs/ComplexCron';
import ConfirmDialog from '@iobroker/adapter-react-v5/Dialogs/Confirm';
import CronDialog from '@iobroker/adapter-react-v5/Dialogs/Cron';
import ErrorDialog from '@iobroker/adapter-react-v5/Dialogs/Error';
import MessageDialog from '@iobroker/adapter-react-v5/Dialogs/Message';
import SelectIDDialog from '@iobroker/adapter-react-v5/Dialogs/SelectID';
import SimpleCronDialog from '@iobroker/adapter-react-v5/Dialogs/SimpleCron';
import TextInputDialog from '@iobroker/adapter-react-v5/Dialogs/TextInput';

import Connection from './ConnectionSimulate';
import Example from './Components/Example';

const treeData = [
    {
        id: 'UniqueID1', // required
        fieldIdInData: 'Name1',
        myType: 'number',
        myOptions: {
            mySubNumber: 'one',
            myText: 'Text1',
        },
    },
    {
        id: 'UniqueID2', // required
        fieldIdInData: 'Name2',
        myType: 'string',
        myOptions: {
            mySubNumber: 'two',
            myText: 'Text2',
        },
    },
    {
        id: 'UniqueID3', // required
        fieldIdInData: 'Name12',
        myType: 'string',
        parentId: 'UniqueID2',
        myOptions: {
            mySubNumber: 'three',
            myText: 'Text3',
        },
    },
    {
        id: 'UniqueID4', // required
        fieldIdInData: 'Name3',
        myType: 'string',
        myOptions: {
            mySubNumber: '',
            myText: 'Text4',
        },
    },
];

const treeColumns = [
    {
        title: 'Name of field', // required, else it will be "field"
        field: 'fieldIdInData', // required
        // First column cannot be editable
        cellStyle: { // CSS style - // optional
            maxWidth: '12rem',
            overflow: 'hidden',
            wordBreak: 'break-word',
        },
        lookup: { // optional => edit will be automatically "SELECT"
            value1: 'text1',
            value2: 'text2',
        },

        // Important: subField could be only be the first column
        subField: 'myOptions.mySubNumber',
        subLookup: { // optional => edit will be automatically "SELECT"
            one: 'One',
            two: 'Two',
            three: 'Three',
        },
        subStyle: { color: '#00FF00' },
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
        type: 'string', // oid=ObjectID,icon=base64-icon
    },
    {
        title: 'Text', // required, else it will be "field"
        field: 'myOptions.myText', // required
        editable: true, // or true [default - true]
        type: 'string', // number/string/color/oid/icon/boolean
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
        </div>
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
        height: '100%',
    },
    stack: {
        height: 'calc(100% - 52px)',
    },
    menu: {
        overflowY: 'auto',
        height: '100%',
        width: '100%',
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
        height: '100%',
        overflowY: 'auto',
    },
    optionsDiv: {
        borderTop: '1px solid grey',
        height: '100%',
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

const LANGUAGES = {
    en: 'english',
    de: 'deutsch',
    ru: 'русский',
    pt: 'pt',
    nl: 'nl',
    fr: 'fr',
    it: 'it',
    es: 'es',
    pl: 'pl',
    'zh-cn': 'zh-cn',
};

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

        let language = window.localStorage.getItem('language');
        if (!language && LANGUAGES[(window.navigator.language || navigator.userLanguage).substring(0, 2)]) {
            language = (window.navigator.language || navigator.userLanguage).substring(0, 2);
        }
        if (!language && LANGUAGES[(window.navigator.language || navigator.userLanguage).substring(0, 4).toLowerCase()]) {
            language = (window.navigator.language || navigator.userLanguage).substring(0, 4).toLowerCase();
        }

        I18n.setLanguage(language);
        this.socket.simulateObjects['system.config'].common.language = language;

        this.state = {
            ...this.state,
            language,
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
                    language: { type: 'language' },
                },
                props: {},
                example: `<ComplexCron
    cronExpression={this.state.cron}
    onChange={cron => this.setState({cron})}
    language="en"
/>`,
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
                    lang: {type: 'language' },
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
                    lang: {type: 'language'},
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
                example:
`<Icon
    src="./adapter/admin/admin.png"
/>`,
            },
            IconPicker: {
                component: IconPicker,
                custom: true,
                onChange: true,
                options: {
                    previewClassName: { type: 'text' },
                    label: { type: 'text' },
                    value: { type: 'text' },
                    disabled: { type: 'checkbox' },

                    onlyRooms: { type: 'checkbox' },
                    onlyDevices: { type: 'checkbox' },
                },
                props: {},
                example:
`<IconPicker
    onChange={icon => this.setState({icon})}
    value={this.state.icon}
/>`,
            },
            IconSelector: {
                component: IconSelector,
                custom: true,
                onSelect: true,
                options: {
                    onlyRooms: { type: 'checkbox' },
                    onlyDevices: { type: 'checkbox' },
                    lang: {type: 'language' },
                },
                props: { t: I18n.t },
                example:
`<IconSelector
    onSelect={icon => this.setState({icon})}
    t={I18n.t}
    lang={I18n.getLanguage()}
/>`,
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
                example:
`<Image
    src="./adapter/admin/admin.png"
/>`,
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
                example:
'<Loader />',
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
                    onError: error => console.error(error),
                    onLoad: () => {}
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
                    lang: {type: 'language' },
                },
                props: {
                    lang: I18n.getLanguage(),
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
                example:
`<SaveCloseButtons
    changed={this.state.changed}
    onSave={() => {}}
    onClose={() => {}}
/>`,
            },
            Schedule: {
                component: Schedule,
                custom: true,
                options: {
                    schedule: { type: 'text' },
                },
                props: {},
                example:
`<Schedule
    onChange={(schedule) => this.setState(schedule)}
/>`,
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
                    lang: {type: 'language' },
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
                example:
`<SelectWithIcon
    onChange={(value) => this.setState({item: value})}
    t={I18n.t}
    lang={I18n.getLanguage()}
    list={[
        {
            _id: 'system.user.admin',
            common: {
                icon: 'image1.png',
                color: 'red',
                name: 'Admin',
            },
        },
        {
            _id: 'system.user.user',
            common: {
                icon: 'image2.png',
                color: 'green',
                name: 'User',
            },
        },
    ]}
/>`,
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
                    lang: {type: 'language' },
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
                example:
`<TextWithIcon
    value={this.state.item}
    t={I18n.t}
    lang={I18n.getLanguage()}
    list={[
        {
            _id: 'system.user.admin',
            common: {
                icon: 'image1.png',
                color: 'red',
                name: 'Admin',
            },
        },
        {
            _id: 'system.user.user',
            common: {
                icon: 'image2.png',
                color: 'green',
                name: 'User',
            },
        },
    ]}
/>`,
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
                onUpdate: true,
                dataAlwaysChange: true,
                options: {
                    className: { type: 'text' },
                    name: { type: 'text' },
                    themeType: { type: 'text' },
                    loading: { type: 'checkbox', default: false },
                    noSort: { type: 'checkbox' },
                    noAdd: { type: 'checkbox' },
                    glowOnChange: { type: 'checkbox' },
                    data: { type: 'custom', default: treeData },
                    levelShift: { type: 'number', default: 24 },
                },
                props: {
                    columns: treeColumns,
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
                    language: { type: 'language' },
                    clearButton: { type: 'checkbox' },
                },
                props: {},
                example:
`<ComplexCronDialog
    onOk={(cron) => this.setState({cron})}
    onClose={() => this.setState({cronDialog: false})}
/>`,
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
                    dialogName: { type: 'text', default: 'test' },
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
                    language: { type: 'language' },
                },
                props: {},
                example:
`<CronDialog
    onOk={(cron) => this.setState({cron})}
    onClose={() => this.setState({cronDialog: false})}
/>`,
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
                example:
`<ErrorDialog
    title="Error"
    text="Error description"
    onClose={() => this.setState({errorDialog: false})}
/>`,
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
                example:
`<MessageDialog
    title="Title"
    text="Text"
    onClose={() => this.setState({errorDialog: false})}
/>`,

            },
            SelectIDDialog: {
                component: SelectIDDialog,
                custom: true,
                dialog: true,
                options: {
                    dialogName: { type: 'text' },
                    title: { type: 'text' },
                    lang: { type: 'language' },
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
                    lang: I18n.getLanguage(),
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
                    language: { type: 'language' },
                },
                props: {},
                example:
`<SimpleCronDialog
    onOk={(cron) => this.setState({cron})}
    onClose={() => this.setState({cronDialog: false})}
/>`,
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
                example:
`<TextInputDialog
    titleText="Title"
    promptText="Are you sure?"
    onClose={(result) => this.setState({inputDialog: false, inputValue: result})}
/>`,
            },
            JsonConfig: {
            }
        })

    componentDidMount() {
        super.componentDidMount();

        this.setState({
            component: window.localStorage.getItem('component') || 'ObjectBrowser',
            error: false,
            options: {},
            openDialog: false,
            example: '',
            splitSizes: window.localStorage.getItem('splitSizes')
                ? JSON.parse(window.localStorage.getItem('splitSizes'))
                : [15, 85],
            splitSizes2: window.localStorage.getItem('splitSizes2')
                ? JSON.parse(window.localStorage.getItem('splitSizes2'))
                : [80, 20],
        }, () => this.setComponent(this.state.component));
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
                } else if (comp.options[option].type === 'language') {
                    options[option] = I18n.getLanguage();
                }
            });

            if (comp.value !== undefined) {
                options.value = comp.value;
            }
            example = comp.example;
        }

        this.setState({
            component,
            error: false,
            options,
            example,
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
                <Button
                    onClick={() => {
                        copy(this.state.example);
                        this.props.enqueueSnackbar(I18n.t('Copied'));
                    }}
                    variant="outlined"
                >
                    {I18n.t('Copy to clipboard')}
                </Button>
                <Button onClick={() => this.setState({ openDialog: false })} autoFocus variant="contained">{I18n.t('Close')}</Button>
            </DialogActions>
        </Dialog>;
    }

    renderComponentAndOptions(comp) {
        if (this.state.component === 'JsonConfig') {
            return <JsonConfig
                themeName={this.state.themeName}
                themeType={this.state.themeType}
                theme={this.state.theme}
                socket={this.socket}
            />;
        }

        let options = null;

        if (comp.custom) {
            const Comp = comp.component;

            options = Object.keys(comp.options).map(option => (
                (item, _option) => {
                    let input = null;
                    if (item.type === 'language') {
                        input = null;/*<FormControl>
                            <InputLabel>{I18n.t('Language')}</InputLabel>
                            <Select
                                variant="standard"
                                value={this.state.options[option]}
                                label="Language"
                                onChange={e => {
                                    const _options = JSON.parse(JSON.stringify(this.state.options));
                                    _options[_option] = e.target.value;
                                    this.setState({ options: _options });
                                }}
                            >
                                { Object.keys(LANGUAGES).map(lang => <MenuItem key={lang} value={lang}>{LANGUAGES[lang]}</MenuItem>) }
                            </Select>
                        </FormControl>;*/
                    } else
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
            if (comp.onChange || comp.onSelect) {
                const onChange = value => {
                    const _options = JSON.parse(JSON.stringify(this.state.options));
                    _options.value = value;
                    this.setState({ options: _options });
                };
                if (comp.onChange) {
                    props.onChange = onChange;
                } else {
                    props.onSelect = onChange;
                }
            }

            // special solution for TreeTable
            if (comp.onUpdate) {
                props.onUpdate = (newData, oldData) => {
                    const options = JSON.parse(JSON.stringify(this.state.options));
                    // add new
                    if (newData === true) {
                        options.data.push({
                            id: 'id_' + Math.random() * 100000, // required
                            fieldIdInData: 'Name' + options.data.length,
                            myType: '',
                            myOptions: {
                                mySubNumber: '',
                                myText: 'Text' + options.data.length,
                            },
                        });
                    } else {
                        const index = options.data.findIndex(item => item.id === newData.id);
                        options.data[index] = newData;
                    }
                    this.setState({ options });
                };
                props.onDelete = oldData => {
                    const options = JSON.parse(JSON.stringify(this.state.options));
                    const index = options.data.findIndex(item => item.id === oldData.id);
                    options.data.splice(index, 1);
                    this.setState({ options });
                }
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
            <Splitter
                direction={SplitDirection.Vertical}
                initialSizes={this.state.splitSizes2}
                minHeights={[0, 100]}
                onResizeFinished={(gutterIdx, newSizes) => {
                    this.setState({ splitSizes2: newSizes });
                    window.localStorage.setItem('splitSizes2', JSON.stringify(newSizes));
                }}
                theme={this.state.themeName === 'dark' ? GutterTheme.Dark : GutterTheme.Light}
                gutterClassName={this.state.themeName === 'dark' ? 'Dark visGutter' : 'Light visGutter'}
            >
                <div className={this.props.classes.componentDiv}>
                    {comp}
                </div>
                <div className={this.props.classes.optionsDiv}>
                    <div className={this.props.classes.optionsTitle}>{I18n.t('Options')}</div>
                    {this.state.example
                        ? <Tooltip title={I18n.t('Show example')}>
                            <Fab color="primary" className={this.props.classes.optionsGithub} size="small" onClick={() => this.setState({ openDialog: true })}>
                                <GitHubIcon />
                            </Fab>
                        </Tooltip>
                        : null }
                    {options}
                </div>
            </Splitter>
        </div>;
    }

    renderLanguageSelector() {
        return <Select
            variant="standard"
            value={this.state.language}
            label={I18n.t('Language')}
            onChange={e => {
                if (e.target.value !== this.state.language) {
                    I18n.setLanguage(e.target.value);
                    this.setState({ language: e.target.value });
                    window.localStorage.setItem('language', e.target.value);
                    window.location.reload();
                }
            }}
        >
            { Object.keys(LANGUAGES).map(lang => <MenuItem key={lang} value={lang}>{LANGUAGES[lang]}</MenuItem>) }
        </Select>;
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
                                { I18n.t('Adapter react')}
                            </Typography>
                            { this.renderLanguageSelector() }
                            <ToggleThemeMenu
                                toggleTheme={() => this.toggleTheme()}
                                themeName={this.state.themeName}
                                t={I18n.t}
                            />
                        </Toolbar>
                    </AppBar>

                    <Stack direction="row" spacing={2} className={this.props.classes.stack}>
                        <Splitter
                            direction={SplitDirection.Horizontal}
                            initialSizes={this.state.splitSizes}
                            minWidths={[170, 0]} // In pixels.
                            onResizeFinished={(gutterIdx, newSizes) => {
                                this.setState({ splitSizes: newSizes });
                                window.localStorage.setItem('splitSizes', JSON.stringify(newSizes));
                            }}
                            theme={this.state.themeName === 'dark' ? GutterTheme.Dark : GutterTheme.Light}
                            gutterClassName={this.state.themeName === 'dark' ? 'Dark visGutter' : 'Light visGutter'}
                        >
                            <div className={this.props.classes.menu}>
                                <MenuList>
                                    {Object.keys(this.getComponents()).map(name => <MenuItem
                                        key={name}
                                        selected={name === this.state.component}
                                        onClick={() => this.setComponent(name)}
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
                        </Splitter>
                    </Stack>
                </div>
            </ThemeProvider>
        </StyledEngineProvider>;
    }
}

export default withStyles(styles)(withSnackbar(App));
