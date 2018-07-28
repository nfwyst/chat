import React from 'react';
import PropTypes from 'prop-types';

export default class Welcome extends React.Component {
  onSubmit = (e) => {
    this.props.onNameChange(this.nameEl.value || 'join');
  }
  static defaultProps = {
    onNameChange: () => {}
  }
  static propTypes = {
    onNameChange: PropTypes.func.isRequired
  }
  render() {
    return (
      <div className="pane padded-more">
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>Tell me your name</label>
            <input className="form-control" required placehoder="Name" ref={input => this.nameEl = input} />
          </div>
          <div className="form-cations">
            <button className="btn btn-form btn-primary">Ok</button>
          </div>
        </form>
      </div> 
    )
  }
}
