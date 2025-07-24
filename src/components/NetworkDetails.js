// Copyright (c) 2019 SafetyCulture Pty Ltd. All Rights Reserved.

import React, { Component } from 'react';
import ReactJson from 'react-json-view';
import { connect } from 'react-redux';
import './NetworkDetails.css';

class NetworkDetails extends Component {
  
  getCustomTheme() {
    const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (isDark) {
      return {
        base00: 'transparent', // background
        base01: '#2d2d2d', // lighter background (used for hover)
        base02: '#515151', // selection background
        base03: '#737373', // comments, invisibles, line highlighting
        base04: '#b4b7b4', // dark foreground (used for status bars)
        base05: '#e8e6df', // default foreground, caret, delimiters, operators
        base06: '#f1efee', // light foreground (not often used)
        base07: '#f7f5f4', // light background (not often used)
        base08: '#ff6b6b', // variables, XML tags, markup link text, markup lists, diff deleted
        base09: '#ffa500', // integers, boolean, constants, XML attributes, markup link url
        base0A: '#ffd93d', // classes, markup bold, search text background
        base0B: '#6bcf7f', // strings, inherited class, markup code, diff inserted
        base0C: '#4ecdc4', // support, regular expressions, escape characters, markup quotes
        base0D: '#74b9ff', // functions, methods, attribute IDs, headings
        base0E: '#a29bfe', // keywords, storage, selector, markup italic, diff changed
        base0F: '#fd79a8'  // deprecated, opening/closing embedded language tags
      };
    } else {
      return {
        base00: 'transparent', // background
        base01: '#f5f5f5', // lighter background (used for hover)
        base02: '#e0e0e0', // selection background
        base03: '#969896', // comments, invisibles, line highlighting
        base04: '#4d4d4c', // dark foreground (used for status bars)
        base05: '#4d4d4c', // default foreground, caret, delimiters, operators
        base06: '#282a2e', // light foreground (not often used)
        base07: '#1d1f21', // light background (not often used)
        base08: '#c82829', // variables, XML tags, markup link text, markup lists, diff deleted
        base09: '#f5871f', // integers, boolean, constants, XML attributes, markup link url
        base0A: '#eab700', // classes, markup bold, search text background
        base0B: '#718c00', // strings, inherited class, markup code, diff inserted
        base0C: '#3e999f', // support, regular expressions, escape characters, markup quotes
        base0D: '#4271ae', // functions, methods, attribute IDs, headings
        base0E: '#8959a8', // keywords, storage, selector, markup italic, diff changed
        base0F: '#a3685a'  // deprecated, opening/closing embedded language tags
      };
    }
  }

  render() {
    const { entry } = this.props;
    return (
      <div className="widget vbox details-data">
        {this._renderContent(entry)}
      </div>
    );
  }
  
  _renderContent = (entry) => {
    if (entry) {
      const { clipboardIsEnabled } = this.props;
      const { method, request, response, error } = entry;
      const customTheme = this.getCustomTheme();
      var src = { method };
      if (request) src.request = request;
      if (response) src.response = response;
      if (error) src.error = error;
      return (
          <ReactJson
            name="grpc"
            theme={customTheme}
            style={{backgroundColor:'transparent'}}
            enableClipboard={clipboardIsEnabled}
            src={src}
            displayDataTypes={false}
            displayObjectSize={false}
            indentWidth={2}
          />
      )
    }
  }
}

const mapStateToProps = state => ({ entry: state.network.selectedEntry, clipboardIsEnabled: state.clipboard.clipboardIsEnabled });
export default connect(mapStateToProps)(NetworkDetails);
