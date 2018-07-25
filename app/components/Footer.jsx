import React from "react";
import * as manifest from '../../package.json';

export default class Footer extends React.Component {
  render() {
    return (
      <footer className="toolbar toolbar-footer">
        <h1 className="title">
          { manifest.name } v.{ manifest.version }
        </h1>
      </footer>
    )
  }
}
