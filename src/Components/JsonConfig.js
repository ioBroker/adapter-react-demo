import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@mui/styles';
import AceEditor from 'react-ace';

import LinearProgress from '@mui/material/LinearProgress';
import Splitter, { SplitDirection, GutterTheme } from '@devbookhq/splitter';

import JsonConfigComponent from '@iobroker/adapter-react-v5/Components/JsonConfigComponent';
import ConfigGeneric from '@iobroker/adapter-react-v5/Components/JsonConfigComponent/ConfigGeneric';

const styles = {
    root: {
        width: '100%',
        height: '100%',
        overflow: 'hidden',
        position: 'relative',
    },
    scroll: {
        height: 'calc(100% - 48px - 48px)',
        overflowY: 'auto'
    },
    exportImportButtons: {
        position: 'absolute',
        top: 5,
        right: 0,
        zIndex: 3,
    },
    button: {
        marginRight: 5
    }
};

/**
 * Decrypt the password/value with given key
 *  Usage:
 *  ```
 *     function load(settings, onChange) {
 *          if (settings.password) {
 *              settings.password = decrypt(systemSecret, settings.password);
 *              // same as
 *              settings.password = decrypt(settings.password);
 *          }
 *          // ...
 *     }
 *  ```
 * @param {string} key - Secret key
 * @param {string} value - value to decrypt
 * @returns {string}
 */
function decrypt(key, value) {
    let result = '';
    for (let i = 0; i < value.length; i++) {
        result += String.fromCharCode(key[i % key.length].charCodeAt(0) ^ value.charCodeAt(i));
    }
    return result;
}

/**
 * Encrypt the password/value with given key
 *  Usage:
 *  ```
 *     function save(callback) {
 *          ...
 *          if (obj.password) {
 *              obj.password = encrypt(systemSecret, obj.password);
 *              // same as
 *              obj.password = decrypt(obj.password);
 *          }
 *          ...
 *    }
 *  ```
 * @param {string} key - Secret key
 * @param {string} value - value to encrypt
 * @returns {string}
 */
function encrypt(key, value) {
    let result = '';
    for (let i = 0; i < value.length; i++) {
        result += String.fromCharCode(key[i % key.length].charCodeAt(0) ^ value.charCodeAt(i));
    }
    return result;
}

class JsonConfig extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            schema: null,
            data: null,
            updateData: 0,
            common: null,
            changed: false,
            code: '',
        };
    }
    componentDidMount() {
        this.getDataForEdit()
            .then(obj => this.getSchema()
                .then(schema =>
                    // load language
                    JsonConfigComponent.loadI18n(this.props.socket, schema?.i18n, this.props.adapterName)
                        .then(() => {
                            if (obj) {
                                this.setState({schema, data: obj.native, common: obj.common}, () => this.onApply());
                            } else {
                                window.alert(`Instance system.adapter.${this.props.adapterName}.${this.props.instance} not found!`);
                            }
                        })));
    }

    getSchema() {
        return fetch('./jsonConfig.json')
            .then(data => data.json());
    }

    getDataForEdit() {
        return Promise.resolve({
            common: {

            },
            native: {
                "port": 8081,
                "auth": false,
                "secure": false,
                "bind": "0.0.0.0",
                "cache": false,
                "autoUpdate": 24,
                "accessLimit": false,
                "accessApplyRights": false,
                "accessAllowedConfigs": [],
                "accessAllowedTabs": [],
                "certPublic": "",
                "certPrivate": "",
                "certChained": "",
                "ttl": 3600,
                "defaultUser": "admin",
                "tmpPath": "/tmp",
                "tmpPathAllow": false,
                "thresholdValue": 200,
                "leEnabled": false,
                "leUpdate": false,
                "leCheckPort": 80,
                "loginBackgroundColor": "",
                "loginBackgroundImage": false,
                "loginHideLogo": false,
                "loginMotto": ""
            }
        });
    }

    findAttr(attr, schema) {
        schema = schema || this.state.schema;
        if (schema.items) {
            if (schema.items[attr]) {
                return schema.items[attr];
            } else {
                const keys = Object.keys(schema.items);
                for (let k = 0; k < keys.length; k++) {
                    const item = this.findAttr(attr, schema.items[keys[k]]);
                    if (item) {
                        return item;
                    }
                }
            }
        }
    }

    async onApply() {
        const obj = await this.getDataForEdit();

        Object.keys(this.state.data).forEach(attr => {
            const item = this.findAttr(attr);
            if (!item || !item.doNotSave) {
                ConfigGeneric.setValue(obj.native, attr, this.state.data[attr]);
            } else {
                ConfigGeneric.setValue(obj.native, attr, null);
            }
        });

        const encryptedObj = JSON.parse(JSON.stringify(obj));
        try {
            // encode all native attributes listed in obj.encryptedNative
            if (Array.isArray(encryptedObj.encryptedNative)) {
                encryptedObj.encryptedNative.forEach(attr => {
                    if (encryptedObj.native[attr]) {
                        encryptedObj.native[attr] = encrypt(this.secret, encryptedObj.native[attr]);
                    }
                });
            }
        } catch (e) {
            window.alert(`[JsonConfig] Cannot set object: ${e}`);
        }

        this.setState({ code: JSON.stringify(encryptedObj.native, null, 2) });
    }

    render() {
        const { classes } = this.props;
        if (!this.state.data || !this.state.schema) {
            return <LinearProgress />;
        }

        return <Splitter
            direction={SplitDirection.Horizontal}
            initialSizes={[70, 30]}
            minHeights={[0, 100]}
            /*onResizeFinished={(gutterIdx, newSizes) => {
                this.setState({ splitSizes2: newSizes });
                window.localStorage.setItem('splitSizes2', JSON.stringify(newSizes));
            }}*/
            theme={this.props.themeName === 'dark' ? GutterTheme.Dark : GutterTheme.Light}
            gutterClassName={this.props.themeName === 'dark' ? 'Dark visGutter' : 'Light visGutter'}
        >
            <div>
                <JsonConfigComponent
                    className={ classes.scroll }
                    socket={this.props.socket}
                    theme={this.props.theme}
                    themeName={this.props.themeName}
                    themeType={this.props.themeType}
                    adapterName={'admin'}
                    instance={0}
                    isFloatComma={true}
                    dateFormat={'DD.MM.YYYY'}

                    schema={this.state.schema}
                    common={this.state.common}
                    data={this.state.data}
                    updateData={this.state.updateData}
                    onError={error => this.setState({ error })}
                    onChange={(data, changed) =>
                        this.setState({ data, changed }, () =>
                            this.onApply())
                    }
                />
            </div>
            <div style={{width: '100%', height: '100%', overflow: 'hidden'}}>
                <AceEditor
                    mode="json"
                    fontSize={14}
                    theme={this.props.themeName === 'dark' ? 'clouds_midnight' : 'chrome'}
                    width="100%"
                    height="100%"
                    value={this.state.code}
                    readOnly
                    setOptions={{
                        enableBasicAutocompletion: true,
                        enableLiveAutocompletion: true,
                        enableSnippets: true,
                    }}
                />
            </div>
        </Splitter>;
    }
}

JsonConfig.propTypes = {
    menuPadding: PropTypes.number,
    adapterName: PropTypes.string,
    instance: PropTypes.number,
    isFloatComma: PropTypes.bool,
    dateFormat: PropTypes.string,
    secret: PropTypes.string,

    socket: PropTypes.object,

    theme: PropTypes.object,
    themeName: PropTypes.string,
    themeType: PropTypes.string,
};

export default withStyles(styles)(JsonConfig);