import React from 'react';

export default class Welcome extends React.Component {
  render() {
    return (
      <div className="pane padded-more">
        <form>
          <div className="form-group">
            <label>Tell me your name</label>
            <input className="form-control" required placehoder="Name" />
          </div>
          <div className="form-cations">
            <button className="btn btn-form btn-primary">Ok</button>
          </div>
        </form>
      </div> 
    )
  }
}
