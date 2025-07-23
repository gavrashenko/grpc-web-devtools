// Copyright (c) 2019 SafetyCulture Pty Ltd. All Rights Reserved.

import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { selectLogEntry } from '../state/network';
import MethodIcon from './MethodIcon';

class NetworkListRow extends PureComponent {
  formatTime(timestamp) {
    if (!timestamp) return '';
    const date = new Date(timestamp);
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const seconds = date.getSeconds().toString().padStart(2, '0');
    const milliseconds = date.getMilliseconds().toString().padStart(3, '0');
    return `${hours}:${minutes}:${seconds}.${milliseconds}`;
  }

  render() {
    const { index, data, style, selectLogEntry, selectedIdx } = this.props;
    const log = data[index];
    return (
      <div
        className={`data-row ${(index + 1) % 2 === 0 ? "" : "odd"} ${index === selectedIdx ? "selected" : ""} ${log.error ? "error" : ""} `}
        style={style}
        onClick={() => selectLogEntry(index)
        }
      >
        <div className="row-content">
          <div className="row-left">
            <MethodIcon methodType={log.methodType} isRequest={!!log.request} />
            {log.endpoint}
          </div>
          <span className="timestamp">{this.formatTime(log.timestamp)}</span>
        </div>
      </div >
    );
  }
}

const mapStateToProps = state => ({ selectedIdx: state.network.selectedIdx });
const mapDispatchToProps = { selectLogEntry };
export default connect(mapStateToProps, mapDispatchToProps)(NetworkListRow);
