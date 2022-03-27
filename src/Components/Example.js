import PropTypes from 'prop-types';
import AceEditor from 'react-ace';

import 'ace-builds/webpack-resolver';
import 'ace-builds/src-noconflict/mode-javascript';
import 'ace-builds/src-noconflict/mode-jsx';
import 'ace-builds/src-min-noconflict/ext-searchbox';
import 'ace-builds/src-min-noconflict/ext-language_tools';
import 'ace-builds/src-noconflict/theme-clouds_midnight';
import 'ace-builds/src-noconflict/theme-chrome';

const Example = props => <div>
    <AceEditor
        mode="jsx"
        style={{ width: 800, height: 400 }}
        fontSize={14}
        theme={props.themeName === 'dark' ? 'clouds_midnight' : 'chrome'}
        width="100%"
        value={props.code}
        readOnly
        setOptions={{
            enableBasicAutocompletion: true,
            enableLiveAutocompletion: true,
            enableSnippets: true,
        }}
    />
</div>;

Example.propTypes = {
    code: PropTypes.string,
    themeName: PropTypes.string,
};

export default Example;
